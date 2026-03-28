import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import FilePreview from './components/FilePreview';
import Results from './components/Results';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({ video: null, audio: null });

  const handleAnalysis = (data) => {
    // This would be replaced by a real API call to the deepfake detection service
    setResult(data);
  };

  const handleFileUpload = (file) => {
    if (file.type.startsWith('video/')) {
      setUploadedFiles(prev => ({ ...prev, video: file }));
    } else if (file.type.startsWith('audio/')) {
      setUploadedFiles(prev => ({ ...prev, audio: file }));
    }
    setResult(null); // Reset results on new upload
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Deepfake Detector</h2>
        <p>Upload and analyze video or audio files</p>
      </div>
      <div className="main-content">
        <UploadForm onAnalyze={handleAnalysis} onFileUpload={handleFileUpload} />
        {(uploadedFiles.video || uploadedFiles.audio) && <FilePreview files={uploadedFiles} />}
        {result && <Results data={result} />}
      </div>
    </div>
  );
}

export default App;
