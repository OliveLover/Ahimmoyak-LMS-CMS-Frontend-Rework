import { useState, useCallback, useEffect } from "react";
import axios from "../../../axios";
import "./ThumbnailUploadForm.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);


const ThumbnailUploadForm = ({ courseId, propThumbnailPath, propThumbnailSize, propThumbnailName, updateCourseThumbnail }) => {
  const [uploadId, setUploadId] = useState(null);
  const [file, setFile] = useState(null);
  const [fileKey, setFileKey] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (progress > 0 && progress < 100) {
      setToastMessage(`업로드 중... ${progress}%`);
      setShowToast(true);
    } else if (progress === 100) {
      setToastMessage("업로드 완료!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [progress]);


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

  const handleDownload = (propThumbnailPath) => {
    const downloadUrl = `${propThumbnailPath}`;
    window.location.href = downloadUrl;
  };

  const columns = [
    { headerName: "파일 명", field: "fileName", cellStyle: { textAlign: "left" }, flex: 1 },
    { headerName: "파일 크기", field: "fileSize", valueFormatter: (params) => `${(params.value / 1024).toFixed(2)} KB`, cellStyle: { textAlign: "left" }, flex: 1 },
    {
      headerName: "다운로드",
      field: "download",
      cellRenderer: (params) => (
        <button onClick={() => handleDownload(params.data.filePath)} className="btn btn-primary download">
          다운로드
        </button>
      ),
      cellStyle: { textAlign: "left" },
      flex: 1,
    },
  ];

  const rowData = [
    { fileName: fileName || propThumbnailName, fileSize: fileSize || propThumbnailSize, filePath: propThumbnailPath },
  ];

  return (
    <div className="thumbnail-upload-form" >
      <div className="thumbnail-form-title-header">썸네일 구성</div>
      <div className="input-group mb-3">
        <input type="file" id="thumbnail-input" className="form-control" onChange={(e) => handleFileChange(e.target.files[0])} />
      </div>

      <div className="thumbnail-info-wrap">
        <div className="thumbnail-preview">
          {propThumbnailPath ? (
            <img src={propThumbnailPath} alt="썸네일 미리보기" />
          ) : (
            <div className="thumbnail-placeholder">
              썸네일이 존재하지 않습니다.
            </div>
          )}
        </div>
        <div className="thumbnail-info">
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            domLayout="autoHeight"
            pagination={false}
          />
        </div>
      </div>

      {showToast && (
        <div className={`toast-container ${!showToast ? "hide" : ""}`}>
          <div className="toast show">
            <div className="toast-header">
              <strong className="me-auto">업로드 상태</strong>
              <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
            </div>
            <div className="toast-body">
              {isUploading && (
                <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar progress-bar-striped" style={{ width: `${progress}%` }}></div>
                </div>
              )}
              {toastMessage}</div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ThumbnailUploadForm;
