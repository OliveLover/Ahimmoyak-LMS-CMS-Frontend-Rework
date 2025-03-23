import React from "react";
import { useNavigate } from "react-router-dom";
import "./LecLinkSlideWrap.css";

const LecLinkSlideWrap = ({ title, categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (code) => {
    navigate(`/courses/ncs/${code}`);
  };

  return (
    <div className="lec-slide-wrap">
      <h3 className="slide-title">{title}</h3>
      <hr />
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category.code}
            className="category-item"
            onClick={() => handleCategoryClick(category.code)}
          >
            {category.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LecLinkSlideWrap;
