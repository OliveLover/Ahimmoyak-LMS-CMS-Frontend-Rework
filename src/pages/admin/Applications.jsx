import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Applications() {
  return (
    <div style={styles.container}>
      <h1>신청 관리</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableCell}>회사명</th>
            <th style={styles.tableCell}>담당자</th>
            <th style={styles.tableCell}>담당자 연락처</th>
            <th style={styles.tableCell}>이메일</th>
            <th style={styles.tableCell}>강의 코드</th>
            <th style={styles.tableCell}>요청 강의명</th>
            <th style={styles.tableCell}>수강 희망 날짜</th>
            <th style={styles.tableCell}>신청 날짜</th>
            <th style={styles.tableCell}>인원 수</th>
            <th style={styles.tableCell}>업종</th>
            <th style={styles.tableCell}>타입</th>
            <th style={styles.tableCell}>분류</th>
            <th style={styles.tableCell}>수락 여부</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.tableCell}>ABC 회사</td>
            <td style={styles.tableCell}>홍길동</td>
            <td style={styles.tableCell}>010-1234-5678</td>
            <td style={styles.tableCell}>abc@example.com</td>
            <td style={styles.tableCell}>001</td>
            <td style={styles.tableCell}>React 기초</td>
            <td style={styles.tableCell}>2025-02-01</td>
            <td style={styles.tableCell}>2025-01-08</td>
            <td style={styles.tableCell}>15명</td>
            <td style={styles.tableCell}>IT</td>
            <td style={styles.tableCell}>내일배움카드</td>
            <td style={styles.tableCell}>01 사업관리</td>
            <td style={styles.tableCell}>
              <button style={{ ...styles.button, ...styles.successButton }}>수락</button>
              <button style={{ ...styles.button, ...styles.dangerButton }}>거절</button>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCell}>XYZ 회사</td>
            <td style={styles.tableCell}>이순신</td>
            <td style={styles.tableCell}>010-2345-6789</td>
            <td style={styles.tableCell}>xyz@example.com</td>
            <td style={styles.tableCell}>002</td>
            <td style={styles.tableCell}>Node.js 고급</td>
            <td style={styles.tableCell}>2025-03-01</td>
            <td style={styles.tableCell}>2025-01-07</td>
            <td style={styles.tableCell}>20명</td>
            <td style={styles.tableCell}>Finance</td>
            <td style={styles.tableCell}>기업직업훈련카드</td>
            <td style={styles.tableCell}>03 금융·보험</td>
            <td style={styles.tableCell}>
              <button style={{ ...styles.button, ...styles.successButton }}>수락</button>
              <button style={{ ...styles.button, ...styles.dangerButton }}>거절</button>
            </td>
          </tr>
          <tr>
            <td style={styles.tableCell}>DEF 회사</td>
            <td style={styles.tableCell}>강감찬</td>
            <td style={styles.tableCell}>010-3456-7890</td>
            <td style={styles.tableCell}>def@example.com</td>
            <td style={styles.tableCell}>003</td>
            <td style={styles.tableCell}>JavaScript 심화</td>
            <td style={styles.tableCell}>2025-04-01</td>
            <td style={styles.tableCell}>2025-01-06</td>
            <td style={styles.tableCell}>10명</td>
            <td style={styles.tableCell}>Marketing</td>
            <td style={styles.tableCell}>내일배움카드</td>
            <td style={styles.tableCell}>04 교육·자연·사회과학</td>
            <td style={styles.tableCell}>
              <button style={{ ...styles.button, ...styles.successButton }}>수락</button>
              <button style={{ ...styles.button, ...styles.dangerButton }}>거절</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Applications;

const theme = {
  colors: {
    background: '#f0f0f0',
    border: '#ccc',
    text: '#333',
  },
};

const styles = {
  container: {
    marginTop: '2rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableCell: {
    padding: '0.75rem',
    border: `1px solid ${theme.colors.border}`,
    textAlign: 'center',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    margin: '0 0.5rem',
    cursor: 'pointer',
  },
  successButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
  },
};
