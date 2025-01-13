import React, { useState } from 'react';
import './AddCourseMeta.css';

const AddCourseMeta = ({ courseData, setCourseData }) => {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData({ ...courseData, thumbnailPath: URL.createObjectURL(file) });
    }
  };

  const isCourseTitleValid = courseData.courseTitle.trim() !== '';

  return (
    <div className="add-course-meta-contents">
      <form>
        {/* 첫째줄: 과정명 */}
        <div className="course-meta-input-group">
          <label htmlFor="courseName">과정명</label>
          <input
            type="text"
            id="courseName"
            value={courseData.courseTitle}
            onChange={(e) => setCourseData({ ...courseData, courseTitle: e.target.value })}
            placeholder="과정명을 입력하세요"
            required
          />
          <div className="course-meta-error-message">
          {!isCourseTitleValid && <small>과정명을 입력해야 합니다.</small>}
          </div>
        </div>

        {/* 둘째줄: 강사명, 분류 */}
        <div className="course-meta-input-group-flex">
          <div className="course-meta-input-group">
            <label htmlFor="instructor">강사명</label>
            <input
              type="text"
              id="instructor"
              value={courseData.instructor}
              onChange={(e) => setCourseData({ ...courseData, instructor: e.target.value })}
              placeholder="강사명을 입력하세요"
              required
            />
          </div>
          <div className="course-meta-input-group">
            <label htmlFor="category">분류</label>
            <select
              id="category"
              value={courseData.category}
              onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
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
            value={courseData.courseIntroduce}
            onChange={(e) => setCourseData({ ...courseData, courseIntroduce: e.target.value })}
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
            {courseData.thumbnailPath && <img src={courseData.thumbnailPath} alt="썸네일 미리보기" />}
          </div>
          <div className="course-meta-input-group">
            <label htmlFor="courseType">타입</label>
            <select
              id="courseType"
              value={courseData.fundingType}
              onChange={(e) => setCourseData({ ...courseData, fundingType: e.target.value })}
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
              value={courseData.grade}
              onChange={(e) => setCourseData({ ...courseData, grade: e.target.value })}
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
              value={courseData.setDuration}
              onChange={(e) => setCourseData({ ...courseData, setDuration: Math.min(100, Math.max(1, e.target.value)) })}
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
              value={courseData.status}
              onChange={(e) => setCourseData({ ...courseData, status: e.target.value })}
              required
            >
              <option value="ACTIVE">활성화</option>
              <option value="INACTIVE">비활성화</option>
            </select>
          </div>

          <div className="course-meta-input-group">
            <label htmlFor="startDate">시작일</label>
            <input
              type="date"
              id="startDate"
              value={courseData.activeStartDate}
              onChange={(e) => setCourseData({ ...courseData, activeStartDate: e.target.value })}
              required
            />
          </div>
          <div className="course-meta-input-group">
            <label htmlFor="endDate">종료일</label>
            <input
              type="date"
              id="endDate"
              value={courseData.activeEndDate}
              onChange={(e) => setCourseData({ ...courseData, activeEndDate: e.target.value })}
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCourseMeta;