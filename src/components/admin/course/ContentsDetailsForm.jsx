import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import AddQuizForm from './AddQuizForm';
import axios from 'axios';
import './ContentsDetailsForm.css';

const ContentsDetailsForm = ({ contentIndex, onRemove, courseId, sessionId, contentId, propContentTitle, propContentType, propQuizzes }) => {
  const [title, setTitle] = useState(propContentTitle || '');
  const [file, setFile] = useState(null);
  const [type, setType] = useState(propContentType || 'VIDEO');
  const [quizzes, setQuizzes] = useState(propQuizzes || []);
  const [isEditing, setIsEditing] = useState(true);

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

  const handleAddQuiz = () => {
    const newQuizFormId = quizzes.length + 1;
    const newQuiz = { quizFormId: newQuizFormId, quizIndex: quizzes.length + 1 };
    setQuizzes([...quizzes, newQuiz]);
  };

  const handleRemoveQuiz = (quizFormId) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.quizFormId !== quizFormId);
    const reorderedQuizzes = updatedQuizzes.map((quiz, idx) => ({
      ...quiz,
      quizIndex: idx + 1,
    }));
    setQuizzes(reorderedQuizzes);
  };

  const handleSaveQuizzes = async () => {
    if (quizzes.length === 0) {
      alert('퀴즈가 없습니다.');
      return;
    }

    const quizData = quizzes.map((quiz) => {
      const quizForm = document.getElementById(`quiz-form-${quiz.quizFormId}`);
      if (!quizForm) {
        console.error(`Quiz form with ID quiz-form-${quiz.quizFormId} not found`);
        return null;
      }

      const question = quizForm.querySelector(`#quiz-question-${quiz.quizFormId}`).value;
      const answer = quizForm.querySelector(`#quiz-answer-${quiz.quizFormId}`).value;
      const choices = Array.from(
        quizForm.querySelectorAll(`.quiz-choice-${quiz.quizFormId} input`)
      ).map((input) => input.value);
      const explanation = quizForm.querySelector(`#quiz-explanation-${quiz.quizFormId}`).value;

      if (!question || !answer || choices.length === 0) {
        alert('모든 퀴즈 항목을 입력해야 합니다.');
        return null;
      }

      return {
        quizId: quiz.quizId,
        quizIndex: quiz.quizIndex,
        question,
        options: choices,
        answer: choices.indexOf(answer),
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
        'http://localhost:8080/api/v1/admin/courses/sessions/contents/quizzes',
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
    <div className="details-contents-form">
      <button className="details-remove-button" onClick={handleRemove}>
        <IoClose />
      </button>
      <button className="details-content-drag-indicator">
        <MdDragIndicator />
      </button>
      <h2>{contentIndex} 페이지</h2>
      <div className="content-input-group">
        <div className="input-with-button">
          <input
            type="text"
            id={`title-${contentId}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="인덱스의 제목을 입력하세요"
            required
          />
          {isEditing ? (
            <button
              className="details-content-btn details-content-btn-primary"
              onClick={handleEditContent}
            >
              수정
            </button>
          ) : (
            <button
              className="details-content-btn details-content-btn-primary"
            >
              확인
            </button>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="content-input-group-file-and-type">
          <div className="content-input-group">
            <select
              id={`type-${contentId}`}
              value={type}
              onChange={(e) => setType(e.target.value)}
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
          {quizzes.map((quiz) => (
            <div key={quiz.quizFormId} className="quiz-form-wrapper">
              <AddQuizForm
                quizIndex={quiz.quizIndex}
                quizFormId={quiz.quizFormId}
                quizId={quiz.quizId}
                onRemoveQuiz={() => handleRemoveQuiz(quiz.quizFormId)}
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

export default ContentsDetailsForm;
