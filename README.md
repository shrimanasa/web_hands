# Neon Web Hands

This project is a real-time web-based interactive visualizer that tracks your hands using your webcam and creates dynamic "string art" or "laser webs" between your fingers. It utilizes Google's MediaPipe model directly inside the browser for zero-latency, private, client-side AI processing.

## Visual Effect
- When **one hand** is detected, it draws a complex geometric mesh between your fingers.
- When **two hands** are detected, it connects the joints of your left hand to the joints of your right hand, creating a laser web effect between them.
- Uses glowing HSL neon colors: Pink, Yellow, Blue, and Green.

## Structure

```
neon-web-hands/
│
├── index.html       # The main HTML structure (contains the video and canvas)
├── css/
│   └── style.css    # Full-screen responsive layout and dark theme
├── js/
│   └── main.js      # The hand-tracking logic, webcam streaming, and custom renderer
└── README.md
```

## How to Run Locally

You don't need NodeJS or NPM since this runs in the browser via CDN! If you have Python installed, you can simply serve the directory.

1. Open a terminal in the root directory.
2. Run a local web server, for example:
   ```bash
   python -m http.server 8000
   ```
3. Navigate to `http://localhost:8000` in your web browser.
4. Allow webcam access when prompted!
