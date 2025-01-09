import React from 'react';
import PlayerContainer from '../../components/user/player/PlayerContainer';

function MyCourses() {
  return (
    <div style={styles.container}>
      <PlayerContainer />
    </div>
  );
}

export default MyCourses;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '20px',
  },
};