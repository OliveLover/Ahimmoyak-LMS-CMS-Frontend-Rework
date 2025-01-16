import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import AddQuizForm from './AddQuizForm';
import './AddContentsForm.css';

const AddContentsForm = ({ contentId, contentIndex, onRemove, courseId, sessionId }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('VIDEO');
  const [quizzes, setQuizzes] = useState([]);
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

  const handleAddQuiz = () => {
    const newQuizId = quizzes.length > 0 ? quizzes[quizzes.length - 1].quizId + 1 : 1;
    const newQuiz = { quizId: newQuizId, quizIndex: quizzes.length + 1 };
    setQuizzes([...quizzes, newQuiz]);
  };

  const handleRemoveQuiz = (quizId) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.quizId !== quizId);

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
      const response = await fetch('http://localhost:8080/api/v1/admin/courses/sessions/contents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('콘텐츠가 성공적으로 추가되었습니다.');
        setIsEditing(true);
      } else {
        const errorData = await response.json();
        alert(`콘텐츠 추가 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating content:', error);
      alert('콘텐츠 추가 중 오류가 발생했습니다.');
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
              className="add-content-btn add-content-btn-primary"
              onClick={handleEditContent}
            >
              수정
            </button>
          ) : (
            <button
              className="add-content-btn add-content-btn-primary"
              onClick={handleCreateContent}
            >
              확인
            </button>
          )}
        </div>
      </div>

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

      {type === 'VIDEO' && (
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

      {type === 'QUIZ' && (
        <div className="quiz-section">
          {quizzes.map((quiz) => (
            <div key={quiz.quizId} className="quiz-form-wrapper">
              <AddQuizForm
                quizIndex={quiz.quizIndex}
                onRemoveQuiz={() => handleRemoveQuiz(quiz.quizId)}
              />
            </div>
          ))}
          <div className="quiz-controls">
            <button type="button" onClick={handleAddQuiz}>
              퀴즈 추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContentsForm;
