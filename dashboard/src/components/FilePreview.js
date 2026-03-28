import React, { useState, useEffect } from 'react';

function FilePreview({ files }) {
  const [durations, setDurations] = useState({ video: null, audio: null });

  useEffect(() => {
    const loadDuration = (file, type) => {
      if (file) {
        const url = URL.createObjectURL(file);
        const media = document.createElement(file.type.startsWith('video/') ? 'video' : 'audio');
        media.src = url;
        media.onloadedmetadata = () => {
          setDurations(prev => ({ ...prev, [type]: media.duration }));
          URL.revokeObjectURL(url);
        };
      }
    };

    loadDuration(files.video, 'video');
    loadDuration(files.audio, 'audio');
  }, [files]);

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderFileDetails = (file, type) => {
    if (!file) return null;

    return (
      <div style={{ marginBottom: '20px' }}>
        <h4>{type.charAt(0).toUpperCase() + type.slice(1)} File Details</h4>
        <div className="file-details">
          <p><strong>Name:</strong> {file.name}</p>
          <p><strong>Size:</strong> {formatFileSize(file.size)}</p>
          <p><strong>Type:</strong> {file.type || 'Unknown'}</p>
          <p><strong>Duration:</strong> {formatDuration(durations[type])}</p>
        </div>
        <h4>Preview</h4>
        {file.type.startsWith('video/') ? (
          <video className="preview-player" controls>
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <audio className="preview-player" controls>
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    );
  };

  if (!files.video && !files.audio) return null;

  return (
    <div className="card">
      <h3>Uploaded Files</h3>
      {renderFileDetails(files.video, 'video')}
      {renderFileDetails(files.audio, 'audio')}
    </div>
  );
}

export default FilePreview;