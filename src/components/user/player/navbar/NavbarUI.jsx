import { IoPlay, IoPause } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoScreenFull } from "react-icons/go";
import { AiFillSound, AiOutlineSound } from "react-icons/ai";
import './NavbarUI.css';


const NavbarUI = ({
  isPlaying,
  togglePlay,
  progressValue,
  duration,
  onProgressChange,
  toggleFullscreen,
  isMuted,
  toggleMute,
  volume,
  onVolumeChange,
  toggleIndexUI
}) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="player-navbar-ui">
      <div className="navbar-index">
        <span onClick={toggleIndexUI}>INDEX</span>
      </div>

      <div className="navbar-progress">
        <button className="play-button" onClick={togglePlay}>
          {isPlaying ? <IoPause /> : <IoPlay />}
        </button>
        <div className="progress-bar">
          <input
            type="range"
            min="0"
            max="100"
            value={progressValue}
            onChange={onProgressChange}
            className="progress-slider"
          />
        </div>

        <span className="time-display">
          {formatTime((progressValue / 100) * duration)} / {formatTime(duration)}
        </span>
      </div>

      <button className="fullscreen-button" onClick={toggleFullscreen}>
        <GoScreenFull />
      </button>

      <div className="navbar-sound">
        <button className="mute-button" onClick={toggleMute}>
          {isMuted ? <AiOutlineSound /> : <AiFillSound />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={onVolumeChange}
          className="volume-slider"
          disabled={isMuted}
        />
      </div>

      <div className="navbar-page">
        <IoIosArrowBack />
        <span>09 / 10</span>
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default NavbarUI;
