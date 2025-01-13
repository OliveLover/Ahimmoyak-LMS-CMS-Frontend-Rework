import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddCourseMeta from "../../components/admin/course/AddCourseMeta";
import CourseForm from "../../components/admin/course/CourseForm";

function CreateCourses() {
  const [forms, setForms] = useState([{ formId: 1, index: 1 }]);
  const [isCourseMetaVisible, setIsCourseMetaVisible] = useState(true);
  const [courseData, setCourseData] = useState({
    courseTitle: "",
    courseIntroduce: "",
    status: "",
    activeStartDate: "",
    activeEndDate: "",
    instructor: "",
    thumbnailPath: "",
    grade: "",
    category: "",
    setDuration: 30,
    fundingType: "",
    cardType: [],
  });
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

  const handleSubmitCourse = () => {
    if (!courseData.courseTitle.trim()) {
      return;
    }

    axios
      .post("http://localhost:8080/api/v1/admin/courses", courseData)
      .catch((error) => {
        console.error("There was an error creating the course:", error);
      });

    setIsCourseMetaVisible(false);
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
            <AddCourseMeta
              courseData={courseData}
              setCourseData={setCourseData}
            />
            <button className="btn btn-primary mt-3" onClick={handleSubmitCourse}>
              과정 생성
            </button>
          </div>
        ) : (
          <>
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
