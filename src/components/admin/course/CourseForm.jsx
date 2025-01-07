import { useState } from 'react';
import AddContentsForm from './AddContentsForm';

const CourseForm = ({ formId }) => {
  const [contents, setContents] = useState([]);

  const addContent = () => {
    setContents([...contents, contents.length + 1]);
  }

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
          {formId} 차시
        </button>
      </h2>
      <div
        id={`collapse-${formId}`}
        className="accordion-collapse collapse show"
        aria-labelledby={`heading-${formId}`}
      >
        <div className="accordion-body">
          {contents.map((contentId) => (
            <AddContentsForm key={contentId} contentId={contentId} />
          ))}
          <button className="btn btn-secondary mt-3" onClick={addContent}>
            + 콘텐츠 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
