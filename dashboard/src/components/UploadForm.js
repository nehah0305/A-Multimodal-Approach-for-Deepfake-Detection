import React, { useState, useRef } from 'react';

function UploadForm({ onAnalyze, onFileUpload }) {
  const [videoFile, setVideoFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isVideoDragOver, setIsVideoDragOver] = useState(false);
  const [isAudioDragOver, setIsAudioDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState(null);
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const videoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'];
  const audioTypes = ['audio/wav', 'audio/mp3', 'audio/m4a', 'audio/flac'];
  const maxSize = 100 * 1024 * 1024; // 100MB

  const validateFile = (file, type) => {
    const supportedTypes = type === 'video' ? videoTypes : audioTypes;
    if (!supportedTypes.includes(file.type)) {
      const formats = type === 'video' ? 'MP4, AVI, MOV, WMV' : 'WAV, MP3, M4A, FLAC';
      return `Unsupported ${type} file type. Please upload ${formats} files.`;
    }
    if (file.size > maxSize) {
      return 'File size exceeds 100MB limit.';
    }
    return null;
  };

  const handleFileSelect = (selectedFile, type) => {
    const error = validateFile(selectedFile, type);
    if (error) {
      setNotification({ type: 'error', message: error });
      return;
    }
    if (type === 'video') {
      setVideoFile(selectedFile);
    } else {
      setAudioFile(selectedFile);
    }
    onFileUpload(selectedFile);
    setNotification({ type: 'success', message: `${type.charAt(0).toUpperCase() + type.slice(1)} file uploaded successfully!` });
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    if (type === 'video') {
      setIsVideoDragOver(false);
    } else {
      setIsAudioDragOver(false);
    }
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile, type);
    }
  };

  const handleDragOver = (e, type) => {
    e.preventDefault();
    if (type === 'video') {
      setIsVideoDragOver(true);
    } else {
      setIsAudioDragOver(true);
    }
  };

  const handleDragLeave = (type) => {
    if (type === 'video') {
      setIsVideoDragOver(false);
    } else {
      setIsAudioDragOver(false);
    }
  };

  const handleFileInputChange = (e, type) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile, type);
    }
  };

  const handleUploadClick = (type) => {
    if (type === 'video') {
      videoInputRef.current.click();
    } else {
      audioInputRef.current.click();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setNotification({ type: 'success', message: 'Upload completed!' });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleAnalyze = () => {
    if (!videoFile && !audioFile) {
      setNotification({ type: 'error', message: 'Please upload at least one file.' });
      return;
    }
    simulateUpload();
    // Simulate analysis
    setTimeout(() => {
      const dummyResult = {
        audio: audioFile ? 'real' : 'N/A',
        video: videoFile ? 'fake' : 'N/A',
        confidence: Math.random() * 0.5 + 0.5,
      };
      onAnalyze(dummyResult);
    }, 2000);
  };

  return (
    <div className="card">
      <h3>Upload Files</h3>

      <div style={{ marginBottom: '20px' }}>
        <h4>Video File</h4>
        <div
          className={`upload-area ${isVideoDragOver ? 'dragover' : ''}`}
          onDrop={(e) => handleDrop(e, 'video')}
          onDragOver={(e) => handleDragOver(e, 'video')}
          onDragLeave={() => handleDragLeave('video')}
          onClick={() => handleUploadClick('video')}
        >
          <p>Drag and drop a video file here, or click to select</p>
          <p>Supported formats: MP4, AVI, MOV, WMV</p>
          <p>Max size: 100MB</p>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={(e) => handleFileInputChange(e, 'video')}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>Audio File</h4>
        <div
          className={`upload-area ${isAudioDragOver ? 'dragover' : ''}`}
          onDrop={(e) => handleDrop(e, 'audio')}
          onDragOver={(e) => handleDragOver(e, 'audio')}
          onDragLeave={() => handleDragLeave('audio')}
          onClick={() => handleUploadClick('audio')}
        >
          <p>Drag and drop an audio file here, or click to select</p>
          <p>Supported formats: WAV, MP3, M4A, FLAC</p>
          <p>Max size: 100MB</p>
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            onChange={(e) => handleFileInputChange(e, 'audio')}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {isUploading && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <button className="btn" onClick={handleAnalyze} disabled={isUploading}>
        {isUploading ? 'Analyzing...' : 'Analyze'}
      </button>
    </div>
  );
}

export default UploadForm;
