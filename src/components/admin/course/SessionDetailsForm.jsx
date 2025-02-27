import './SessionDetailsForm.css';
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
import ContentsDetailsForm from './ContentsDetailsForm';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from "react-tooltip";
import axios from '../../../axios';

const SessionDetailsForm = ({
  courseId,
  session,
  onSetSessionId,
  onUpdateSession,
  onReorderSession,
  onRemoveSession,
  onAddContent,
  onSetContentId,
  onUpdateContent,
  onReorderContent,
  onRemoveContent,
  onAddQuiz,
  onSetQuizId,
  onUpdateQuiz,
  onRemoveQuiz,
}) => {
  const [isDraggable, setIsDraggable] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isSessionCreated, setIsSessionCreated] = useState(session.sessionId === null ? false : true);

  const contentRef = useRef(null);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    onUpdateSession(session.sessionFormIndex, e.target.value);
  };

  const handleSessionTitleBlur = async (e) => {
    const updatedTitle = e.target.value;

    onUpdateSession(session.sessionFormIndex, updatedTitle);

    if (session.sessionId) {
      try {
        await axios.put("/api/v1/admin/courses/sessions", {
          courseId,
          sessionId: session.sessionId,
          sessionTitle: updatedTitle,
        });
      } catch (error) {
        console.error("Error updating session title:", error);
      }
    }
  };

  const handleSessionDragStart = (e) => {
    e.dataTransfer.setData("sessionFormIndex", session.sessionFormIndex);
  }

  const handleSessionDrop = async (e) => {
    const fromSessionIndex = Number(e.dataTransfer.getData("sessionFormIndex"));
    const toSessionIndex = session.sessionFormIndex;

    if (fromSessionIndex !== toSessionIndex) {
      try {
        await axios.patch("/api/v1/admin/courses/sessions/reorder", {
          courseId,
          fromSessionIndex: fromSessionIndex,
          toSessionIndex: toSessionIndex,
        });

        onReorderSession(fromSessionIndex, toSessionIndex);
      } catch (error) {
        console.error("Error reordering session:", error);
      }
    }
  };

  const handleCreateSession = async () => {
    try {
      const newSessionIndex = session.sessionFormIndex;

      const response = await axios.post("/api/v1/admin/courses/sessions", {
        courseId,
        sessionTitle: session.sessionTitle || "새로운 차시",
        sessionIndex: newSessionIndex,
      });

      if (response.data && response.data.sessionId) {
        onSetSessionId(session.sessionFormIndex, response.data.sessionId);
      }

      setIsSessionCreated(true);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const handleAddContent = async () => {
    try {
      onAddContent(session.sessionFormIndex);

      const newContentIndex = session.contents.length + 1;

      const response = await axios.post("/api/v1/admin/courses/sessions/contents", {
        courseId,
        sessionId: session.sessionId,
        contentTitle: "새 콘텐츠",
        contentType: "VIDEO",
        contentIndex: newContentIndex,
      });

      if (response.data && response.data.contentId) {
        onSetContentId(session.sessionFormIndex, newContentIndex, response.data.contentId);
      }
    } catch (error) {
      console.error("Error adding content:", error);
    }
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="session-details-form"
      draggable={isDraggable}
      onDragStart={handleSessionDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleSessionDrop}
    >
      <div className="session-details-header-wrap">
        <div className="session-details-left-group">
          <button className="session-details-drag-indicator"
            onMouseEnter={() => setIsDraggable(true)}
            onMouseLeave={() => setIsDraggable(false)}
          >
            <MdDragIndicator />
          </button>
          <button className="session-details-btn session-details-btn-toggle" onClick={toggleContentVisibility}>
            {isContentVisible ? <><IoIosArrowDown title="접기" /> 접기</> : <><IoIosArrowUp title="펼치기" /> 펼치기</>}
          </button>
          <h2>{session.sessionFormIndex} 차시</h2>
        </div>

        <button
          className="session-details-preview-button"
          title="미리보기"
          data-tooltip-id="preview-tooltip"
          onClick={() => navigate(`/admin/course-info/${courseId}/sessions/${session.sessionId}/preview`)}
        >
          <VscOpenPreview />
        </button>

        <button className="session-details-remove-button" onClick={() => onRemoveSession(session.sessionFormIndex)}>
          <IoClose />
        </button>
        <Tooltip id="preview-tooltip" place="top" isOpen={true} > 미리보기 </ Tooltip>
      </div>

      <div className="session-details-btn-wrap">
        <input
          type="text"
          id={`sessionTitle-${session.sessionFormIndex}`}
          className="session-details-form-input-field"
          placeholder="차시 제목을 입력하세요"
          value={session.sessionTitle}
          onChange={handleTitleChange}
          onBlur={handleSessionTitleBlur}
        />
      </div>

      {!isSessionCreated && (
        <button className="session-details-btn session-details-btn-primary" onClick={handleCreateSession}>
          확인
        </button>
      )}

      {isSessionCreated && (
        <>
          <div
            className={`session-details-contents ${isContentVisible ? 'visible' : 'hidden'}`}
            ref={contentRef}
          >
            {(session.contents || [])
              .filter(content => content.contentFormIndex !== undefined)
              .sort((a, b) => a.contentFormIndex - b.contentFormIndex)
              .map((content, contentFormIndex) => (
                <ContentsDetailsForm
                  key={contentFormIndex + 1}
                  courseId={courseId}
                  sessionId={session.sessionId}
                  sessionFormIndex={session.sessionFormIndex}
                  content={content}
                  onUpdateContent={onUpdateContent}
                  onReorderContent={onReorderContent}
                  onRemoveContent={onRemoveContent}
                  onAddQuiz={onAddQuiz}
                  onSetQuizId={onSetQuizId}
                  onUpdateQuiz={onUpdateQuiz}
                  onRemoveQuiz={onRemoveQuiz}
                />
              ))}
            <button className="session-details-btn session-details-btn-primary"
              onClick={handleAddContent}
            >
              + 콘텐츠 추가
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SessionDetailsForm;
