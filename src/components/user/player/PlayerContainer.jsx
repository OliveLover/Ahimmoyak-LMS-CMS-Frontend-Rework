import React, { useState, useRef, useEffect } from 'react';
import VideoUI from './video/VideoUI';
import NavbarUI from './navbar/NavbarUI';
import IndexUI from './index/IndexUI';
import './PlayerContainer.css';


const PlayerContainer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [showIndex, setShowIndex] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
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

  const toggleIndexUI = () => {
    setShowIndex((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying]);

  return (
    <div className="custom-player-container" ref={containerRef}>
      <div className="player-wrapper">
        <div className="video-container">
          <VideoUI
            isPlaying={isPlaying}
            playerRef={playerRef}
            handleProgress={handleProgress}
            handleDuration={handleDuration}
            isMuted={isMuted}
            volume={volume}
          />
          {showIndex && <IndexUI onClose={() => setShowIndex(false)} />}
        </div>

        <div className="navbar-container">
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
            toggleIndexUI={toggleIndexUI}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContainer;
