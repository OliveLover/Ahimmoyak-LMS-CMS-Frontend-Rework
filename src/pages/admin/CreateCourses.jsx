import React, { useState } from "react";
import CourseForm from "../../components/admin/course/CourseForm";

function CreateCourses() {
  const [forms, setForms] = useState([{ id: 1 }]);

  const addCourseForm = () => {
    const newForm = { id: forms.length + 1 };
    setForms([...forms, newForm]);
  };

  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      {forms.map((form) => (
        <CourseForm key={form.id} formId={form.id} />
      ))}
      <button className="btn btn-primary mt-3" onClick={addCourseForm}>
        + Add Course
      </button>
    </div>
  );
}

export default CreateCourses;
