import { useEffect, useState } from "react";
import axios from "../../../axios";
import CourseItemByCode from './CourseItemByCode';
import './CoursesByCode.css';

const CoursesByCode = ({ type, code, categories }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourseDatyaByCode = async () => {
      try {
        const response = await axios.get(`/api/v1/courses/${code}`);
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    if (code) {
      fetchCourseDatyaByCode();
    }
  }, [code]);

  const category = categories.find(category => category.code === code);
  const categoryName = category ? category.displayName : "카테고리가 없습니다.";

  return (
    <div className="course-by-code-container">
      <div className="course-by-code-title" >
        <p>직무능력 향상 과정</p>
      </div>
      <div className="course-by-code-category-name">
        <p>{categoryName}</p>
      </div>
      {courses.length > 0 ? (
        courses.map((course) => <CourseItemByCode key={course.courseId} course={course} type={type} code={code} />)
      ) : (
        <p>강좌가 없습니다.</p>
      )}
    </div>
  );

}

export default CoursesByCode;