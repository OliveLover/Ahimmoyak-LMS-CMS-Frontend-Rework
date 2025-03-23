import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminRoute from './auth/AdminRoute';

import AdminSidebar from './components/admin/sidebar/AdminSidebar';
import Dashboards from './pages/admin/Dashboards';
import Courses from './pages/admin/Courses';
import Applications from './pages/admin/Applications';
import CreateCourses from './pages/admin/CreateCourses';
import CreateSessions from './pages/admin/CreateSessions';
import CourseDetails from './pages/admin/CourseDetails';
import CoursePreview from './pages/admin/CoursePreview';

import UserSidebar from './components/user/sidebar/UserSidebar';
import Header from './components/user/header/Header';
import Footer from './components/user/footer/Footer';
import UserMain from './pages/user/UserMain';
import UserCourseDetail from './pages/user/UserCourseDetail';
import UserLoginCallback from './pages/user/UserLoginCallback';
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

        <Route path="/courses/*" element={
          <div className="user-layout">
            <Header />
            <div className="user-course-detail-layout">
              <UserCourseDetail />
            </div>
            <Footer />
          </div>
        }>
          <Route path="ncs" element={<UserCourseDetail />} />
          <Route path="gov" element={<UserCourseDetail />} />
          <Route path="ncs/:courseId" element={<UserCourseDetail />} />
          <Route path="gov/:courseId" element={<UserCourseDetail />} />
        </Route>

        <Route path="/account/login/callback" element={<UserLoginCallback />} />

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

        <Route path="/admin/*" element={<AdminRoute />}>
          <Route
            path="*"
            element={
              <div className="admin-layout">
                <>
                  <AdminSidebar />
                  <div className="admin-content">
                    <Routes>
                      <Route index element={<Dashboards />} />
                      <Route path="dashboards" element={<Dashboards />} />
                      <Route path="courses" element={<Courses />} />
                      <Route path="applications" element={<Applications />} />
                      <Route path="create-courses" element={<CreateCourses />} />
                      <Route path="create-courses/:courseId/sessions" element={<CreateSessions />} />
                      <Route path="course-info/:courseId" element={<CourseDetails />} />
                      <Route path="course-info/:courseId/sessions/:sessionId/preview" element={<CoursePreview />} />
                    </Routes>
                  </div>
                </>
              </div>
            }
          />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;