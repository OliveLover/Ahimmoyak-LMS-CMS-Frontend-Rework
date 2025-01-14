import './AddSessionForm.css';
import AddContentsForm from './AddContentsForm';
import { useState } from 'react';
import axios from 'axios';

const AddSessionForm = ({ formId, courseId, sessionIndex, onRemoveSession }) => {
  const [contents, setContents] = useState([]);
  const [nextContentId, setNextContentId] = useState(1);
  const [sessionTitle, setSessionTitle] = useState('');
  const [isSessionCreated, setIsSessionCreated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
      onRemoveSession(formId);
    }
  };

  const handleInputChange = (event) => {
    setSessionTitle(event.target.value);
  };

  const handleCreateSession = async () => {
    if (!sessionTitle.trim()) {
      alert('세션 제목을 입력해주세요.');
      return;
    }

    const sessionData = {
      courseId,
      sessionId: null,
      sessionTitle,
      sessionIndex,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/admin/courses/sessions', sessionData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        alert('세션이 성공적으로 생성되었습니다.');
        setIsSessionCreated(true);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('세션 생성 중 오류 발생:', error);
      alert('세션 생성에 실패했습니다.');
    }
  };

  const handleEditSession = () => {
    setIsEditing(true);
    setIsSessionCreated(false);
  };

  return (
    <div className="add-session-form">
      <div className="add-session-header-wrap">
        <button className="add-session-remove-button" onClick={removeSession}>
          ×
        </button>
      </div>
      <div className="add-session-btn-wrap">
        <input
          type="text"
          id={`sessionTitle-${formId}`}
          className="add-session-form-input-field"
          placeholder="세션 제목을 입력하세요"
          value={sessionTitle}
          onChange={handleInputChange}
          disabled={isSessionCreated}
        />
        {!isSessionCreated ? (
          <button className="add-session-btn add-session-btn-primary" onClick={handleCreateSession}>
            확인
          </button>
        ) : (
          <button className="add-session-btn add-session-btn-primary" onClick={handleEditSession}>
            수정
          </button>
        )}
      </div>
      {isSessionCreated && (
        <>
          <div>
            {contents.map((content) => (
              <AddContentsForm
                key={content.contentId}
                contentId={content.contentId}
                contentIndex={content.contentIndex}
                onRemove={removeContent}
              />
            ))}
          </div>
          <button className="add-session-btn add-session-btn-primary" onClick={addContent}>
            + 콘텐츠 추가
          </button>
        </>
      )}
    </div>
  );
};

export default AddSessionForm;
