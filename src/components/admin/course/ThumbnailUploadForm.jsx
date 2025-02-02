import { useState, useCallback, useEffect } from "react";
import axios from "../../../axios";
import { PiUploadFill } from "react-icons/pi";
import { CiRedo } from "react-icons/ci";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ThumbnailUploadForm.css";

const ThumbnailUploadForm = ({ courseId, propThumbnailPath, propThumbnailSize, propThumbnailName, updateCourseThumbnail }) => {
  const [uploadId, setUploadId] = useState(null);
  const [file, setFile] = useState(null);
  const [fileKey, setFileKey] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);

  useEffect(() => {
    if (uploadId) {
      console.log("업로드 ID:", uploadId);
    }
  }, [uploadId]);

  const initiateMultipartUpload = useCallback(async (fileExtension) => {
    try {
      const response = await axios.post("/api/v1/s3/initiate", {
        fileKeyPrefix: `${courseId}/IMAGE/`,
        fileKeyPostfix: `.${fileExtension}`,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        alert("업로드 시작에 실패했습니다.");
        return null;
      }
    } catch (error) {
      console.error("업로드 시작 중 오류:", error);
      alert("업로드 시작 중 오류가 발생했습니다.");
      return null;
    }
  }, [courseId]);

  const getPresignedUrls = useCallback(async (uploadId, fileKey, fileSize) => {
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
  }, []);

  const completeMultipartUpload = useCallback(
    async (fileKey, uploadId, fileId, fileSize, fileName, completedParts) => {
      try {
        const response = await axios.put("/api/v1/s3/complete", {
          courseId,
          fileKey,
          uploadId,
          fileId,
          fileSize,
          fileName,
          fileType: "IMAGE",
          completedParts,
        });

        if (response.status === 200) {
          setProgress(100);
          setUploadComplete(true);
          setUploadedFileInfo(response.data);

          if (updateCourseThumbnail) {
            updateCourseThumbnail(response.data);
          }
        } else {
          alert("멀티파트 업로드 완료 실패");
        }
      } catch (error) {
        console.error("Error completing upload:", error);
        alert("멀티파트 업로드 완료 중 오류가 발생했습니다.");
      }
    },
    [courseId, updateCourseThumbnail]
  );

  const handleFileChange = async (selectedFile) => {
    if (!selectedFile) return;

    const fileSize = selectedFile.size;
    const fileName = selectedFile.name;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const allowedExtensions = ["jpg", "jpeg", "png"];

    if (!allowedExtensions.includes(fileExtension)) {
      alert("JPG, JPEG, PNG 파일만 업로드 가능합니다.");
      return;
    }

    setFile(selectedFile);
    setFileName(fileName);
    setFileSize(fileSize);
    setIsUploading(true);
    setUploadComplete(false);

    const initData = await initiateMultipartUpload(fileExtension);

    if (initData) {
      const { uploadId: newUploadId, fileKey: newFileKey, fileId: newFileId } = initData;
      console.log("initData:", initData);
      setUploadId(newUploadId);
      setFileKey(newFileKey);
      setFileId(newFileId);

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
          await completeMultipartUpload(newFileKey, newUploadId, newFileId, fileSize, fileName, completedParts);
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
    document.getElementById("thumbnail-input").click();
  };

  return (
    <div
      className={`card mb-3 ${isDragging ? "dragging" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <div className="thumbnail-upload-zone" onClick={handleClick}>
            {(!propThumbnailPath || propThumbnailPath === "") && !isUploading && !uploadComplete && (
              <div className="thumbnail-drop-zone">
                <PiUploadFill className="thumbnail-upload-icon" />
                <h6>이미지를 드래그 앤 드롭 하거나 클릭하여 업로드하세요.</h6>
                <input
                  id="thumbnail-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
            )}
            {propThumbnailPath && propThumbnailPath !== "" && !isUploading && !uploadComplete && (
              <div className="upload-complete">
                <div className="thumbnail-preview">
                  <img
                    src={propThumbnailPath}
                    alt="업로드된 썸네일"
                    className="thumbnail-preview-img"
                  />
                </div>
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
            {uploadComplete && uploadedFileInfo && (
              <div className="upload-complete">
                <div className="thumbnail-preview">
                  <img
                    src={uploadedFileInfo.filePath}
                    alt="업로드된 썸네일"
                    className="thumbnail-preview-img"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            {!isUploading && !uploadComplete && !propThumbnailPath && (
              <h5 className="card-title">이미지 업로드</h5>
            )}
            {propThumbnailPath && propThumbnailPath !== "" && !isUploading && !uploadComplete && (
              <>
                <h6 className="card-title">파일 정보</h6>
                <table className="table">
                  <tbody>
                    <tr>
                      <th>파일명</th>
                      <td>{propThumbnailName}</td>
                    </tr>
                    <tr>
                      <th>파일 크기</th>
                      <td>{propThumbnailSize} bytes</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
            {uploadComplete && uploadedFileInfo && (
              <>
                <h6 className="card-title">파일 정보</h6>
                <table className="table">
                  <tbody>
                    <tr>
                      <th>파일명</th>
                      <td>{uploadedFileInfo.fileName}</td>
                    </tr>
                    <tr>
                      <th>파일 크기</th>
                      <td>{uploadedFileInfo.fileSize} bytes</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
            <div className="thumbnail-upload-complete-button" onClick={() => setUploadComplete(false)}>
              <CiRedo className="thumbnail-upload-complete-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailUploadForm;
