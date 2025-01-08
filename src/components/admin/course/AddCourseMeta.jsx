import { useState } from 'react';
import './AddCourseMeta.css';

const AddCourseMeta = () => {
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [courseType, setCourseType] = useState('');
  const [category, setCategory] = useState('');
  const [grade, setGrade] = useState('미정');
  const [duration, setDuration] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      courseName,
      instructor,
      courseDescription,
      thumbnail,
      courseType,
      category,
      grade,
      duration,
      isActive,
      startDate,
      endDate,
    });
  };

  return (
    <div className="add-course-meta-contents">
      <form onSubmit={handleSubmit}>
        {/* 첫째줄: 과정명 */}
        <div className="course-meta-input-group">
          <label htmlFor="courseName">과정명</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="과정명을 입력하세요"
            required
          />
        </div>

        {/* 둘째줄: 강사명, 분류 */}
        <div className="course-meta-input-group-flex">
          <div className="course-meta-input-group">
            <label htmlFor="instructor">강사명</label>
            <input
              type="text"
              id="instructor"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="강사명을 입력하세요"
              required
            />
          </div>
          <div className="course-meta-input-group">
            <label htmlFor="category">분류</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">분류를 선택하세요</option>
              <option value="사업관리">01.사업관리</option>
              <option value="경영">02.경영</option>
              <option value="회계">03.회계</option>
              <option value="사무">04.사무</option>
            </select>
          </div>
        </div>

        {/* 셋째줄: 과정소개 */}
        <div className="course-meta-input-group">
          <label htmlFor="courseDescription">과정소개</label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            placeholder="과정 소개를 입력하세요"
            required
          />
        </div>

        {/* 넷째줄: 썸네일 업로드, 타입 */}
        <div className="course-meta-input-group-file-and-type">
          <div className="course-meta-input-group">
            <label htmlFor="thumbnail">썸네일 업로드</label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
            />
            {thumbnail && <img src={thumbnail} alt="썸네일 미리보기" />}
          </div>
          <div className="course-meta-input-group">
            <label htmlFor="courseType">타입</label>
            <select
              id="courseType"
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
              required
            >
              <option value="">타입을 선택하세요</option>
              <option value="내일배움카드">내일배움카드</option>
              <option value="기업직업훈련카드">기업직업훈련카드</option>
              <option value="국민내일배움카드">국민내일배움카드</option>
            </select>
          </div>
        </div>

        {/* 다섯째줄: 등급, 수강 기간 */}
        <div className="course-meta-input-group-flex">
          <div className="course-meta-input-group">
            <label htmlFor="grade">등급</label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            >
              <option value="미정">미정</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div className="course-meta-input-group">
            <label htmlFor="duration">수강 기간(일)</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Math.min(100, Math.max(1, e.target.value)))}
              min="1"
              max="100"
              required
            />
          </div>
        </div>

        {/* 여섯째줄: 활성화 여부, 시작일, 종료일 */}
        <div className="course-meta-input-group-flex">
          <div className="course-meta-input-group">
            <label htmlFor="isActive">활성화 여부</label>
            <select
              id="isActive"
              value={isActive ? 'true' : 'false'}
              onChange={(e) => setIsActive(e.target.value === 'true')}
              required
            >
              <option value="true">활성화</option>
              <option value="false">비활성화</option>
            </select>
          </div>

          <div className="course-meta-input-group">
            <label htmlFor="startDate">시작일</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="course-meta-input-group">
            <label htmlFor="endDate">종료일</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCourseMeta;
