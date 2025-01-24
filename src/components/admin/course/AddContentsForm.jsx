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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

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

      if (response.status !== 200)  {
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

  const handleEditContent = () => {
    setIsEditing(true);
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
