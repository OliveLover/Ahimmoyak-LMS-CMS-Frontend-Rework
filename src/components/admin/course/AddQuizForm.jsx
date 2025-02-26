import { useState } from 'react';
import './AddQuizForm.css';


const AddQuizForm = ({ sessionFormIndex, contentFormIndex, quizFormIndex, quiz, onUpdateQuiz, onRemoveQuiz }) => {
  const [options, setOptions] = useState(quiz.options || ['', '']);
  const [numOptions, setNumOptions] = useState(options.length);

  const handleChoiceChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;

    const updatedQuiz = {
      ...quiz,
      options: updatedOptions
    };

    setOptions(updatedOptions);
    onUpdateQuiz(sessionFormIndex, contentFormIndex, quizFormIndex, updatedQuiz);
  };

  const handleQuestionChange = (e) => {
    const updatedQuiz = { ...quiz, question: e.target.value };
    onUpdateQuiz(sessionFormIndex, contentFormIndex, quizFormIndex, updatedQuiz);
  };

  const handleAnswerChange = (e) => {
    const updateQuiz = { ...quiz, answer: e.target.value };
    onUpdateQuiz(sessionFormIndex, contentFormIndex, quizFormIndex, updateQuiz);
  }

  const handleNumOptionsChange = (e) => {
    const newNum = parseInt(e.target.value, 10);
    const updatedOptions = [...options];

    if (newNum > options.length) {
      updatedOptions.push(...Array(newNum - options.length).fill(''));
    } else {
      updatedOptions.length = newNum;
    }

    setOptions(updatedOptions);
    setNumOptions(newNum);

    const updatedQuiz = { ...quiz, options: updatedOptions };
    onUpdateQuiz(sessionFormIndex, contentFormIndex, quizFormIndex, updatedQuiz);
  };


  const handleExplanationChange = (e) => {
    const updateQuiz = { ...quiz, explanation: e.target.value };
    onUpdateQuiz(sessionFormIndex, contentFormIndex, quizFormIndex, updateQuiz);
  }

  const handleDeleteQuiz = () => {
    onRemoveQuiz(sessionFormIndex, contentFormIndex, quizFormIndex);
  }

  return (
    <div className="add-quiz-form" id={`quiz-form-${quizFormIndex}`}>
      <button className="add-quiz-remove-button" onClick={handleDeleteQuiz}>×</button>
      <h3>퀴즈 {quizFormIndex}</h3>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-question-${quizFormIndex}`}>질문</label>
        <input
          type="text"
          id={`quiz-question-${quizFormIndex}`}
          value={quiz.question}
          onChange={handleQuestionChange}
          placeholder="질문을 입력하세요"
          required
        />
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-num-choices-${quizFormIndex}`}>선택지 개수</label>
        <select
          id={`quiz-num-choices-${quizFormIndex}`}
          value={numOptions}
          onChange={handleNumOptionsChange}
        >
          {[2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div className="quiz-input-group">
        {quiz.options.map((choice, index) => (
          <div key={index} className={`quiz-choice-${quizFormIndex}`}>
            <label htmlFor={`choice-${quizFormIndex}-${index}`}>선택지 {index + 1}</label>
            <input
              type="text"
              id={`choice-${quizFormIndex}-${index}`}
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              placeholder={`선택지 ${index + 1}를 입력하세요`}
              required
            />
          </div>
        ))}
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-answer-${quizFormIndex}`}>정답</label>
        <select
          id={`quiz-answer-${quizFormIndex}`}
          value={quiz.answer}
          onChange={handleAnswerChange}
          required
        >
          <option value="" disabled>정답을 선택하세요</option>
          {quiz.options.map((choice, index) => (
            <option key={index} value={index}>{index + 1} : {choice}</option>
          ))}
        </select>
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-explanation-${quizFormIndex}`}>해설</label>
        <textarea
          id={`quiz-explanation-${quizFormIndex}`}
          value={quiz.explanation}
          onChange={handleExplanationChange}
          placeholder="해설을 입력하세요"
          rows={4}
          required
        />
      </div>
    </div>
  );
};

export default AddQuizForm;
