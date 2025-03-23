import React from "react";
import "./CourseItem.css";
import { useNavigate } from "react-router-dom";

const CourseItem = ({ course }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/courses/ncs/${course.courseId}`);
  }

  return (
    <div className="col-md-4 mb-4" onClick={handleNavigate}>
      <div className="card h-100 d-flex flex-column">
        <div className="image-container">
          <img
            src={course.thumbnailPath}
            className="card-img-top"
            alt={course.courseTitle}
          />
        </div>
        <div className="card-body d-flex flex-column flex-grow-1">
          <h5 className="card-title">{course.courseTitle}</h5>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
