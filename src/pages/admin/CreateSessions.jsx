import React, { useReducer, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import SessionDetailsForm from "../../components/admin/course/SessionDetailsForm";
import ThumbnailUploadForm from "../../components/admin/course/ThumbnailUploadForm";
import { sessionReducer } from "../../reducers/SessionReducer";


function CreateSessions() {
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
      const response = await axios.get(`/api/v1/admin/courses/${courseId}`);
      setCourseData(response.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const fetchSessionData = async () => {
    if (!courseId) return;

    try {
      const response = await axios.get(`/api/v1/admin/courses/${courseId}/sessions`);
      dispatch({ type: "SET_SESSIONS", payload: response.data });
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  useEffect(() => {
    fetchCourseData();
    fetchSessionData();
  }, [courseId]);

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

  const handleDeleteQuiz = (sessionFormIndex, contentFormIndex, quizFormIndex) => {
    dispatch({
      type: "DELETE_QUIZ",
      payload: {
        sessionFormIndex,
        contentFormIndex,
        quizFormIndex,
      }
    });
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerButtons}>
          <button className="btn btn-secondary mt-3">
            돌아가기
          </button>
        </div>
      </div>

      <ThumbnailUploadForm
        courseId={courseData.courseId}
        propThumbnailPath={courseData.thumbnailPath}
        propThumbnailSize={courseData.thumbnailSize}
        propThumbnailName={courseData.thumbnailName}
        updateCourseThumbnail={(uploadedFileInfo) => {
          setCourseData((prevData) => ({
            ...prevData,
            thumbnailPath: uploadedFileInfo.filePath,
            thumbnailId: uploadedFileInfo.fileId,
            thumbnailSize: uploadedFileInfo.fileSize,
            thumbnailName: uploadedFileInfo.fileName,
          }));
        }}
      />

      <div className="accordion" id="accordionPanelsStayOpenExample">
        <>
          {
            (sessions || [])
              .sort((a, b) => a.sessionFormIndex - b.sessionFormIndex)
              .map((session, sessionFormIndex) => (
                <SessionDetailsForm
                  key={sessionFormIndex + 1}
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
              ))
          }
          <button className="btn btn-primary mt-3" onClick={handleAddSession}>
            + 차시 추가
          </button>
        </>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "20px",
  },
  headerButtons: {
    display: "flex",
    gap: "20px",
  },
  buttonSecondary: {
    fontSize: "14px",
    padding: "10px 15px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CreateSessions;
