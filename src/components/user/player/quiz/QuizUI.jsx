import React, { useState } from "react";
import QuizResult from "./QuizResult";
import "./QuizUI.css";

const QuizUI = ({ quizzes }) => {
  const sortedQuizzes = [...quizzes].sort((a, b) => parseInt(a.quizIndex) - parseInt(b.quizIndex));

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuiz = sortedQuizzes[currentQuizIndex];

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    if (index === currentQuiz.answer) {
      setIsCorrect(true);
      setCorrectCount(correctCount + 1);
      setShowExplanation(true);
    } else {
      setAttemptsLeft(attemptsLeft - 1);
      if (attemptsLeft - 1 === 0) {
        setShowExplanation(true);
      }
      setIsCorrect(false);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setAttemptsLeft(3);
    if (currentQuizIndex < sortedQuizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return <QuizResult correctCount={correctCount} total={sortedQuizzes.length} />;
  }

  return (
    <div className="player-quiz-ui">
      <div className="player-quiz-container">
        <div className="player-quiz-question">
          <h2>Q{currentQuizIndex + 1}</h2>
          <p>{currentQuiz.question}</p>
        </div>
        <div className="player-quiz-options">
          {currentQuiz.options.map((option, index) => (
            <button
              key={index}
              className={`player-quiz-option ${selectedOption === index && isCorrect === true
                  ? "correct"
                  : selectedOption === index && isCorrect === false
                    ? "incorrect"
                    : ""
                }`}
              onClick={() => handleOptionClick(index)}
              disabled={showExplanation}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedOption !== null && !showExplanation && (
          <p className="attempts-left">남은 기회: {attemptsLeft}번</p>
        )}
        {showExplanation && (
          <div className="player-quiz-explanation">
            <p>해설: {currentQuiz.explanation}</p>
          </div>
        )}
        {showExplanation && (
          <button className="next-quiz-button" onClick={handleNextQuiz}>
            다음 퀴즈
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizUI;
