import React, { useState } from "react";
import AddSessionForm from "../../components/admin/course/AddSessionForm";
import { useParams, useNavigate } from "react-router-dom";

function CreateSessions() {
  const [forms, setForms] = useState([{ formId: 1, index: 1 }]);
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/admin/courses`);
  };

  const addSessionForm = () => {
    const newFormId = forms.length > 0 ? Math.max(...forms.map((form) => form.formId)) + 1 : 1;
    const newIndex = forms.length + 1;
    const newForm = { formId: newFormId, index: newIndex };
    setForms([...forms, newForm]);
  };

  const removeSessionForm = (formId) => {
    const updatedForms = forms.filter((form) => form.formId !== formId);
    const reorderedForms = updatedForms.map((form, idx) => ({
      ...form,
      index: idx + 1,
    }));
    setForms(reorderedForms);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerText}>훈련 과정 구성</div>
        <div style={styles.headerButtons}>
          <button style={styles.buttonSecondary} onClick={handleBack}>
            돌아가기
          </button>
        </div>
      </div>

      <div className="accordion" id="accordionPanelsStayOpenExample">
        {forms.map((form) => (
          <AddSessionForm
            key={form.formId}
            formId={form.formId}
            courseId={courseId}
            sessionIndex={form.index}
            onRemoveSession={removeSessionForm}
          />
        ))}
        <button className="btn btn-primary mt-3" onClick={addSessionForm}>
          + 차시 추가
        </button>
      </div>
    </div>
  );
};

export default CreateSessions;

const styles = {
  container: {
    position: "relative",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  headerButtons: {
    display: "flex",
    gap: "20px",
  },
  buttonSecondary: {
    fontSize: "14px",
    padding: "10px 15px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  headerText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
};
