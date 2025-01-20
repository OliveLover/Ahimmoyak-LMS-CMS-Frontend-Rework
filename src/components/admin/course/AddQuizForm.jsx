import { useState } from 'react';
import './AddQuizForm.css';

const AddQuizForm = ({ quizIndex, onRemoveQuiz, propQuizId, propQuestion, propAnswer, propOptions, propExplanation }) => {
  const [question, setQuestion] = useState(propQuestion || '');
  const [answer, setAnswer] = useState(propAnswer ?? '');
  const [options, setOptions] = useState(propOptions || ['', '']);
  const [numOptions, setNumOptions] = useState(options.length);
  const [explanation, setExplanation] = useState(propExplanation || '');

  const handleChoiceChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

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
  };

  return (
    <div className="add-quiz-form" id={`quiz-form-${quizIndex}`}>
      <button className="add-quiz-remove-button" onClick={onRemoveQuiz}>×</button>
      <h3>퀴즈 {quizIndex}</h3>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-question-${quizIndex}`}>질문</label>
        <input
          type="text"
          id={`quiz-question-${quizIndex}`}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="질문을 입력하세요"
          required
        />
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-num-choices-${quizIndex}`}>선택지 개수</label>
        <select
          id={`quiz-num-choices-${quizIndex}`}
          value={numOptions}
          onChange={handleNumOptionsChange}
        >
          {[2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div className="quiz-input-group">
        {options.map((choice, index) => (
          <div key={index} className={`quiz-choice-${quizIndex}`}>
            <label htmlFor={`choice-${quizIndex}-${index}`}>선택지 {index + 1}</label>
            <input
              type="text"
              id={`choice-${quizIndex}-${index}`}
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              placeholder={`선택지 ${index + 1}를 입력하세요`}
              required
            />
          </div>
        ))}
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-answer-${quizIndex}`}>정답</label>
        <select
          id={`quiz-answer-${quizIndex}`}
          value={answer}
          onChange={(e) => setAnswer(parseInt(e.target.value, 10))}
          required
        >
          <option value="" disabled>정답을 선택하세요</option>
          {options.map((choice, index) => (
            <option key={index} value={index}>{index + 1} : {choice}</option>
          ))}
        </select>
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-explanation-${quizIndex}`}>해설</label>
        <textarea
          id={`quiz-explanation-${quizIndex}`}
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
