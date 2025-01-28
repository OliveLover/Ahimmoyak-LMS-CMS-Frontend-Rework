import React, { useState, useRef, useEffect } from 'react';
import VideoUI from './video/VideoUI';
import QuizUI from './quiz/QuizUI';
import NavbarUI from './navbar/NavbarUI';
import IndexUI from './index/IndexUI';
import './PlayerContainer.css';

const PlayerContainer = ({ propSession }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [showIndex, setShowIndex] = useState(false);
  const [contentsIndex, setContentIndex] = useState(1);
  const [contentsLength, setContentsLength] = useState(1);
  const [videoUrl, setVideoUrl] = useState('');

  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (propSession?.contents) {
      setContentsLength(propSession.contents.length);
      const currentContent = propSession.contents.find(content => content.contentIndex === contentsIndex);
      if (currentContent?.videoPath) {
        setVideoUrl(currentContent.videoPath);
      }
    }
  }, [propSession, contentsIndex]);

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

  const togglePlay = () => setIsPlaying(prevState => !prevState);

  const handleProgress = (state) => {
    const playedPercentage = state.played * 100;
    setProgressValue(playedPercentage);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    playerRef.current.seekTo(newTime, 'seconds');
    setProgressValue(e.target.value);
  };

  const handleDuration = (durationValue) => setDuration(durationValue);

  const toggleMute = () => setIsMuted(prev => !prev);

  const onVolumeChange = (e) => setVolume(e.target.value);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.() ||
        containerRef.current.mozRequestFullScreen?.() ||
        containerRef.current.webkitRequestFullscreen?.() ||
        containerRef.current.msRequestFullscreen?.();
      setShowIndex(false);
    } else {
      document.exitFullscreen?.() ||
        document.mozCancelFullScreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.msExitFullscreen?.();
    }
  };

  const toggleIndexUI = () => setShowIndex(prev => !prev);

  const nextContent = () => {
    if (contentsIndex < contentsLength) {
      setContentIndex(contentsIndex + 1);
    }
  };

  const prevContent = () => {
    if (contentsIndex > 1) {
      setContentIndex(contentsIndex - 1);
    }
  };

  const onSelectContent = (index) => {
    setContentIndex(index);
  };

  const currentContent = propSession?.contents?.find(content => content.contentIndex === contentsIndex);

  useEffect(() => {
    if (currentContent?.contentType === 'QUIZ') {
      setDuration(0);
      setProgressValue(0);
    }
  }, [currentContent]);

  return (
    <div className="custom-player-container" ref={containerRef}>
      <div className="player-wrapper">
        <div className="video-container">
          {currentContent?.contentType === 'VIDEO' ? (
            <VideoUI
              isPlaying={isPlaying}
              playerRef={playerRef}
              handleProgress={handleProgress}
              handleDuration={handleDuration}
              isMuted={isMuted}
              volume={volume}
              videoUrl={videoUrl}
              onClick={() => togglePlay()}
            />
          ) : currentContent?.contentType === 'QUIZ' ? (
            <QuizUI quizzes={currentContent.quizzes} />
          ) : null}

          {showIndex && (
            <div className="index-container" >
              <IndexUI
                onClose={() => setShowIndex(false)}
                contents={propSession.contents}
                sessionTitle={propSession.sessionTitle}
                onSelectContent={onSelectContent}
              />
            </div>
          )}
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
            contentsIndex={contentsIndex}
            totalContents={contentsLength}
            nextContent={nextContent}
            prevContent={prevContent}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContainer;
