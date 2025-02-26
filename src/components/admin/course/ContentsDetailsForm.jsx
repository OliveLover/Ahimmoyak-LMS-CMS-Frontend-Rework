import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import ContentsUploadForm from './ContentsUploadForm';
import AddQuizForm from './AddQuizForm';
import axios from '../../../axios';
import './ContentsDetailsForm.css';


const ContentsDetailsForm = ({
  sessionFormIndex,
  content,
  onSetContentId,
  onUpdateContent,
  onReorderContent,
  onRemoveContent,
  onAddQuiz,
  onSetQuizId,
  onUpdateQuiz,
  onRemoveQuiz
}) => {
  const [isDraggable, setIsDraggable] = useState(false);
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

  const handleContentDragStart = (e) => {
    e.dataTransfer.setData("contentFormIndex", content.contentFormIndex);
  }

  const handleContentDrop = (e) => {
    e.preventDefault();
  
    const fromContentIndex = Number(e.dataTransfer.getData("contentFormIndex"));
    const toContentIndex = content.contentFormIndex;
  
    if (fromContentIndex !== toContentIndex) {
      onReorderContent(fromContentIndex, toContentIndex, sessionFormIndex);
    }
  };

  const handleAddQuiz = () => {
    const currentQuizCount = content.quizzes.length;

    if (currentQuizCount < 5) {
      onAddQuiz(sessionFormIndex, content.contentFormIndex);
    } else {
      alert('최대 5개의 퀴즈만 추가할 수 있습니다.');
    }
  };

  return (
    <div className="details-contents-form"
      draggable={isDraggable}
      onDragStart={handleContentDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleContentDrop}>
      <button
        className="details-course-remove-button"
        onClick={handleDeleteContent}
      >
        <IoClose />
      </button>
      <button className="details-course-drag-indicator"
        onMouseEnter={() => setIsDraggable(true)}
        onMouseLeave={() => setIsDraggable(false)}
      >
        <MdDragIndicator />
      </button>
      <h2>{content.contentFormIndex} 페이지</h2>
      <div className="content-input-group">
        <div className="input-with-button">
          <input
            type="text"
            id={`title-${content.contentId}`}
            value={content.contentTitle || ""}
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

      {isContentCreated && content.contentType === 'QUIZ' && (
        <div className="quiz-section">
          {content.quizzes
            .slice()
            .sort((a, b) => a.quizFormIndex - b.quizFormIndex)
            .map((quiz, quizFormIndex) => (
              <div key={quizFormIndex + 1} className="quiz-form-wrapper">
                <AddQuizForm
                  quizFormIndex={quiz.quizFormIndex}
                  sessionFormIndex={sessionFormIndex}
                  contentFormIndex={content.contentFormIndex}
                  quiz={quiz}
                  onUpdateQuiz={onUpdateQuiz}
                  onRemoveQuiz={onRemoveQuiz}
                />
              </div>
            ))}
          <div className="quiz-controls">
            <button type="button" onClick={handleAddQuiz}>
              퀴즈 추가
            </button>
            <button type="button">
              퀴즈 저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentsDetailsForm;
