import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import AddQuizForm from './AddQuizForm';
import axios from '../../../axios';
import './AddContentsForm.css';

const AddContentsForm = ({ contentIndex, onRemove, courseId, sessionId, propContentId, propContentTitle, propContentType, propQuizzes }) => {
  const [contentId, setContentId] = useState(propContentId || null);
  const [title, setTitle] = useState(propContentTitle || '');
  const [file, setFile] = useState(null);
  const [type, setType] = useState(propContentType || 'VIDEO');
  const [quizzes, setQuizzes] = useState(propQuizzes || []);
  const [isEditing, setIsEditing] = useState(false);
  const [upload, setUploadId] = useState(null);
  const [presignedUrls, setPresignedUrls] = useState([]);
  const [fileKey, setFileKey] = useState(null);

  const handleRemove = () => {
    const confirmRemove = window.confirm('현재 콘텐츠 구성내용을 삭제하시겠습니까?');
    if (confirmRemove) {
      onRemove(contentId);
    }
  };

  const updateContent = async (updatedField) => {
    if (!contentId || !courseId) {
      return;
    }

    const payload = {
      courseId,
      contentId,
      contentTitle: updatedField.title || title,
      contentType: updatedField.type || type,
    };

    try {
      const response = await axios.put('/api/v1/admin/courses/sessions/contents', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        alert(`콘텐츠 업데이트 실패: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error updating content:', error);
      alert('콘텐츠 업데이트 중 오류가 발생했습니다.');
    }
  };

  const handleTitleBlur = () => {
    updateContent({ title });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    updateContent({ type: newType });
  };

  const handleAddQuiz = () => {
    const newQuizIndex = quizzes.length + 1;
    const newQuiz = { quizIndex: newQuizIndex };
    setQuizzes([...quizzes, newQuiz]);
  };

  const handleRemoveQuiz = (quizIndex) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.quizIndex !== quizIndex);
    const reorderedQuizzes = updatedQuizzes.map((quiz, idx) => ({
      ...quiz,
      quizIndex: idx + 1,
    }));
    setQuizzes(reorderedQuizzes);
  };

  const handleCreateContent = async () => {
    if (!title) {
      alert('인덱스에 들어갈 제목이 필요합니다.');
      return;
    }

    const payload = {
      courseId,
      sessionId,
      contentTitle: title,
      contentType: type,
      contentIndex,
      contentId,
    };

    try {
      const response = await axios.post('/api/v1/admin/courses/sessions/contents', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const responseData = response.data;
        const newContentId = responseData.contentId;
        setContentId(newContentId);

        alert('콘텐츠가 성공적으로 추가되었습니다.');
        setIsEditing(true);
      } else {
        alert(`콘텐츠 추가 실패: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error creating content:', error);
      alert('콘텐츠 추가 중 오류가 발생했습니다.');
    }
  };

  const initiateMultipartUpload = async (file, fileExtension) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/v1/s3/initiate', {
        fileKeyPrefix: courseId + '/' + 'VIDEO/',
        fileKeyPostfix: `.${fileExtension}`
      });

      if (response.status === 200) {
        const { uploadId, fileKey } = response.data;
        return { uploadId, fileKey };
      } else {
        alert('업로드가 실패하였습니다.');
      }
    } catch (error) {
      console.error('업로드 시작 중 오류 발생:', error);
      alert('업로드 시작 중 오류가 발생했습니다.');
    }
  };

  const getPresignedUrls = async (uploadId, fileKey, fileSize) => {
    try {
      const response = await axios.post('/api/v1/s3/presigned-url', {
        uploadId,
        fileKey,
        fileSize,
      });

      if (response.status === 200) {
        const { presignedUrls } = response.data;
        return presignedUrls;
      } else {
        alert('Presigned URL 생성 실패');
      }
    } catch (error) {
      console.error('Presigned URL 생성 중 오류 발생:', error);
      alert('Presigned URL 생성 중 오류가 발생했습니다.');
    }
  };

  const completeMultipartUpload = async (fileKey, uploadId, completedParts) => {
    try {
      const response = await axios.put("/api/v1/s3/complete", {
        fileKey,
        uploadId,
        completedParts,
      });

      if (response.status !== 200) {
        alert('멀티파트 업로드 완료 실패');
      }
    } catch (error) {
      console.error('멀티파트 업로드 완료 중 오류 발생:', error);
      alert('멀티파트 업로드 완료 중 오류가 발생했습니다.');
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const fileSize = selectedFile.size;

    if (selectedFile) {
      setFile(selectedFile);

      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

      if (!['mp4'].includes(fileExtension)) {
        alert('MP4 파일만 업로드 가능합니다.');
        return;
      }

      const { uploadId, fileKey } = await initiateMultipartUpload(selectedFile, fileExtension);
      if (uploadId) {
        setUploadId(uploadId);
        setFileKey(fileKey);

        const presignedUrls = await getPresignedUrls(uploadId, fileKey, fileSize);
        if (presignedUrls) {
          setPresignedUrls(presignedUrls);

          const completedParts = [];
          const partSize = 5 * 1024 * 1024;
          const totalParts = Math.ceil(fileSize / partSize);

          for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
            const startByte = (partNumber - 1) * partSize;
            const endByte = Math.min(partNumber * partSize, fileSize);
            const partData = selectedFile.slice(startByte, endByte);
            const partUrl = presignedUrls[partNumber - 1];

            try {
              const response = await axios.put(partUrl, partData, {
                headers: {
                  'Content-Type': "application/octet-stream",
                }
              });

              if (response.status === 200) {
                const eTag = response.headers.etag.replace(/"/g, "");
                completedParts.push({
                  partNumber,
                  eTag,
                });
              } else {
                console.error(`파트 업로드 실패: ${partNumber}`);
              }
            } catch (error) {
              console.error(`파트 업로드 중 오류 발생: ${error}`);
            }
          }

          if (completedParts.length === presignedUrls.length) {
            await completeMultipartUpload(fileKey, uploadId, completedParts);
          } else {
            alert('모든 파트가 업로드되지 않았습니다.');
          }
        }
      }
    }
  };

  const handleSaveQuizzes = async () => {
    if (quizzes.length === 0) {
      alert('퀴즈가 없습니다.');
      return;
    }

    const quizData = quizzes.map((quiz) => {
      const quizForm = document.getElementById(`quiz-form-${quiz.quizIndex}`);
      if (!quizForm) {
        console.error(`Quiz form with ID quiz-form-${quiz.quizIndex} not found`);
        return null;
      }

      const question = quizForm.querySelector(`#quiz-question-${quiz.quizIndex}`).value;
      const answer = quizForm.querySelector(`#quiz-answer-${quiz.quizIndex}`).value;
      const choices = Array.from(
        quizForm.querySelectorAll(`.quiz-choice-${quiz.quizIndex} input`)
      ).map((input) => input.value);
      const explanation = quizForm.querySelector(`#quiz-explanation-${quiz.quizIndex}`).value;

      if (!question || !answer || choices.length === 0) {
        alert('모든 퀴즈 항목을 입력해야 합니다.');
        return null;
      }

      return {
        quizId: quiz.quizId,
        quizIndex: quiz.quizIndex,
        question,
        options: choices,
        answer: parseInt(answer, 10),
        explanation,
      };
    }).filter((quiz) => quiz !== null);

    if (quizData.length === 0) {
      alert('유효한 퀴즈 데이터가 없습니다.');
      return;
    }

    const payload = {
      courseId,
      contentId,
      quizzes: quizData,
    };

    try {
      const response = await axios.put(
        '/api/v1/admin/courses/sessions/contents/quizzes',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const updatedQuizzes = response.data.quizzes.map((quiz, idx) => ({
          ...quizzes[idx],
          quizId: quiz,
        }));

        setQuizzes(updatedQuizzes);
        alert('퀴즈가 성공적으로 저장되었습니다.');
      } else {
        alert(`퀴즈 저장 실패: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error saving quizzes:', error);
      alert('퀴즈 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="add-course-contents-form">
      <button className="add-course-remove-button" onClick={handleRemove}>
        <IoClose />
      </button>
      <button className="add-content-drag-indicator">
        <MdDragIndicator />
      </button>
      <h2>{contentIndex} 페이지</h2>
      <div className="content-input-group">
        <div className="input-with-button">
          <input
            type="text"
            id={`title-${contentId}`}
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            placeholder="인덱스의 제목을 입력하세요"
            required
          />
        </div>
      </div>
      {!isEditing && (
        <div className="add-content-btn-wrap">
          <button
            className="add-content-btn add-content-btn-primary"
            onClick={handleCreateContent}
          >
            확인
          </button>
        </div>
      )}
      {isEditing && (
        <div className="content-input-group-file-and-type">
          <div className="content-input-group">
            <select
              id={`type-${contentId}`}
              value={type}
              onChange={handleTypeChange}
              required
            >
              <option value="VIDEO">영상</option>
              <option value="QUIZ">퀴즈</option>
            </select>
          </div>
        </div>
      )}

      {isEditing && type === 'VIDEO' && (
        <div className="content-input-group">
          <input
            type="file"
            id={`file-${contentId}`}
            accept="video/*"
            onChange={handleFileChange}
          />
          {file && <p>업로드된 파일: {file.name}</p>}
        </div>
      )}

      {isEditing && type === 'QUIZ' && (
        <div className="quiz-section">
          {quizzes
            .slice()
            .sort((a, b) => a.quizIndex - b.quizIndex)
            .map((quiz) => (
              <div key={quiz.quizIndex} className="quiz-form-wrapper">
                <AddQuizForm
                  quizIndex={quiz.quizIndex}
                  propQuizId={quiz.quizId}
                  propQuestion={quiz.question}
                  propAnswer={quiz.answer}
                  propOptions={quiz.options}
                  propExplanation={quiz.explanation}
                  onRemoveQuiz={() => handleRemoveQuiz(quiz.quizIndex)}
                />
              </div>
            ))}
          <div className="quiz-controls">
            <button type="button" onClick={handleAddQuiz}>
              퀴즈 추가
            </button>
            <button type="button" onClick={handleSaveQuizzes}>
              퀴즈 저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContentsForm;
