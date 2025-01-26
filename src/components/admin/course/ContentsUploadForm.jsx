import { useState } from "react";
import './ContentsUploadForm.css';
import axios from "../../../axios";


const ContentsUploadForm = ({ courseId }) => {
  const [uploadId, setUploadId] = useState(null);
  const [fileKey, setFileKey] = useState(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

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
        setProgress(100); // 진행률을 100%로 설정
      } else {
        alert("멀티파트 업로드 완료 실패");
      }
    } catch (error) {
      console.error("Error completing upload:", error);
      alert("멀티파트 업로드 완료 중 오류가 발생했습니다.");
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const fileSize = selectedFile.size;
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (!["mp4"].includes(fileExtension)) {
      alert("MP4 파일만 업로드 가능합니다.");
      return;
    }

    setFile(selectedFile);

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
        } else {
          alert("모든 파트를 업로드하지 못했습니다.");
        }
      }
    }
  };

  return (
    <div className="contents-upload-form">
      <input type="file" onChange={handleFileChange} />
      <div className="upload-progress">
        <p>업로드 진행률: {progress}%</p>
      </div>
    </div>
  );
};

export default ContentsUploadForm;
