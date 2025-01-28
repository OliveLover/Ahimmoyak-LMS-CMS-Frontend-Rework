import { IoClose } from "react-icons/io5";
import './IndexUI.css';

const IndexUI = ({ onClose, contents, sessionTitle, onSelectContent }) => {
  const sortedContents = [...contents].sort((a, b) => a.contentIndex - b.contentIndex);

  return (
    <div className="player-index-ui">
      <div className="index-button-wrap">
        <button className="index-close-button" onClick={onClose}>
          <IoClose />
        </button>
      </div>
      <span className="index-title">{sessionTitle}</span>
      <h3 />
      <ul className="index-ul">
        {sortedContents.map((content) => (
          <li
            className="index-li"
            key={content.contentId}
            onClick={() => onSelectContent(content.contentIndex)}
          >
            {content.contentTitle}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexUI;
