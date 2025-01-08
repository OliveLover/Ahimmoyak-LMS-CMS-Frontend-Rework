import ReactPlayer from 'react-player';

const VideoUI = () => {
  return (
    <ReactPlayer
      url="https://raw.githubusercontent.com/OliveLover/quizVideoPlayer/main/video/01.mp4"
      playing={true}
      controls={false}
      width="100%"
      height="100%"
    />)
}

export default VideoUI;