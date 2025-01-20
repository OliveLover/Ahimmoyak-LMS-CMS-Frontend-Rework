import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AddCourseMeta from "../../components/admin/course/AddCourseMeta";
import SessionDetailsForm from "../../components/admin/course/SessionDetailsForm";

function CourseDetails() {
  const [forms, setForms] = useState([{ formId: 1, index: 1 }]);
  const [courseData, setCourseData] = useState({
    courseTitle: "",
    courseIntroduce: "",
    status: "INACTIVE",
    activeStartDate: "",
    activeEndDate: "",
    instructor: "",
    thumbnailPath: "",
    grade: "PENDING",
    ncsClassification: "UNDEFINED",
    setDuration: 30,
    fundingType: "PENDING",
    cardType: [],
    sessions: [],
  });

  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    if (courseId) {
      axios
        .get(`http://localhost:8080/api/v1/admin/courses/${courseId}`)
        .then((response) => {
          setCourseData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching course data:", error);
        });
    }
  }, [courseId]);

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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerText}>훈련 과정 구성</div>
        <div style={styles.headerButtons}>
          <button className="btn btn-secondary mt-3" onClick={handleBack}>
            수정 완료
          </button>
        </div>
      </div>

      <div className="accordion" id="accordionPanelsStayOpenExample">
          <div>
            <AddCourseMeta courseData={courseData} setCourseData={setCourseData} />
          </div>
          <>
            {courseData.sessions
              .sort((a, b) => a.sessionIndex - b.sessionIndex)
              .map((session) => (
                <SessionDetailsForm
                  key={session.sessionId}
                  formId={session.sessionId}
                  courseId={courseId}
                  sessionIndex={session.sessionIndex}
                  sessionTitle={session.sessionTitle}
                  propContents={session.contents}
                  onRemoveSession={removeSessionForm}
                />
              ))}
            <button className="btn btn-primary mt-3" onClick={addSessionForm}>
              + 차시 추가
            </button>
          </>
      </div>
    </div>
  );
}

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

export default CourseDetails;
