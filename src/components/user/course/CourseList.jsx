import React from 'react';
import CourseItem from './CourseItem';


const CourseList = ({ courses }) => {
  return (
    <div className="container">
      <h2 className="text-center mb-4">다양한 기업교육 사례</h2>
      <div className="row">
        {courses.map((course, index) => (
          <CourseItem key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;