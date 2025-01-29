import React, { useState } from "react";
import QuizResult from "./QuizResult";
import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
  TbCircleNumber4,
  TbCircleNumber5,
} from "react-icons/tb";
import "./QuizUI.css";

const QuizUI = ({ quizzes }) => {
  const sortedQuizzes = [...quizzes].sort((a, b) => parseInt(a.quizIndex) - parseInt(b.quizIndex));

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuiz = sortedQuizzes[currentQuizIndex];

  const numberIcons = [
    <TbCircleNumber1 key={1} />,
    <TbCircleNumber2 key={2} />,
    <TbCircleNumber3 key={3} />,
    <TbCircleNumber4 key={4} />,
    <TbCircleNumber5 key={5} />,
  ];

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    if (index === currentQuiz.answer) {
      setIsCorrect(true);
      setCorrectCount(correctCount + 1);
      setShowExplanation(true);
    } else {
      const newAttemptsLeft = attemptsLeft - 1;
      setAttemptsLeft(newAttemptsLeft);
      alert(`틀렸습니다! 남은 기회: ${newAttemptsLeft}번`);
      if (newAttemptsLeft === 0) {
        setShowExplanation(true);
      }
      setIsCorrect(false);

      if (!incorrectQuestions.includes(currentQuizIndex + 1)) {
        setIncorrectQuestions((prevIncorrectQuestions) => [
          ...prevIncorrectQuestions,
          currentQuizIndex + 1,
        ]);
      }
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

  const handleRetryQuiz = () => {
    setCorrectCount(0);
    setIncorrectQuestions([]);
    setIsFinished(false);
    setAttemptsLeft(3);
    setCurrentQuizIndex(0);
  };

  if (isFinished) {
    return (
      <div className="player-quiz-ui">
        <div className="player-quiz-container">
          <QuizResult
            correctCount={correctCount}
            total={sortedQuizzes.length}
            incorrectQuestions={incorrectQuestions}
            onRetry={handleRetryQuiz}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="player-quiz-ui">
      <div className="player-quiz-container">
        <div className="player-quiz-question-wrap">
          <div className="player-quiz-index">
            <p>Q{currentQuizIndex + 1}.</p>
          </div>
          <div className="player-quiz-question">
            <p>{currentQuiz.question}</p>
          </div>
        </div>
        <div className="player-quiz-options">
          {currentQuiz.options.map((option, index) => (
            <div className="player-quiz-option-wrap" key={index} onClick={() => !showExplanation && handleOptionClick(index)} >
              <div className="player-quiz-option-index" >{numberIcons[index]}</div>
              <div
                className={`player-quiz-option ${selectedOption === index && isCorrect === true
                  ? "correct"
                  : selectedOption === index && isCorrect === false
                    ? "incorrect"
                    : ""
                  }`}
                style={{ pointerEvents: showExplanation ? "none" : "auto" }}
              >
                {option}
              </div>
            </div>
          ))}
        </div>
        <div className="player-quiz-explanation-wrap">
          {showExplanation && (
            <div className="player-quiz-explanation">
              <p>{currentQuiz.explanation}</p>
            </div>
          )}
        </div>
        <div className="player-quiz-button-wrap">
          {showExplanation && (
            <button className="next-quiz-button" onClick={handleNextQuiz}>
              다음 퀴즈
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizUI;
