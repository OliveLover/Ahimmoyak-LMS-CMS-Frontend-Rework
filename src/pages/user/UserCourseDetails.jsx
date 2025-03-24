import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import Navi from "../../components/user/navi/Navi";
import LecLinkSlideWrap from "../../components/user/sidebar/LecLinkSlideWrap";
import { jobSkillCategories, govEduCategories } from "./CourseCategory";
import CourseDetailsWrap from "../../components/user/course/CourseDetailsWrap";

function UserCourseDetails() {
  const { type, code, courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/v1/courses/${courseId}`)
      .then((response) => {
        setCourseDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [courseId]);

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
        <CourseDetailsWrap courseDetails={courseDetails} />
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
};
