import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import Results from './components/Results';

function App() {
  const [result, setResult] = useState(null);

  const handleAnalysis = (data) => {
    // This would be replaced by a real API call to the deepfake detection service
    setResult(data);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Audio-Visual Deepfake Detection Dashboard</h1>
      <UploadForm onAnalyze={handleAnalysis} />
      {result && <Results data={result} />}
    </div>
  );
}

export default App;
