import React, { useState } from 'react';

function UploadForm({ onAnalyze }) {
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate analysis payload
    const dummyResult = {
      audio: 'real',
      video: 'fake',
      confidence: 0.87,
    };
    onAnalyze(dummyResult);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <div>
        <label>
          Audio File:
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
          />
        </label>
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>
          Video File:
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </label>
      </div>

      <button type="submit" style={{ marginTop: '10px' }}>
        Analyze
      </button>
    </form>
  );
}

export default UploadForm;
