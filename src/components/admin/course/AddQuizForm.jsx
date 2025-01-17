import { useState, useEffect } from 'react';
import './AddQuizForm.css';

const AddQuizForm = ({ quizIndex, quizFormId, onRemoveQuiz, quizData }) => {

  const [quiz, setQuiz] = useState({
    quizId: quizData?.quizId || null,
    question: quizData?.question || '',
    answer: quizData?.answer || '',
    choices: quizData?.choices || ['', ''],
    numChoices: quizData?.choices?.length || 2,
    explanation: quizData?.explanation || '',
  });

  useEffect(() => {
    if (quizData) {
      setQuiz({
        quizId: quizData.quizId || null,
        question: quizData.question || '',
        answer: quizData.answer || '',
        choices: quizData.choices || ['', ''],
        numChoices: quizData.choices?.length || 2,
        explanation: quizData.explanation || '',
      });
    }
  }, [quizData]);

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...quiz.choices];
    updatedChoices[index] = value;
    setQuiz({ ...quiz, choices: updatedChoices });
  };

  const handleNumChoicesChange = (e) => {
    const newNum = parseInt(e.target.value, 10);
    const updatedChoices = [...quiz.choices];

    if (newNum > quiz.choices.length) {
      updatedChoices.push(...Array(newNum - quiz.choices.length).fill(''));
    } else {
      updatedChoices.length = newNum;
    }

    setQuiz({
      ...quiz,
      choices: updatedChoices,
      numChoices: newNum,
    });
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
          value={quiz.question}
          onChange={(e) => setQuiz({ ...quiz, question: e.target.value })}
          placeholder="질문을 입력하세요"
          required
        />
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-num-choices-${quizFormId}`}>선택지 개수</label>
        <select
          id={`quiz-num-choices-${quizFormId}`}
          value={quiz.numChoices}
          onChange={handleNumChoicesChange}
        >
          {[2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div className="quiz-input-group">
        {quiz.choices.map((choice, index) => (
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
          value={quiz.answer}
          onChange={(e) => setQuiz({ ...quiz, answer: e.target.value })}
          required
        >
          <option value="">정답을 선택하세요</option>
          {quiz.choices.map((choice, index) => (
            <option key={index} value={choice}>{index + 1} : {choice}</option>
          ))}
        </select>
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-explanation-${quizFormId}`}>해설</label>
        <textarea
          id={`quiz-explanation-${quizFormId}`}
          value={quiz.explanation}
          onChange={(e) => setQuiz({ ...quiz, explanation: e.target.value })}
          placeholder="해설을 입력하세요"
          rows={4}
          required
        />
      </div>
    </div>
  );
};

export default AddQuizForm;
