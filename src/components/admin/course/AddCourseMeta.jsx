import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge'
import './AddCourseMeta.css';

const AddCourseMeta = ({ courseData, setCourseData }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData({ ...courseData, thumbnailPath: URL.createObjectURL(file) });
    }
  };

  const isCourseTitleValid = courseData.courseTitle.trim() !== '';

  const handleCardTypeChange = (e) => {
    const value = e.target.value;
    let updatedTypes = [...courseData.cardType];

    if (updatedTypes.includes(value)) {
      updatedTypes = updatedTypes.filter((cardType) => cardType !== value);
    } else {
      updatedTypes.push(value);
    }

    const cardTypeMapping = {
      '내일배움카드': 'NATIONAL_EMPLOYMENT_SUPPORT_CARD',
      '기업직업훈련카드': 'CORPORATE_TRAINING_SUPPORT_CARD',
    };

    const mappedCardTypes = updatedTypes.map(type => cardTypeMapping[type] || type);

    setCourseData({ ...courseData, cardType: mappedCardTypes });
  };

  const getDisplayCardType = (cardType) => {
    const displayMapping = {
      'NATIONAL_EMPLOYMENT_SUPPORT_CARD': '내일배움카드',
      'CORPORATE_TRAINING_SUPPORT_CARD': '기업직업훈련카드',
    };
    return displayMapping[cardType] || cardType;
  };

  return (
    <div className="add-course-meta-contents">
      <form>
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
            <label htmlFor="ncsClassfication">분류</label>
            <select
              id="ncsClassfication"
              value={courseData.ncsClassfication}
              onChange={(e) => setCourseData({ ...courseData, ncsClassfication: e.target.value })}
              required
            >
              <option>분류를 선택하세요</option>
              <option value="BUSINESS_MANAGEMENT">01. 사업관리</option>
              <option value="MANAGEMENT_ACCOUNTING_OFFICE_WORK">02. 경영·회계·사무</option>
            </select>
          </div>
        </div>

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

        <div className="course-meta-input-group-file-and-type">
          <div className="course-meta-input-group">
            <label htmlFor="fundingType">환급 여부</label>
            <select
              id="fundingType"
              value={courseData.fundingType}
              onChange={(e) => setCourseData({ ...courseData, fundingType: e.target.value })}
              required
            >
              <option>미정</option>
              <option value="NON_REFUNDABLE">비환급 과정</option>
              <option value="REFUNDABLE">환급 과정</option>
            </select>
          </div>
          <div className="course-meta-input-group">
            <label htmlFor="cardType">지원 종류</label>
            <div className="card-type-selection">
              {['NATIONAL_EMPLOYMENT_SUPPORT_CARD', 'CORPORATE_TRAINING_SUPPORT_CARD'].map((type) => (
                <button
                  key={type}
                  type="button"
                  value={type}
                  onClick={handleCardTypeChange}
                  className={courseData.cardType.includes(type) ? 'selected' : ''}
                >
                  {type === 'NATIONAL_EMPLOYMENT_SUPPORT_CARD' ? '내일배움카드' : '기업직업훈련카드'}
                </button>
              ))}
            </div>

            <div className="selected-card-types">
              <p>선택한 지원 종류</p>
              <div className="selecte-card-show-wrap">
                {courseData.cardType.length > 0 &&
                  courseData.cardType.map((type) => (
                    <Badge key={type} pill bg="secondary" className="m-1">
                      {getDisplayCardType(type)}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

        </div>

        <div className="course-meta-input-group-flex">
          <div className="course-meta-input-group">
            <label htmlFor="grade">등급</label>
            <select
              id="grade"
              value={courseData.grade}
              onChange={(e) => setCourseData({ ...courseData, grade: e.target.value })}
              required
            >
              <option value="PENDING">미정</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div className="course-meta-input-group">
            <label htmlFor="isActive">활성화 여부</label>
            <select
              id="isActive"
              value={courseData.status}
              onChange={(e) => setCourseData({ ...courseData, status: e.target.value })}
              required
            >
              <option value="INACTIVE">비활성화</option>
              <option value="ACTIVE">활성화</option>
            </select>
          </div>
        </div>

        <div className="course-meta-input-group-flex">
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
