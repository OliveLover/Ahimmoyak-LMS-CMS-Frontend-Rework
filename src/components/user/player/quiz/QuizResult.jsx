import React from "react";
import "./QuizUI.css";

const QuizResult = ({ correctCount, total }) => {
  return (
    <div className="player-quiz-ui">
      <div className="player-quiz-container">
        <h2>퀴즈 완료!</h2>
        <p>정답 개수: {correctCount} / {total}</p>
        <p>
          {correctCount === total
            ? "축하합니다! 모든 문제를 맞추셨습니다! 🎉"
            : "수고하셨습니다! 다음엔 더 좋은 결과를 기대합니다. 😊"}
        </p>
      </div>
    </div>
  );
};

export default QuizResult;
