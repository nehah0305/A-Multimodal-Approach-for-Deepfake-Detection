# Deepfake Detection Dashboard

This is a simple React-based dashboard for demonstrating an audio-visual deepfake detection system.

## Features

- Upload audio and video files
- Simulated analysis result display
- Easily extendable to call a backend API for real analysis

## Setup

1. Ensure you have Node.js/NPM installed.
2. Open a terminal at the `dashboard` folder:
   ```bash
   cd "c:\Users\nehah\OneDrive\Desktop\MAJOR PROJECT\A-Multimodal-Approach-for-Deepfake-Detection\dashboard"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm start
   ```
5. The app will open at `http://localhost:3000`.

## Extending

- Replace the dummy `handleSubmit` in `UploadForm.js` with a fetch call to your backend service.
- Update `Results` component to display more detailed analysis.

---

This dashboard is just the frontend; make sure you have a corresponding backend API for processing files.  
