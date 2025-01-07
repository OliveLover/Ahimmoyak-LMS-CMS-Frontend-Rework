import './CourseForm.css';

const CourseForm = ({ formId }) => {
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
          <strong>This is accordion item #{formId}'s body.</strong> You can customize this content as needed.
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
