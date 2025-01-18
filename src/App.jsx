import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminSidebar from './components/admin/sidebar/AdminSidebar';
import Dashboards from './pages/admin/Dashboards';
import Courses from './pages/admin/Courses';
import Applications from './pages/admin/Applications';
import CreateCourses from './pages/admin/CreateCourses';
import CourseDetails from './pages/admin/CourseDetails';

import UserSidebar from './components/user/sidebar/UserSidebar';
import Header from './components/user/header/Header';
import Footer from './components/user/footer/Footer';
import UserMain from './pages/user/UserMain';
import MyCourses from './pages/user/MyCourses';
import MyAchievements from './pages/user/MyAchievements';
import MyExams from './pages/user/MyExams';
import MyAssignments from './pages/user/MyAssignments';

import './App.css'



function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="user-layout">
              <Header />
              <UserMain />
              <Footer />
            </div>
          }
        />

        <Route
          path="/mypage/*"
          element={
            <div className="user-layout">
              <Header />
              <div className="user-mypage-layout">
                <UserSidebar />
                <div className="user-mypage-content" >
                  <Routes>
                    <Route path="courses" element={<MyCourses />} />
                    <Route path="achievements" element={<MyAchievements />} />
                    <Route path="exams" element={<MyExams />} />
                    <Route path="assignments" element={<MyAssignments />} />
                  </Routes>
                </div>
              </div>
              <Footer />
            </div>
          }
        />

        <Route
          path="/admin/*"
          element={
            <div className="admin-layout">
              <AdminSidebar />
              <div className="admin-content">
                <Routes>
                  <Route path="dashboards" element={<Dashboards />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="applications" element={<Applications />} />
                  <Route path="create-courses" element={<CreateCourses />} />
                  <Route path="course-info/:courseId" element={<CourseDetails />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;