import { Link } from 'react-router-dom';
import './UserSidebar.css';

const UserSidebar = () => {
  return (
    <div className="user-sidebar">
      <ul>
        <li><Link to="/mypage/courses">내 강의</Link></li>
        <li><Link to="/mypage/achievements">수료증</Link></li>
        <li><Link to="/mypage/exams">시험</Link></li>
        <li><Link to="/mypage/assignments">과제</Link></li>
      </ul>
    </div>
  );
};

export default UserSidebar;