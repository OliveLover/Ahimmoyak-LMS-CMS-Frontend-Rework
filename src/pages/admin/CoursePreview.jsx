import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthAxiosInstance from "../../axios-auth";
import PlayerContainer from "../../components/user/player/PlayerContainer";

function CoursePreview() {
  const navigate = useNavigate();
  const { courseId, sessionId } = useParams();
  const [session, setSession] = useState([]);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await AuthAxiosInstance.get(`/api/v1/admin/courses/${courseId}/sessions/${sessionId}/preview`);
        setSession(response.data.session);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.createCourseButton} onClick={handleGoBack}>
          돌아가기
        </button>
      </div>
      <PlayerContainer propSession={session} />
    </div>
  );
}

export default CoursePreview;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: "20px",
  },

  createCourseButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
