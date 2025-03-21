import React, { useEffect, useState } from "react";
import CourseItem from "./CourseItem";
import axios from "../../../axios";
import "./MainNcsCourseDisplay.css";

const MainNcsCourseDisplay = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`/api/v1/courses`);
      setCourses(response.data.courses.slice(0, 5)); // 최대 5개만 가져오기
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <div className="main-ncs-course-container">
      <div className="main-ncs-course-title">
        <h2>직무능력향상과정</h2>
        <p>정부에서 지원합니다.</p>
      </div>
      <div className="course-grid">
        {courses.map((course, index) => (
          <CourseItem key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default MainNcsCourseDisplay;
