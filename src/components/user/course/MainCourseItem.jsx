import React from "react";
import "./MainCourseItem.css";
import { useNavigate } from "react-router-dom";

const MainCourseItem = ({ course, type, code }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/courses/${type}/${code}/${course.courseId}`);
  }

  return (
    <div className="col-md-4 mb-4" onClick={handleNavigate}>
      <div className="card h-100 d-flex flex-column">
        <div className="main-image-container">
          <img
            src={course.thumbnailPath}
            className="card-img-top"
            alt={course.courseTitle}
          />
        </div>
        <div className="card-body d-flex flex-column flex-grow-1">
          <h5 className="main-card-title">{course.courseTitle}</h5>
        </div>
      </div>
    </div>
  );
};

export default MainCourseItem;
