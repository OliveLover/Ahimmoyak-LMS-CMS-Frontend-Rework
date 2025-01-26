import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "../../../axios";
import { PiUploadFill } from "react-icons/pi";
import { CiRedo } from "react-icons/ci";
import "./ContentsUploadForm.css";

const ContentsUploadForm = ({ courseId }) => {
  const [uploadId, setUploadId] = useState(null);
  const [fileKey, setFileKey] = useState(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const initiateMultipartUpload = async (fileExtension) => {
    try {
      const response = await axios.post("/api/v1/s3/initiate", {
        fileKeyPrefix: `${courseId}/VIDEO/`,
        fileKeyPostfix: `.${fileExtension}`,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        alert("업로드 시작에 실패했습니다.");
        return null;
      }
    } catch (error) {
      console.error("Error during initiate upload:", error);
      alert("업로드 시작 중 오류가 발생했습니다.");
      return null;
    }
  };

  const getPresignedUrls = async (uploadId, fileKey, fileSize) => {
    try {
      const response = await axios.post("/api/v1/s3/presigned-url", {
        uploadId,
        fileKey,
        fileSize,
      });

      if (response.status === 200) {
        return response.data.presignedUrls;
      } else {
        alert("Presigned URL 생성 실패");
        return null;
      }
    } catch (error) {
      console.error("Error getting presigned URLs:", error);
      alert("Presigned URL 생성 중 오류가 발생했습니다.");
      return null;
    }
  };

  const completeMultipartUpload = async (fileKey, uploadId, completedParts) => {
    try {
      const response = await axios.put("/api/v1/s3/complete", {
        fileKey,
        uploadId,
        completedParts,
      });

      if (response.status === 200) {
        alert("파일 업로드 완료!");
        setProgress(100);
        setUploadComplete(true);  // 업로드 완료 처리
      } else {
        alert("멀티파트 업로드 완료 실패");
      }
    } catch (error) {
      console.error("Error completing upload:", error);
      alert("멀티파트 업로드 완료 중 오류가 발생했습니다.");
    }
  };

  const handleFileChange = async (selectedFile) => {
    if (!selectedFile) return;

    const fileSize = selectedFile.size;
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (!["mp4"].includes(fileExtension)) {
      alert("MP4 파일만 업로드 가능합니다.");
      return;
    }

    setFile(selectedFile);
    setIsUploading(true);
    setUploadComplete(false);

    const initData = await initiateMultipartUpload(fileExtension);
    if (initData) {
      const { uploadId: newUploadId, fileKey: newFileKey } = initData;
      setUploadId(newUploadId);
      setFileKey(newFileKey);

      const presignedUrls = await getPresignedUrls(newUploadId, newFileKey, fileSize);
      if (presignedUrls) {
        const completedParts = [];
        const partSize = 5 * 1024 * 1024;
        const totalParts = Math.ceil(fileSize / partSize);

        for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
          const startByte = (partNumber - 1) * partSize;
          const endByte = Math.min(partNumber * partSize, fileSize);
          const partData = selectedFile.slice(startByte, endByte);

          try {
            const response = await axios.put(presignedUrls[partNumber - 1], partData, {
              headers: { "Content-Type": "application/octet-stream" },
              onUploadProgress: (progressEvent) => {
                const partProgress = (progressEvent.loaded / progressEvent.total) * 100;
                const overallProgress = ((partNumber - 1) / totalParts) * 100 + (partProgress / totalParts);
                setProgress(overallProgress.toFixed(2));
              },
            });

            if (response.status === 200) {
              completedParts.push({
                partNumber,
                eTag: response.headers.etag.replace(/"/g, ""),
              });
            } else {
              console.error(`파트 ${partNumber} 업로드 실패`);
              break;
            }
          } catch (error) {
            console.error(`파트 ${partNumber} 업로드 중 오류 발생`, error);
            break;
          }
        }

        if (completedParts.length === totalParts) {
          await completeMultipartUpload(newFileKey, newUploadId, completedParts);
          setIsUploading(false);
        } else {
          alert("모든 파트를 업로드하지 못했습니다.");
          setIsUploading(false);
        }
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  const handleRetryUpload = () => {
    setUploadComplete(false);
    setIsUploading(false);
    setProgress(0);
    setFile(null);
    setUploadId(null);
    setFileKey(null);
  };

  return (
    <div
      className={`contents-upload-form ${isDragging ? "dragging" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {!isUploading && !uploadComplete && (
        <div className="contents-drop-zone" onClick={handleClick}>
          <div className="contents-upload-button">
            <PiUploadFill className="contents-upload-square-plus-icon" />
            <h6>파일을 여기에 드래그 앤 드롭 하거나 클릭하여 업로드하세요.</h6>
          </div>
          <input
            id="file-input"
            type="file"
            onChange={(e) => handleFileChange(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
      )}

      {isUploading && (
        <div className="upload-progress">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              textColor: "#f88",
              pathColor: "#4caf50",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      )}

      {uploadComplete && (
        <div className="upload-complete">
          <h6>업로드가 완료되었습니다!</h6>
          <div className="contents-upload-complete-button" onClick={handleRetryUpload}>
            <CiRedo className="contents-upload-complete-plus-icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentsUploadForm;
