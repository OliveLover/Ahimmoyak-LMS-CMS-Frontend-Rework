import React, { useState } from 'react';

const CourseLifecycleStatus = () => {

  // 목 데이터
  const courseData = [
    {
      creationDate: '2025-01-01',
      modificationDate: '2025-01-05',
      courseName: 'React 기초',
      instructor: '홍길동',
      grade: 'A',
      category: '프로그래밍',
      courseDuration: '30일',
      activeDate: '2025-01-01',
      inactiveDate: '2025-01-31',
      daysUntilInactive: 10,
    },
  ];

  const handleModify = (courseName) => {
    alert(`${courseName} 강의를 수정합니다.`);
  };

  const handleRemove = (courseName) => {
    alert(`${courseName} 강의를 제거합니다.`);
  };

  return (
    <div className="course-lifecycle-status">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>생성 날짜</th>
            <th>수정 날짜</th>
            <th>강의 명</th>
            <th>강사명</th>
            <th>등급</th>
            <th>분류</th>
            <th>강의 기간</th>
            <th>활성 날짜</th>
            <th>비활성 날짜</th>
            <th>비활성까지 남은 기간</th>
            <th>수정</th>
            <th>제거</th>
          </tr>
        </thead>
        <tbody>
          {courseData.map((course, index) => (
            <tr key={index}>
              <td>{course.creationDate}</td>
              <td>{course.modificationDate}</td>
              <td>{course.courseName}</td>
              <td>{course.instructor}</td>
              <td>{course.grade}</td>
              <td>{course.category}</td>
              <td>{course.courseDuration}</td>
              <td>{course.activeDate}</td>
              <td>{course.inactiveDate}</td>
              <td>{course.daysUntilInactive}일</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleModify(course.courseName)}>
                  수정
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleRemove(course.courseName)}>
                  제거
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseLifecycleStatus;
