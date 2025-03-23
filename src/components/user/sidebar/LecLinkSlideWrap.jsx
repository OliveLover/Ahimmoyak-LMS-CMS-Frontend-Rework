import React from "react";
import { useNavigate } from "react-router-dom";
import "./LecLinkSlideWrap.css";

const LecLinkSlideWrap = ({ title, categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (codeNum) => {
    navigate(`/courses/ncs/${codeNum}`);
  };

  return (
    <div className="lec-slide-wrap">
      <h3 className="slide-title">{title}</h3>
      <hr />
      <ul className="category-list">
        {categories.map((category) => (
          <li 
            key={category.codeNum} 
            className="category-item"
            onClick={() => handleCategoryClick(category.codeNum)}
          >
            {category.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LecLinkSlideWrap;
