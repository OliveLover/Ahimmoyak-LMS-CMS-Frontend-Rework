import React, { useEffect, useState } from "react";
import CourseItem from "./CourseItem";
import axios from "../../../axios";
import "./MainCourseDisplay.css";

const MainCourseDisplay = ({type, category}) => {
  const [courses, setCourses] = useState([]);

  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`/api/v1/courses`);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const getCodeNumByNcsName = (ncsName) => {
    const categoryItem = category.find(item => item.displayName === ncsName);
    return categoryItem ? categoryItem.code : null;
  };

  return (
    <div className="main-ncs-course-container">
      <div className="main-ncs-course-title">
        <h2>직무능력향상과정</h2>
        <p>정부에서 지원합니다.</p>
      </div>
      <div className="course-grid">
        {courses.map((course, index) => {
          const code = getCodeNumByNcsName(course.ncsName);
          return (
            <CourseItem 
              key={index} 
              course={course}
              type={type}
              code={code}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MainCourseDisplay;
