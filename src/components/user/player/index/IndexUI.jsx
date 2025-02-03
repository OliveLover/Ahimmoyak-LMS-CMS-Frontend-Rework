import { useEffect, useRef } from "react";
import './IndexUI.css';

const IndexUI = ({ onClose, contents, sessionTitle, onSelectContent }) => {
  const indexRef = useRef(null);

  const sortedContents = [...contents].sort((a, b) => a.contentIndex - b.contentIndex);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (indexRef.current && !indexRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="player-index-ui" ref={indexRef}>
      <div className="index-button-wrap">
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
