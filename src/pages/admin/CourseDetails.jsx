import React, { useReducer, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
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

  return (
    <div className="course-container" style={styles.container}>
      <div className="course-header" style={styles.header}>
        <h2 style={styles.headerText}>훈련 과정 구성</h2>
        <div style={styles.headerButtons}>
          <button className="btn btn-secondary">
            수정 완료
          </button>
        </div>
      </div>

      <div className="accordion">
        <AddCourseMeta courseData={courseData} setCourseData={setCourseData} />
        <ThumbnailUploadForm
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
              session={session}
              onSetSessionId={handleSetSessionId}
              onUpdateSession={(sessionFormIndex, sessionTitle) => handleUpdateSession(sessionFormIndex, sessionTitle)}
              onReorderSession={handleReorderSession}
              onRemoveSession={(sessionFormIndex) => handleDeleteSession(sessionFormIndex)}
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