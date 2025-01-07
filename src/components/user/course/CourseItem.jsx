import React from 'react';

const CourseItem = ({ course }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={course.image} className="card-img-top" alt={course.title} />
        <div className="card-body">
          <h5 className="card-title">{course.title}</h5>
          <p className="card-text">{course.description}</p>
          <div className="d-flex justify-content-between">
            <span className="badge bg-primary">{course.category}</span>
            <span>{course.sessions}회차</span>
            <span>{course.hours}시간</span>
            <span>{course.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;