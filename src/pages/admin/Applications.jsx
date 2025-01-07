import React from 'react';

function Applications() {
  return (
    <div>
      <h1>신청 관리 페이지</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>회사</th>
            <th style={styles.tableHeader}>담당자 연락처</th>
            <th style={styles.tableHeader}>이메일</th>
            <th style={styles.tableHeader}>요청 강의</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ABC 회사</td>
            <td>010-1234-5678</td>
            <td>abc@example.com</td>
            <td>React 기초</td>
          </tr>
          <tr>
            <td>XYZ 회사</td>
            <td>010-2345-6789</td>
            <td>xyz@example.com</td>
            <td>Node.js 고급</td>
          </tr>
          <tr>
            <td>DEF 회사</td>
            <td>010-3456-7890</td>
            <td>def@example.com</td>
            <td>JavaScript 심화</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    textAlign: 'left',
    border: '1px solid #ddd',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd',
  },
};

export default Applications;