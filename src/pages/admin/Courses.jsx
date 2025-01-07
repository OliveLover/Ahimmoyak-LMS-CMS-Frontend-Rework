import React from 'react';
import { Link } from 'react-router-dom';

function Courses() {
  return (
    <div>
      <div style={styles.header}>
        <Link to="/admin/create-courses">
          <button style={styles.createCourseButton}>새 과정 생성</button>
        </Link>
      </div>
      <div style={styles.gridContainer}>
        <div style={styles.gridItem}>미활성 과정</div>
        <div style={styles.gridItem}>활성 과정</div>
        <div style={styles.gridItem}>종료 과정</div>
      </div>
    </div>
  );
}

const theme = {
  colors: {
    background: '#f0f0f0',
    border: '#ccc',
    text: '#333',
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
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr',
    gap: '1rem',
    height: 'calc(var(--vh, 1vh) * 100)',
    width: '100%',
    padding: '1rem',
    boxSizing: 'border-box',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    fontSize: '1.5rem',
    color: theme.colors.text,
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default Courses;