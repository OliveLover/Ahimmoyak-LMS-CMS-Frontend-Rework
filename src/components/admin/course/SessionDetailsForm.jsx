import './SessionDetailsForm.css';
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import ContentsDetailsForm from './ContentsDetailsForm';
import { useState, useRef, useEffect } from 'react';
import axios from '../../../axios';


const SessionDetailsForm = ({ propSessionId, courseId, sessionIndex, sessionTitle, onRemoveSession, propContents }) => {
  const [contents, setContents] = useState(propContents || []);
  const [sessionId, setSessionId] = useState(propSessionId || null);
  const [nextContentId, setNextContentId] = useState(1);
  const [localSessionTitle, setLocalSessionTitle] = useState(sessionTitle || '');
  const [isSessionCreated, setIsSessionCreated] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [contents, isContentVisible]);

  useEffect(() => {
    if (sessionId) {
      setContents((prevContents) =>
        prevContents.map((content) => ({
          ...content,
          sessionId,
        }))
      );
    }
  }, [sessionId]);

  const addContent = () => {
    const newContentId = nextContentId;
    setNextContentId(nextContentId + 1);
    const newContent = { contentId: newContentId, contentIndex: contents.length + 1 };
    setContents([...contents, newContent]);
  };

  const removeContent = (contentId) => {
    const updatedContents = contents.filter((content) => content.contentId !== contentId);
    setContents(updatedContents.map((content, idx) => ({
      ...content,
      contentIndex: idx + 1,
    })));
  };

  const removeSession = () => {
    const confirmRemove = window.confirm('현재 차시를 제거하시겠습니까?');
    if (confirmRemove) {
      onRemoveSession(sessionId);
    }
  };

  const handleInputChange = (event) => {
    setLocalSessionTitle(event.target.value);
  };

  const handleCreateSession = async () => {
    if (!localSessionTitle.trim()) {
      alert('차시 제목을 입력해주세요.');
      return;
    }

    const sessionData = {
      courseId,
      sessionId,
      sessionTitle: localSessionTitle,
      sessionIndex,
    };

    try {
      const response = await axios.post('/api/v1/admin/courses/sessions', sessionData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        const createdSessionId = response.data.sessionId;
        alert('차시가 성공적으로 생성되었습니다.');
        setIsSessionCreated(true);
        setIsEditing(false);
        setSessionId(createdSessionId);
      }
    } catch (error) {
      console.error('차시 생성 중 오류 발생:', error);
      alert('차시 생성에 실패했습니다.');
    }
  };

  const handleEditSession = () => {
    setIsEditing(true);
    setIsSessionCreated(false);
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="session-details-form">
      <div className="session-details-header-wrap">
        <div className="session-details-left-group">
          <button className="session-details-drag-indicator">
            <MdDragIndicator />
          </button>
          <button className="session-details-btn session-details-btn-toggle" onClick={toggleContentVisibility}>
            {isContentVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>
        <button className="session-details-remove-button" onClick={removeSession}>
          <IoClose />
        </button>
      </div>

      <div className="session-details-btn-wrap">
        <input
          type="text"
          id={`sessionTitle-${sessionId}`}
          className="session-details-form-input-field"
          placeholder="차시 제목을 입력하세요"
          value={localSessionTitle}
          onChange={handleInputChange}
          disabled={isSessionCreated}
        />
        {!isSessionCreated ? (
          <button className="session-details-btn session-details-btn-primary" onClick={handleCreateSession}>
            확인
          </button>
        ) : (
          <button className="session-details-btn session-details-btn-primary" onClick={handleEditSession}>
            수정
          </button>
        )}
      </div>

      {isSessionCreated && (
        <>
          <div
            className={`session-details-contents ${isContentVisible ? 'visible' : 'hidden'}`}
            ref={contentRef}
          >
            {contents
            .sort((a, b) => a.contentIndex - b.contentIndex)
            .map((content) => (
              <ContentsDetailsForm
                key={content.contentId}
                sessionId={sessionId}
                courseId={courseId}
                contentIndex={content.contentIndex}
                propContentId={content.contentId}
                propContentTitle={content.contentTitle}
                propContentType={content.contentType}
                propQuizzes={content.quizzes}
                onRemove={removeContent}
              />
            ))}
          </div>

          <button className="session-details-btn session-details-btn-primary" onClick={addContent}>
            + 콘텐츠 추가
          </button>
        </>
      )}
    </div>
  );
};

export default SessionDetailsForm;
