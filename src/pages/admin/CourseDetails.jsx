import React, { useReducer, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthAxiosInstance from "../../axios-auth";
import AddCourseMeta from "../../components/admin/course/AddCourseMeta";
import SessionDetailsForm from "../../components/admin/course/SessionDetailsForm";
import ThumbnailUploadForm from "../../components/admin/course/ThumbnailUploadForm";
import { sessionReducer } from "../../reducers/SessionReducer";


function CourseDetails() {
  const [courseData, setCourseData] = useState({
    courseTitle: "",
    courseIntroduce: "",
    status: "INACTIVE",
    activeStartDate: "",
    activeEndDate: "",
    instructor: "",
    thumbnailPath: "",
    thumbnailId: "",
    thumbnailSize: 0,
    thumbnailName: "",
    grade: "PENDING",
    ncsClassification: "UNDEFINED",
    setDuration: 30,
    fundingType: "PENDING",
    cardType: [],
  });

  const [sessions, dispatch] = useReducer(sessionReducer, []);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const fetchCourseData = async () => {
    if (!courseId) return;

    try {
      const response = await AuthAxiosInstance.get(`/api/v1/admin/courses/${courseId}`);
      setCourseData(response.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const fetchSessionData = async () => {
    if (!courseId) return;

    try {
      const response = await AuthAxiosInstance.get(`/api/v1/admin/courses/${courseId}/sessions`);
      dispatch({ type: "SET_SESSIONS", payload: response.data });
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  useEffect(() => {
    fetchCourseData();
    fetchSessionData();
  }, [courseId]);

  const handleUpdateCourseData = () => {
    const modifiedData = {
      ...courseData,
    };

    AuthAxiosInstance
      .put(`/api/v1/admin/courses`, modifiedData)
      .then((response) => {
        alert("수정이 완료되었습니다.");
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error updating course:", error);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

  const handleAddSession = () => {
    dispatch({ type: "ADD_SESSION" });
  };

  const handleSetSessionId = (sessionFormIndex, sessionId) => {
    dispatch({
      type: "SET_SESSION_ID",
      payload: { sessionFormIndex, sessionId },
    });
  };

  const handleUpdateSession = (sessionFormIndex, sessionTitle) => {
    dispatch({
      type: "UPDATE_SESSION",
      payload: {
        sessionFormIndex: sessionFormIndex,
        sessionTitle: sessionTitle,
      },
    });
  };

  const handleReorderSession = (fromSessionIndex, toSessionIndex) => {
    dispatch({
      type: "REORDER_SESSION",
      payload: { fromSessionIndex, toSessionIndex },
    });
  };

  const handleDeleteSession = (sessionFormIndex) => {
    dispatch({
      type: "DELETE_SESSION",
      payload: { sessionFormIndex },
    });
  };

  const handleAddContent = (sessionFormIndex) => {
    dispatch({
      type: "ADD_CONTENT",
      payload: { sessionFormIndex },
    });
  };

  const handleSetContentId = (sessionFormIndex, contentFormIndex, contentId) => {
    dispatch({
      type: "SET_CONTENT_ID",
      payload: { sessionFormIndex, contentFormIndex, contentId },
    });
  };

  const handleUpdateContent = (sessionFormIndex, contentIndex, updatedData) => {
    dispatch({
      type: "UPDATE_CONTENT",
      payload: {
        sessionFormIndex,
        contentIndex,
        updatedData,
      },
    });
  };

  const handleReorderContent = (fromContentIndex, toContentIndex, sessionFormIndex) => {
    dispatch({
      type: "REORDER_CONTENT",
      payload: {
        fromContentIndex,
        toContentIndex,
        sessionFormIndex,
      },
    });
  };

  const handleDeleteContent = (sessionFormIndex, contentFormIndex) => {
    dispatch({
      type: "DELETE_CONTENT",
      payload: { sessionFormIndex, contentFormIndex },
    });
  };

  const handleAddQuiz = (sessionFormIndex, contentFormIndex) => {
    dispatch({
      type: "ADD_QUIZ",
      payload: { sessionFormIndex, contentFormIndex },
    });
  };

  const handleSetQuizId = (sessionFormIndex, contentFormIndex, quizFormIndex, quizId) => {
    dispatch({
      type: "SET_QUIZ_ID",
      payload: {
        sessionFormIndex,
        contentFormIndex,
        quizFormIndex,
        quizId,
      },
    });
  };

  const handleUpdateQuiz = (sessionFormIndex, contentFormIndex, quizFormIndex, updatedData) => {
    dispatch({
      type: "UPDATE_QUIZ",
      payload: {
        sessionFormIndex,
        contentFormIndex,
        quizFormIndex,
        updatedData,
      },
    });
  };

  const handleDeleteQuiz = (sessionFormIndex, contentFormIndex, quizId) => {
    dispatch({
      type: "DELETE_QUIZ",
      payload: { sessionFormIndex, contentFormIndex, quizId },
    });
  };

  return (
    <div className="course-container" style={styles.container}>
      <div className="course-header" style={styles.header}>
        <h2 style={styles.headerText}>훈련 과정 구성</h2>
        <div style={styles.headerButtons}>
          <button className="btn btn-secondary" onClick={handleUpdateCourseData}>
            수정 완료
          </button>
        </div>
      </div>

      <div className="accordion">
        <AddCourseMeta courseData={courseData} setCourseData={setCourseData} />
        <ThumbnailUploadForm
          courseId={courseData.courseId}
          propThumbnailPath={courseData.thumbnailPath}
          propThumbnailSize={courseData.thumbnailSize}
          propThumbnailName={courseData.thumbnailName}
          updateCourseThumbnail={(uploadedFileInfo) =>
            setCourseData((prevData) => ({
              ...prevData,
              thumbnailPath: uploadedFileInfo.filePath,
              thumbnailId: uploadedFileInfo.fileId,
              thumbnailSize: uploadedFileInfo.fileSize,
              thumbnailName: uploadedFileInfo.fileName,
            }))
          }
        />

        {sessions
          .sort((a, b) => a.sessionFormIndex - b.sessionFormIndex)
          .map((session, sessionFormIndex) => (
            <SessionDetailsForm
              key={sessionFormIndex + 1}
              courseId={courseId}
              session={session}
              onSetSessionId={handleSetSessionId}
              onUpdateSession={handleUpdateSession}
              onReorderSession={handleReorderSession}
              onRemoveSession={handleDeleteSession}
              onAddContent={handleAddContent}
              onSetContentId={handleSetContentId}
              onUpdateContent={handleUpdateContent}
              onReorderContent={handleReorderContent}
              onRemoveContent={handleDeleteContent}
              onAddQuiz={handleAddQuiz}
              onSetQuizId={handleSetQuizId}
              onUpdateQuiz={handleUpdateQuiz}
              onRemoveQuiz={handleDeleteQuiz}
            />
          ))}

        <button className="btn btn-primary mt-3" onClick={handleAddSession}>
          + 차시 추가
        </button>
      </div>
    </div>
  );
}

export default CourseDetails;

const styles = {
  container: {
    position: "relative",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  headerButtons: {
    display: "flex",
    gap: "20px",
  },
  headerText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
};