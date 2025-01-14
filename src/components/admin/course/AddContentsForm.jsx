import { useState } from 'react';
import AddQuizForm from './AddQuizForm';
import './AddContentsForm.css';

const AddContentsForm = ({ contentId, contentIndex, onRemove }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');
  const [quizzes, setQuizzes] = useState([]);

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

  return (
    <div className="add-course-contents-form">
      <button className="add-course-remove-button" onClick={handleRemove}>
        ×
      </button>
      <h2>콘텐츠 {contentIndex}</h2>
      <div className="content-input-group">
        <label htmlFor={`title-${contentId}`}>인덱스 제목</label>
        <input
          type="text"
          id={`title-${contentId}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          required
        />
      </div>

      <div className="content-input-group-file-and-type">
        <div className="content-input-group">
          <label htmlFor={`type-${contentId}`}>타입</label>
          <select
            id={`type-${contentId}`}
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">타입을 선택하세요</option>
            <option value="퀴즈">퀴즈</option>
            <option value="강의 영상">강의 영상</option>
          </select>
        </div>
      </div>

      {type === '강의 영상' && (
        <div className="content-input-group">
          <label htmlFor={`file-${contentId}`}>파일 업로드</label>
          <input
            type="file"
            id={`file-${contentId}`}
            accept="video/*"
            onChange={handleFileChange}
          />
          {file && <p>업로드된 파일: {file.name}</p>}
        </div>
      )}

      {type === '퀴즈' && (
        <div className="quiz-section">
          {quizzes.map((quiz, index) => (
            <div key={quiz.quizId} className="quiz-form-wrapper">
              <AddQuizForm
                quizIndex={quiz.quizIndex}
                onRemoveQuiz={() => handleRemoveQuiz(quiz.quizId)}
              />
            </div>
          ))}
        </div>
      )}

      {type === '퀴즈' && (
        <div className="quiz-controls">
          <button type="button" onClick={handleAddQuiz}>
            퀴즈 추가
          </button>
        </div>
      )}
    </div>
  );
};

export default AddContentsForm;
