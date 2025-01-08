import React, { useState } from 'react';
import NavbarUI from './navbar/NavbarUI';
import VideoUI from './video/VideoUI';
import IndexUI from './index/IndexUI';
import './PlayerContainer.css';

const PlayerContainer = () => {
  return (
    <div className="custom-player-container">
      <VideoUI />
      <IndexUI />
      <NavbarUI />
    </div>
  );
};

export default PlayerContainer;