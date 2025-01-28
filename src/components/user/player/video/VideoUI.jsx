import ReactPlayer from 'react-player';


const VideoUI = ({ isPlaying, playerRef, handleProgress, handleDuration, isMuted, volume, videoUrl, onClick }) => {
  return (
    <div className="video-ui" onClick={onClick}>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        controls={false}
        width="100%"
        height="100%"
        onProgress={handleProgress}
        onDuration={handleDuration}
        muted={isMuted}
        volume={volume / 100}
      />
    </div>
  );
};

export default VideoUI;
