import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import ContentsUploadForm from './ContentsUploadForm';
import AddQuizForm from './AddQuizForm';
import axios from '../../../axios';
import './ContentsDetailsForm.css';


const ContentsDetailsForm = ({
  courseId,
  sessionFormIndex,
  content,
  onUpdateContent,
  onReorderContent,
  onRemoveContent,
  onAddQuiz,
  onSetQuizId,
  onUpdateQuiz,
  onRemoveQuiz
}) => {
  const [isDraggable, setIsDraggable] = useState(false);

  const handleContentTitleChange = (e) => {
    onUpdateContent(sessionFormIndex, content.contentIndex, {
      ...content,
      contentTitle: e.target.value,
    });
  };

  const handleUpdateContentBlur = async () => {
    if (!content.contentId) return;

    try {
      await axios.put("/api/v1/admin/courses/sessions/contents", {
        courseId,
        contentId: content.contentId,
        contentTitle: content.contentTitle,
        contentType: content.contentType,
      });
    } catch (error) {
      console.error("Error updating content title:", error);
    }
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

  const handleAddQuiz = async () => {
    const newQuizIndex = content.quizzes.length + 1;

    if (newQuizIndex >= 6) {
      alert("최대 5개의 퀴즈만 추가할 수 있습니다.");
      return;
    }

    onAddQuiz(sessionFormIndex, content.contentFormIndex);

    try {
      const response = await axios.post("/api/v1/admin/courses/sessions/contents/quizzes", {
        courseId,
        contentId: content.contentId,
        quizId: null,
        quizIndex: newQuizIndex,
        question: "",
        options: ["", ""],
        answer: 0,
        explanation: "",
      });

      const quizId = response.data.quizId;

      onSetQuizId(sessionFormIndex, content.contentFormIndex, newQuizIndex, quizId);
    } catch (error) {
      console.error("Error creating quiz:", error);
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
            onBlur={handleUpdateContentBlur}
            placeholder="인덱스의 제목을 입력하세요"
            required
          />
        </div>
      </div>

      <div className="content-input-group-file-and-type">
        <div className="content-input-group">
          <select
            id={`type-${content.contentId}`}
            value={content.contentType}
            onChange={handleContentTypeChange}
            onBlur={handleUpdateContentBlur}
            required
          >
            <option value="VIDEO">영상</option>
            <option value="QUIZ">퀴즈</option>
          </select>
        </div>
      </div>

      {content.contentType === 'VIDEO' && (
        <div className="content-input-group">
          <ContentsUploadForm
            courseId={courseId}
            sessionFormIndex={sessionFormIndex}
            contentFormIndex={content.contentFormIndex}
            contentId={content.contentId}
            propVideoPath={content.videoPath}
            propFileName={content.fileName}
            propFileSize={content.fileSize}
            propVideoDuration={content.videoDuration} />
        </div>
      )}

      {content.contentType === 'QUIZ' && (
        <div className="quiz-section">
          {content.quizzes
            .slice()
            .sort((a, b) => a.quizFormIndex - b.quizFormIndex)
            .map((quiz, quizFormIndex) => (
              <div key={quizFormIndex + 1} className="quiz-form-wrapper">
                <AddQuizForm
                  courseId={courseId}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentsDetailsForm;
