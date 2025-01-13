import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseForm from "../../components/admin/course/CourseForm";
import AddCourseMeta from "../../components/admin/course/AddCourseMeta";

function EditCourses() {
  const [forms, setForms] = useState([{ formId: 1, index: 1 }]);
  const navigate = useNavigate();

  const addCourseForm = () => {
    const newFormId = forms.length > 0 ? Math.max(...forms.map(form => form.formId)) + 1 : 1;
    const newIndex = forms.length + 1;
    const newForm = { formId: newFormId, index: newIndex };
    setForms([...forms, newForm]);
  };

  const removeCourseForm = (formId) => {
    const updatedForms = forms.filter((form) => form.formId !== formId);
    const reorderedForms = updatedForms.map((form, idx) => ({
      ...form,
      index: idx + 1,
    }));
    setForms(reorderedForms);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerText}>과정 구성</div>
        <div style={styles.headerButtons}>
          <button style={styles.buttonSecondary} onClick={handleBack}>
            돌아가기
          </button>
          <button style={styles.buttonSuccess}>과정 생성</button>
        </div>
      </div>
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <AddCourseMeta />
        {forms.map((form) => (
          <CourseForm
            key={form.formId}
            formId={form.formId}
            index={form.index}
            onRemoveCourse={removeCourseForm}
          />
        ))}
        <button className="btn btn-primary mt-3" onClick={addCourseForm}>
          + 차시 추가
        </button>
      </div>
    </div>
  );
}

export default EditCourses;

const styles = {
  container: {
    position: 'relative',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  headerButtons: {
    display: 'flex',
    gap: '20px',
  },
  buttonSecondary: {
    fontSize: '14px',
    padding: '10px 15px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonSuccess: {
    fontSize: '14px',
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  headerText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
};
