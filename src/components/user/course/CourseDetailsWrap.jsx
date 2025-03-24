import './CourseDetailsWrap.css';

const CourseDetailsWrap = ({ courseDetails }) => {
  if (!courseDetails) {
    return <p>Loading course details...</p>;
  }

  const startDate = courseDetails.startDate || '-';
  const endDate = courseDetails.endDate || '-';

  return (
    <div className="course-details-wrap">
      <div className="course-details-title">
        <p>{courseDetails.courseTitle}</p>
        <div className="course-tags">
          {courseDetails.fundingTypeName && (
            <span className="course-funding">{courseDetails.fundingTypeName}</span>
          )}
          {courseDetails.cardTypeNames && courseDetails.cardTypeNames.length > 0 && courseDetails.cardTypeNames.map((card, index) => (
            <span key={index} className="course-card">{card}</span>
          ))}
        </div>
      </div>

      <div className="course-details-container">
        <div className="course-details-thumbnail-container">
          <img
            src={courseDetails.thumbnailPath}
            alt="Course Thumbnail"
            className="course-details-thumbnail"
          />
        </div>

        <div className="course-details-info">
          <div>
            <p>
              <strong>수강 기간 :</strong> <span className="course-details-text-muted">{courseDetails.setDuration} 일</span>
            </p>
            <p>
              <strong>학습 기간 :</strong> <span className="course-details-text-muted">{startDate} {endDate !== '-' && `~ ${endDate}`}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="course-details-info-wrap">
        <p className="course-details-info-title">📍 과정 소개</p>
        <p className="course-details-info-contents">{courseDetails.courseIntroduce}</p>
      </div>

      <div className="course-details-info-wrap">
        <p className="course-details-info-title">📍 교수 소개</p>
        <p className="course-details-info-contents">{courseDetails.instructor}</p>
      </div>
    </div>
  );
};

export default CourseDetailsWrap;
