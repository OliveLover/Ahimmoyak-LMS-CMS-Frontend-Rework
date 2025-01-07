import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }

    console.log('로그인 시도:', { username, password });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-inputGroup">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div className="login-inputGroup">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button type="submit" className="login-button">
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginForm;