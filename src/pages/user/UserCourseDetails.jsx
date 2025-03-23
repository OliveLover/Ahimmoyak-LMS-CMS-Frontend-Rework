import { useParams } from "react-router-dom";
import Navi from "../../components/user/navi/Navi";
import LecLinkSlideWrap from "../../components/user/sidebar/LecLinkSlideWrap";
import { jobSkillCategories, govEduCategories } from "./CourseCategory";

function UserCourseDetails() {
  const { type, code, courseId } = useParams();

  let title = "";
  let categories = [];

  if (type === "ncs") {
    title = "직무능력 향상 과정";
    categories = jobSkillCategories;
  } else if (type === "gov") {
    title = "법정 의무 교육";
    categories = govEduCategories;
  }

  return (
    <div style={styles.userCourseDetailContainer}>
      <Navi />
      <div style={styles.userContentContainer}>
        <LecLinkSlideWrap title={title} categories={categories} />
        <div style={styles.mainContent}>
          UserCourseDetails {type} {code} {courseId}
        </div>
      </div>
    </div>
  );
}

export default UserCourseDetails;

const styles = {
  userCourseDetailContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  userContentContainer: {
    display: "flex",
    flex: 1,
  },
  sidebar: {
    flex: 0.3,
    maxWidth: "250px",
    backgroundColor: "#f8f9fa",
    padding: "20px",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
};
