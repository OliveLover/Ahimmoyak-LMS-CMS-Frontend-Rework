import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import ContentsUploadForm from './ContentsUploadForm';
import AddQuizForm from './AddQuizForm';
import axios from '../../../axios';
import './ContentsDetailsForm.css';


const ContentsDetailsForm = ({ sessionFormIndex, content, onSetContentId, onUpdateContent, onRemoveContent }) => {
  const [isContentCreated, setIsContentCreated] = useState(content.contentId === null ? false : true);

  const handleCreateContent = () => {
    setIsContentCreated(true);
    onSetContentId(sessionFormIndex, content.contentFormIndex, 1);
  }

  const handleContentTitleChange = (e) => {
    onUpdateContent(sessionFormIndex, content.contentIndex, {
      ...content,
      contentTitle: e.target.value,
    });
  };

  const handleDeleteContent = () => {
    onRemoveContent(sessionFormIndex, content.contentFormIndex);
  };

  const handleContentTypeChange = (e) => {
    const newType = e.target.value;
    onUpdateContent(sessionFormIndex, content.contentFormIndex, {
      ...content,
       contentType: newType 
      });
  };

  return (
    <div className="details-contents-form">
      <button
        className="details-course-remove-button"
        onClick={handleDeleteContent}
      >
        <IoClose />
      </button>
      <button className="details-course-drag-indicator">
        <MdDragIndicator />
      </button>
      <h2>{content.contentFormIndex} 페이지</h2>
      <div className="content-input-group">
        <div className="input-with-button">
          <input
            type="text"
            id={`title-${content.contentId}`}
            value={content.contentTitle}
            onChange={handleContentTitleChange}
            // onBlur={handleTitleBlur}
            placeholder="인덱스의 제목을 입력하세요"
            required
          />
        </div>
      </div>

      {!isContentCreated && (
        <div className="details-content-btn-wrap">
          <button
            className="details-content-btn details-content-btn-primary"
            onClick={handleCreateContent}
          >
            확인
          </button>
        </div>
      )}

      {isContentCreated && (
        <div className="content-input-group-file-and-type">
          <div className="content-input-group">
            <select
              id={`type-${content.contentId}`}
              value={content.contentType}
              onChange={handleContentTypeChange}
              required
            >
              <option value="VIDEO">영상</option>
              <option value="QUIZ">퀴즈</option>
            </select>
          </div>
        </div>
      )}

      {isContentCreated && content.contentType === 'VIDEO' && (
        <div className="content-input-group">
          <ContentsUploadForm
            contentFormIndex={content.contentFormIndex}
            sessionFormIndex={sessionFormIndex}
            // courseId={courseId}
           />
        </div>
      )}

      {/* {isEditing && type === 'QUIZ' && (
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
      )} */}
    </div>
  );
};

export default ContentsDetailsForm;
