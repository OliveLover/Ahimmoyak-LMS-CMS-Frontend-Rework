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
                  onUpdateSession={(sessionFormIndex, sessionTitle) => handleUpdateSession(sessionFormIndex, sessionTitle)}
                  onReorderSession={handleReorderSession}
                  onRemoveSession={(sessionFormIndex) => handleDeleteSession(sessionFormIndex)}
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
