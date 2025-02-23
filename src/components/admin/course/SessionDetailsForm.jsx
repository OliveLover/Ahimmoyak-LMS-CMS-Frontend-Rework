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

const SessionDetailsForm = ({ session, onUpdateSession, onRemoveSession }) => {

  const handleTitleChange = (e) => {
    onUpdateSession(session.sessionFormIndex, e.target.value);
  };

  return (
    <div className="session-details-form">
      <div className="session-details-header-wrap">
        <div className="session-details-left-group">
          <button className="session-details-drag-indicator">
            <MdDragIndicator />
          </button>
          {/* <button className="session-details-btn session-details-btn-toggle">
            {isContentVisible ? <><IoIosArrowDown title="접기" /> 접기</> : <><IoIosArrowUp title="펼치기" /> 펼치기</>}
          </button> */}
          <h2>{session.sessionFormIndex} 차시</h2>
        </div>
        {/* {contents.length > 0 && (
          <button
            className="session-details-preview-button"
            title="미리보기"
            data-tooltip-id="preview-tooltip"
            onClick={() => navigate(`/admin/course-info/${courseId}/sessions/${sessionId}/preview`)}
          >
            <VscOpenPreview />
          </button>
        )} */}
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
        />
      </div>

      {/* {!isSessionCreated && (
        <button className="session-details-btn session-details-btn-primary">
          확인
        </button>
      )} */}

      {/* {isSessionCreated && (
        <>
          <div
            className={`session-details-contents ${isContentVisible ? 'visible' : 'hidden'}`}
            ref={contentRef}
          >
            {contents
              .sort((a, b) => a.contentIndex - b.contentIndex)
              .map((content, contentIndex) => (
                <ContentsDetailsForm
                  key={contentIndex + 1}
                  sessionId={sessionId}
                  courseId={courseId}
                />
              ))}
            <button className="session-details-btn session-details-btn-primary">
              + 콘텐츠 추가
            </button>
          </div>
        </>
      )} */}
    </div>
  );
};

export default SessionDetailsForm;
