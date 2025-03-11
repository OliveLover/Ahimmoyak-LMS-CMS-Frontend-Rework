import { useState } from "react";

function UserLogin() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`ID: ${userId}, Password: ${password}`);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h1 style={styles.title}>로그인</h1>
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>로그인</button>
      </form>
      <div style={styles.footer}>
        <a href="/account/register" style={styles.link}>회원가입</a>
        <a href="/account/forgot-password" style={styles.link}>비밀번호 찾기</a>
      </div>
    </div>
  );
};

export default UserLogin;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
    transition: "background 0.3s",
  },
  footer: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
    width: "300px",
  },
  link: {
    textDecoration: "none",
    fontSize: "14px",
    color: "#007bff",
  },
};
