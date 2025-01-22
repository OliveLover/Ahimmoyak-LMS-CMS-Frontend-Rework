import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import AddCourseMeta from "../../components/admin/course/AddCourseMeta";
import AddSessionForm from "../../components/admin/course/AddSessionForm";


function CreateCourses() {
  const [forms, setForms] = useState([{ formId: 1, index: 1 }]);
  const [isCourseMetaVisible, setIsCourseMetaVisible] = useState(true);
  const [courseId, setCourseId] = useState(null);
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
  });

  const navigate = useNavigate();

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

  const handleSubmitCourse = () => {
    if (!courseData.courseTitle.trim()) {
      alert("과정 제목을 입력해주세요.");
      return;
    }

    axios
      .post('/api/v1/admin/courses', courseData)
      .then((response) => {
        if (response.data && response.data.courseId) {
          setCourseId(response.data.courseId);
          setIsCourseMetaVisible(false);
        }
      })
      .catch((error) => {
        console.error("There was an error creating the course:", error);
        alert("과정 생성 중 오류가 발생했습니다.");
      });
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
        {isCourseMetaVisible ? (
          <div>
            <AddCourseMeta courseData={courseData} setCourseData={setCourseData} />
            <button className="btn btn-primary mt-3" onClick={handleSubmitCourse}>
              과정 생성
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
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

export default CreateCourses;
