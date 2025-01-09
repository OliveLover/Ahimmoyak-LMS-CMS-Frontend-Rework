import ReactPlayer from 'react-player';

const VideoUI = ({ isPlaying, playerRef, handleProgress, handleDuration }) => {
  return (
    <ReactPlayer
      ref={playerRef}
      url="https://raw.githubusercontent.com/OliveLover/quizVideoPlayer/main/video/01.mp4"
      playing={isPlaying}
      controls={false}
      width="100%"
      height="100%"
      onProgress={handleProgress}
      onDuration={handleDuration}
    />
  );
};

export default VideoUI;
