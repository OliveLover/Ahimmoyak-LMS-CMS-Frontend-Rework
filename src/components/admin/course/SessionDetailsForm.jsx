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


const SessionDetailsForm = ({ propSessionId, courseId, sessionIndex, propSessionTitle, onRemoveSession, propContents }) => {
  const [contents, setContents] = useState(propContents || []);
  const [sessionId, setSessionId] = useState(
    propSessionId && String(propSessionId).includes('session_') ? propSessionId : null
  );
  const [nextContentId, setNextContentId] = useState(1);
  const [sessionTitle, setSessionTitle] = useState(propSessionTitle || '');
  const [isSessionCreated, setIsSessionCreated] = useState(sessionId === null ? false : true);
  const [isEditing, setIsEditing] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);

  const contentRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
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
    setSessionTitle(event.target.value);
  };

  const handleCreateSession = async () => {
    if (!sessionTitle.trim()) {
      alert('차시 제목을 입력해주세요.');
      return;
    }

    const sessionData = {
      courseId,
      sessionId,
      sessionTitle: sessionTitle,
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

  const updateSession = async (updatedField) => {
    if (!sessionId || !courseId) {
      return;
    }

    const payload = {
      courseId,
      sessionId,
      sessionTitle: updatedField.title || sessionTitle,
    };

    try {
      const response = await axios.put('/api/v1/admin/courses/sessions', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status != 200) {
        alert(`차시 업데이트 실패: ${response.data.message}`);
      }
    } catch {
      console.error('Error updating session:', error);
      alert('차시 업데이트 중 오류가 발생했습니다.');
    }
  };

  const handleSessionTitleBlur = () => {
    updateSession({ sessionTitle });
  }

  const handleSessionTitleChange = (e) => {
    setSessionTitle(e.target.value);
  }

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
            {isContentVisible ? <><IoIosArrowDown title="접기" /> 접기</> : <><IoIosArrowUp title="펼치기" /> 펼치기</>}
          </button>
          <h2>{sessionIndex} 차시</h2>
        </div>
        {contents.length > 0 && (
          <button
            className="session-details-preview-button"
            title="미리보기"
            data-tooltip-id="preview-tooltip"
            onClick={() => navigate(`/admin/course-info/${courseId}/sessions/${sessionId}/preview`)}
          >
            <VscOpenPreview />
          </button>
        )}
        <button className="session-details-remove-button" onClick={removeSession}>
          <IoClose />
        </button>
        <Tooltip id="preview-tooltip" place="top" isOpen={true} >미리보기 </ Tooltip> 
      </div>

      <div className="session-details-btn-wrap">
        <input
          type="text"
          id={`sessionTitle-${sessionId}`}
          className="session-details-form-input-field"
          placeholder="차시 제목을 입력하세요"
          value={sessionTitle}
          onChange={handleSessionTitleChange}
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
            {contents
              .sort((a, b) => a.contentIndex - b.contentIndex)
              .map((content) => (
                <ContentsDetailsForm
                  key={content.contentId}
                  sessionId={sessionId}
                  courseId={courseId}
                  contentIndex={content.contentIndex}
                  sessionIndex={sessionIndex}
                  propContentId={content.contentId}
                  propContentTitle={content.contentTitle}
                  propContentType={content.contentType}
                  propVideoPath={content.videoPath}
                  propFileName={content.fileName}
                  propFileSize={content.fileSize}
                  propVideoDuration={content.videoDuration}
                  propQuizzes={content.quizzes}
                  onRemove={removeContent}
                />
              ))}
            <button className="session-details-btn session-details-btn-primary" onClick={addContent}>
              + 콘텐츠 추가
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SessionDetailsForm;
