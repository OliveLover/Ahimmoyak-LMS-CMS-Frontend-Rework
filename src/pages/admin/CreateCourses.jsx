import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseForm from "../../components/admin/course/CourseForm";
import AddCourseMeta from "../../components/admin/course/AddCourseMeta";

function CreateCourses() {
  const [forms, setForms] = useState([{ id: 1 }]);
  const navigate = useNavigate();

  const addCourseForm = () => {
    const newForm = { id: forms.length + 1 };
    setForms([...forms, newForm]);
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
          <CourseForm key={form.id} formId={form.id} />
        ))}
        <button className="btn btn-primary mt-3" onClick={addCourseForm}>
          + 차시 추가
        </button>
      </div>
    </div>
  );
}

export default CreateCourses;

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
