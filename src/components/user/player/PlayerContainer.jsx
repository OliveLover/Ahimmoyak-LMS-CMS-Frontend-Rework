import React, { useState, useRef } from 'react';
import VideoUI from './video/VideoUI';
import NavbarUI from './navbar/NavbarUI';
import './PlayerContainer.css';

const PlayerContainer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (state) => {
    const playedPercentage = state.played * 100;
    setProgressValue(playedPercentage);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    playerRef.current.seekTo(newTime, 'seconds');
    setProgressValue(e.target.value);
  };

  const handleDuration = (durationValue) => {
    setDuration(durationValue);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const onVolumeChange = (e) => {
    setVolume(e.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime(), 'seconds');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return (
    <div className="custom-player-container" ref={containerRef}>
      <VideoUI
        isPlaying={isPlaying}
        playerRef={playerRef}
        handleProgress={handleProgress}
        handleDuration={handleDuration}
        isMuted={isMuted}
        volume={volume}
      />
      <NavbarUI
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        progressValue={progressValue}
        duration={duration}
        onProgressChange={handleSeek}
        toggleFullscreen={toggleFullscreen}
        isMuted={isMuted}
        toggleMute={toggleMute}
        volume={volume}
        onVolumeChange={onVolumeChange}
      />
    </div>
  );
};

export default PlayerContainer;
