import { useState } from 'react';
import axios from '../../../axios';
import './AddQuizForm.css';

const AddQuizForm = ({ courseId, sessionId, contentId, sessionFormIndex, contentFormIndex, quiz, onUpdateQuiz, onRemoveQuiz }) => {
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
    onUpdateQuiz(sessionFormIndex, contentFormIndex, quiz.quizFormIndex, updatedQuiz);
  };

  const handleQuestionChange = (e) => {
    const updatedQuiz = { ...quiz, question: e.target.value };
    onUpdateQuiz(sessionFormIndex, contentFormIndex, quiz.quizFormIndex, updatedQuiz);
  };

  const handleAnswerChange = (e) => {
    const updateQuiz = { ...quiz, answer: e.target.value };
    onUpdateQuiz(sessionFormIndex, contentFormIndex, quiz.quizFormIndex, updateQuiz);
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
    onUpdateQuiz(sessionFormIndex, contentFormIndex, quiz.quizFormIndex, updatedQuiz);
  };

  const handleUpdateQuizBlur = async () => {
    if (!quiz.quizId) return;

    try {
      await axios.put(`/api/v1/admin/courses/sessions/contents/quizzes/${quiz.quizId}`, {
        courseId,
        quizId: quiz.quizId,
        question: quiz.question,
        options: quiz.options,
        answer: quiz.answer,
        explanation: quiz.explanation,
      });
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const handleExplanationChange = (e) => {
    const updateQuiz = { ...quiz, explanation: e.target.value };
    onUpdateQuiz(sessionFormIndex, contentFormIndex, quiz.quizFormIndex, updateQuiz);
  }

  const handleDeleteQuiz = async () => {
    if (!quiz.quizId) return;

    try {
      await axios.delete(`/api/v1/admin/courses/${courseId}/sessions/${sessionId}/contents/${contentId}/quizzes/${quiz.quizId}`);
      onRemoveQuiz(sessionFormIndex, contentFormIndex, quiz.quizId);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  }

  return (
    <div className="add-quiz-form" id={`quiz-form-${quiz.quizFormIndex}`}>
      <button className="add-quiz-remove-button" onClick={handleDeleteQuiz}>×</button>
      <h3>퀴즈 {quiz.quizFormIndex}</h3>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-question-${quiz.quizFormIndex}`}>질문</label>
        <input
          type="text"
          id={`quiz-question-${quiz.quizFormIndex}`}
          value={quiz.question}
          onChange={handleQuestionChange}
          onBlur={handleUpdateQuizBlur}
          placeholder="질문을 입력하세요"
          required
        />
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-num-choices-${quiz.quizFormIndex}`}>선택지 개수</label>
        <select
          id={`quiz-num-choices-${quiz.quizFormIndex}`}
          value={numOptions}
          onChange={handleNumOptionsChange}
          onBlur={handleUpdateQuizBlur}
        >
          {[2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div className="quiz-input-group">
        {quiz.options.map((choice, index) => (
          <div key={index} className={`quiz-choice-${quiz.quizFormIndex}`}>
            <label htmlFor={`choice-${quiz.quizFormIndex}-${index}`}>선택지 {index + 1}</label>
            <input
              type="text"
              id={`choice-${quiz.quizFormIndex}-${index}`}
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              onBlur={handleUpdateQuizBlur}
              placeholder={`선택지 ${index + 1}를 입력하세요`}
              required
            />
          </div>
        ))}
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-answer-${quiz.quizFormIndex}`}>정답</label>
        <select
          id={`quiz-answer-${quiz.quizFormIndex}`}
          value={quiz.answer}
          onChange={handleAnswerChange}
          onBlur={handleUpdateQuizBlur}
          required
        >
          <option value="" disabled>정답을 선택하세요</option>
          {quiz.options.map((choice, index) => (
            <option key={index} value={index}>{index + 1} : {choice}</option>
          ))}
        </select>
      </div>
      <div className="quiz-input-group">
        <label htmlFor={`quiz-explanation-${quiz.quizFormIndex}`}>해설</label>
        <textarea
          id={`quiz-explanation-${quiz.quizFormIndex}`}
          value={quiz.explanation}
          onChange={handleExplanationChange}
          onBlur={handleUpdateQuizBlur}
          placeholder="해설을 입력하세요"
          rows={4}
          required
        />
      </div>
    </div>
  );
};

export default AddQuizForm;
