import { useState } from 'react';
import AddContentsForm from './AddContentsForm';
import './CourseForm.css';

const CourseForm = ({ formId, index, onRemoveCourse }) => {
  const [contents, setContents] = useState([]);
  const [nextContentId, setNextContentId] = useState(1);

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

  const removeCourse = () => {
    const confirmRemove = window.confirm('현재 차시를 제거하시겠습니까?');
    if (confirmRemove) {
      onRemoveCourse(formId);
    }
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${formId}`}>
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${formId}`}
          aria-expanded="true"
          aria-controls={`collapse-${formId}`}
        >
          {index} 차시
        </button>
      </h2>
      <div
        id={`collapse-${formId}`}
        className="accordion-collapse collapse show"
        aria-labelledby={`heading-${formId}`}
      >
        <div className="accordion-body">
          {contents.map((content) => (
            <AddContentsForm
              key={content.contentId}
              contentId={content.contentId}
              contentIndex={content.contentIndex}
              onRemove={removeContent}
            />
          ))}
          <div className="course-form-button-group">
            <button className="btn btn-secondary mt-3" onClick={addContent}>
              + 콘텐츠 추가
            </button>
            <button className="btn btn-danger mt-3" onClick={removeCourse}>
              x 현재 차시 제거
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
