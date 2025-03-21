import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthAxiosInstance from '../../axios-auth';
import CourseLifecycleStatus from '../../components/admin/course/CourseLifecycleStatus';


function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    AuthAxiosInstance
      .get('/api/v1/admin/courses')
      .then((response) => {
        setCourses(response.data.courses || response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const activeCourses = Array.isArray(courses) ? courses.filter(course => course.status === 'ACTIVE') : [];
  const inactiveCourses = Array.isArray(courses) ? courses.filter(course => course.status === 'INACTIVE') : [];
  const endedCourses = Array.isArray(courses) ? courses.filter(course => course.status === 'CLOSED') : [];

  return (
    <div>
      <div style={styles.header}>
        <Link to="/admin/create-courses">
          <button style={styles.createCourseButton}>새 과정 생성</button>
        </Link>
      </div>
      <div style={styles.gridContainer}>
        <div style={styles.gridItem}>
          <h2 style={styles.sectionTitle}>활성 과정</h2>
          <CourseLifecycleStatus courses={activeCourses} setCourses={setCourses} />
        </div>
        <div style={styles.gridItem}>
          <h2 style={styles.sectionTitle}>미활성 과정</h2>
          <CourseLifecycleStatus courses={inactiveCourses} setCourses={setCourses} />
        </div>
        <div style={styles.gridItem}>
          <h2 style={styles.sectionTitle}>종료 과정</h2>
          <CourseLifecycleStatus courses={endedCourses} setCourses={setCourses} />
        </div>
      </div>
    </div>
  );
}

const theme = {
  colors: {
    buttonBackground: '#4CAF50',
    buttonHoverBackground: '#45a049',
  },
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0.5rem',
  },
  createCourseButton: {
    backgroundColor: theme.colors.buttonBackground,
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gap: '1rem',
    height: '150vh',
    width: '100%',
    padding: '1rem',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    fontSize: '1.5rem',
    color: theme.colors.text,
    borderRadius: '8px',
    padding: '2rem',
  },
  sectionTitle: {
    marginBottom: '1rem',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: theme.colors.text,
  },
};

export default Courses;
