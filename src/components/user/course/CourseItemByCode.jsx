import { Link } from "react-router-dom";
import './CourseItemByCode.css';

const CourseItemByCode = ({ course, type, code }) => {
  return (
    <div className="course-item-by-code">
      <Link to={`/courses/${type}/${code}/${course.courseId}`} className="course-thumbnail-link">
        <img 
          src={course.thumbnailPath} 
          alt={course.courseTitle} 
          className="course-thumbnail-by-code" 
        />
      </Link>

      <div className="course-info-by-code">
        <div className="course-title-container-by-code">
          <h3 className="course-title-by-code">{course.courseTitle}</h3>

          {(course.fundingTypeName || course.cardTypeNames.length > 0) && (
            <div className="course-tags-by-code">
              {course.fundingTypeName && (
                <span className="course-funding-by-code">{course.fundingTypeName}</span>
              )}
              {course.cardTypeNames.length > 0 && course.cardTypeNames.map((card, index) => (
                <span key={index} className="course-card-by-code">{card}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseItemByCode;
