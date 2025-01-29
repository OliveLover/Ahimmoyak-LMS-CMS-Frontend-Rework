import React from "react";
import "./QuizResult.css";
import QuizResultItem from "./QuizResultItem";

const QuizResult = ({ correctCount, total, incorrectQuestions, onRetry }) => {
  return (
    <div className="player-quiz-result-ui">
      <div className="player-quiz-result-container">
        <h2>퀴즈 결과</h2>
      </div>
      <div className="player-quiz-result-items">
        {Array.from({ length: total }).map((_, idx) => (
          <QuizResultItem
            key={idx}
            quizIndex={idx + 1}
            isCorrect={!incorrectQuestions.includes(idx + 1)}
          />
        ))}
      </div>
      <div className="retry-quiz-button" onClick={onRetry}>다시하기</div>
    </div>
  );
};

export default QuizResult;
