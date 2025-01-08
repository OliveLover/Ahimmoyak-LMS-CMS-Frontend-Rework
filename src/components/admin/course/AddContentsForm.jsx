import { useState } from 'react';
import './AddContentsForm.css';

const AddContentsForm = ({ contentId, onRemove }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="add-course-contents-form">
      <button className="remove-button" onClick={() => onRemove(contentId)}>
        ×
      </button>
      <h2>콘텐츠 {contentId}</h2>
      <div className="content-input-group">
        {/* 제목 입력 */}
        <label htmlFor={`title-${contentId}`}>인덱스 제목</label>
        <input
          type="text"
          id={`title-${contentId}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          required
        />
      </div>

      {/* 파일 업로드와 타입 선택 */}
      <div className="content-input-group-file-and-type">
        <div className="content-input-group">
          <label htmlFor={`file-${contentId}`}>파일 업로드</label>
          <input
            type="file"
            id={`file-${contentId}`}
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          {file && <p>업로드된 파일: {file.name}</p>}
        </div>

        <div className="content-input-group">
          <label htmlFor={`type-${contentId}`}>타입</label>
          <select
            id={`type-${contentId}`}
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">타입을 선택하세요</option>
            <option value="퀴즈">퀴즈</option>
            <option value="강의 영상">강의 영상</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AddContentsForm;
