import { useState } from 'react';
import './AddCourseMeta.css';

const AddCourseMeta = () => {
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [courseType, setCourseType] = useState('');

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
      courseType
    });
  };

  return (
    <div className="add-course-meta-contents">
      <form onSubmit={handleSubmit}>
        {/* 과정명 입력 */}
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

        {/* 강사명 입력 */}
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

        {/* 과정소개 입력 */}
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

        <div className="course-meta-input-group-file-and-type">
          {/* 썸네일 업로드 */}
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

          {/* 타입 선택 */}
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
            </select>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AddCourseMeta;
