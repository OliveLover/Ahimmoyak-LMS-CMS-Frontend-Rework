import { IoClose } from "react-icons/io5";
import './IndexUI.css';

const IndexUI = ({ onClose }) => (
  <div className="player-index-ui">
    <button className="close-button" onClick={onClose}>
      <IoClose />
    </button>
    Index
  </div>
);

export default IndexUI;
