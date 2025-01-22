import { Link } from 'react-router-dom';
import StorageInfo from '../storage_info/StorageInfo';
import './AdminSidebar.css';


const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <ul>
        <li><Link to="/admin/dashboards">대시보드</Link></li>
        <li><Link to="/admin/courses">과정 관리</Link></li>
        <li><Link to="/admin/applications">신청 관리</Link></li>
      </ul>
      <StorageInfo />
    </div>
  );
}

export default AdminSidebar;