import React, { useEffect } from 'react';

function Dashboards() {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <div style={styles.gridContainer}>
      <div style={styles.gridItem}>Section 1</div>
      <div style={styles.gridItem}>Section 2</div>
      <div style={styles.gridItem}>Section 3</div>
      <div style={styles.gridItem}>Section 4</div>
    </div>
  );
}

const theme = {
  colors: {
    background: '#f0f0f0',
    border: '#ccc',
    text: '#333',
  },
};

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
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

export default Dashboards;