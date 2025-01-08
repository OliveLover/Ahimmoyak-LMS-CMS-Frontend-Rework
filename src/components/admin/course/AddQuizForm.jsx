import { useState } from 'react';
import './AddQuizForm.css';

const AddQuizForm = ({ quizIndex, onRemoveQuiz }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [choices, setChoices] = useState(['', '']);
  const [numChoices, setNumChoices] = useState(2);
  const [explanation, setExplanation] = useState('');

  const handleNumChoicesChange = (e) => {
    const newNum = parseInt(e.target.value, 10);
    setNumChoices(newNum);

    if (newNum > choices.length) {
      setChoices([...choices, ...Array(newNum - choices.length).fill('')]);
    } else {
      setChoices(choices.slice(0, newNum));
    }
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  return (
    <div className="add-quiz-form">
      <button
        className="add-quiz-remove-button"
        onClick={onRemoveQuiz}
      >
        ×
      </button>
      <h3>퀴즈 {quizIndex}</h3>
      <div className="quiz-input-group">
        <label htmlFor="quiz-question">질문</label>
        <input
          type="text"
          id="quiz-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="질문을 입력하세요"
          required
        />
      </div>
      <div className="quiz-input-group">
        <label htmlFor="quiz-num-choices">선택지 개수</label>
        <select
          id="quiz-num-choices"
          value={numChoices}
          onChange={handleNumChoicesChange}
        >
          {[2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="quiz-input-group">
        {choices.map((choice, index) => (
          <div key={index} className="quiz-choice">
            <label htmlFor={`choice-${index}`}>선택지 {index + 1}</label>
            <input
              type="text"
              id={`choice-${index}`}
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              placeholder={`선택지 ${index + 1}를 입력하세요`}
              required
            />
          </div>
        ))}
      </div>
      <div className="quiz-input-group">
        <label htmlFor="quiz-answer">정답</label>
        <select
          id="quiz-answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        >
          <option value="">정답을 선택하세요</option>
          {choices.map((choice, index) => (
            <option key={index} value={choice}>
              {choice ? `선택지 ${index + 1}: ${choice}` : `선택지 ${index + 1}`}
            </option>
          ))}
        </select>
      </div>
      <div className="quiz-input-group">
        <label htmlFor="quiz-explanation">해설</label>
        <textarea
          id="quiz-explanation"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="해설을 입력하세요"
          rows={4}
          required
        />
      </div>
    </div>
  );
};

export default AddQuizForm;
