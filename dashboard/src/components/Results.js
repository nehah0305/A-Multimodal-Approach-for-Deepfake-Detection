import React from 'react';

function Results({ data }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Analysis Results</h2>
      <p>
        <strong>Audio:</strong> {data.audio}
      </p>
      <p>
        <strong>Video:</strong> {data.video}
      </p>
      <p>
        <strong>Confidence:</strong> {(data.confidence * 100).toFixed(1)}%
      </p>
    </div>
  );
}

export default Results;
