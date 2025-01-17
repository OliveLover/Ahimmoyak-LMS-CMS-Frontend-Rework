import { useState } from 'react';
import './AddQuizForm.css';

const AddQuizForm = ({ quizIndex, quizFormId, onRemoveQuiz }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [choices, setChoices] = useState(['', '']);
  const [numChoices, setNumChoices] = useState(2);
  const [explanation, setExplanation] = useState('');

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const handleNumChoicesChange = (e) => {
    const newNum = parseInt(e.target.value, 10);
    if (newNum > choices.length) {
      setChoices([...choices, ...Array(newNum - choices.length).fill('')]);
    } else {
      setChoices(choices.slice(0, newNum));
    }
    setNumChoices(newNum);
  };

  return (
    <div className="add-quiz-form" id={`quiz-form-${quizFormId}`}>
      <button className="add-quiz-remove-button" onClick={onRemoveQuiz}>×</button>
      <h3>퀴즈 {quizIndex}</h3>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-question-${quizFormId}`}>질문</label>
        <input
          type="text"
          id={`quiz-question-${quizFormId}`}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="질문을 입력하세요"
          required
        />
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-num-choices-${quizFormId}`}>선택지 개수</label>
        <select
          id={`quiz-num-choices-${quizFormId}`}
          value={numChoices}
          onChange={handleNumChoicesChange}
        >
          {[2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div className="quiz-input-group">
        {choices.map((choice, index) => (
          <div key={index} className={`quiz-choice-${quizFormId}`}>
            <label htmlFor={`choice-${quizFormId}-${index}`}>선택지 {index + 1}</label>
            <input
              type="text"
              id={`choice-${quizFormId}-${index}`}
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              placeholder={`선택지 ${index + 1}를 입력하세요`}
              required
            />
          </div>
        ))}
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-answer-${quizFormId}`}>정답</label>
        <select
          id={`quiz-answer-${quizFormId}`}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        >
          <option value="">정답을 선택하세요</option>
          {choices.map((choice, index) => (
            <option key={index} value={choice}>{index + 1} : {choice}</option>
          ))}
        </select>
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-explanation-${quizFormId}`}>해설</label>
        <textarea
          id={`quiz-explanation-${quizFormId}`}
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
