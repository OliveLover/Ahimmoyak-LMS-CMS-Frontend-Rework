import React from "react";
import { IoIosClose } from "react-icons/io";
import { LiaCircle } from "react-icons/lia";
import './QuizResultItem.css';


const QuizResultItem = ({ quizIndex, isCorrect }) => {
  return (
    <div className="player-quiz-result-item">
      <div className="player-quiz-result-item-index">Q{quizIndex}</div>
      <div className="player-quiz-result-wrap">
        {isCorrect ? (
          <LiaCircle className="player-quiz-result-sign o" />
        ) : (
          <IoIosClose className="player-quiz-result-sign x" />
        )}
      </div>
    </div>
  );
};

export default QuizResultItem;
