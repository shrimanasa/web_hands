<div align="center">
  
# Interactive AI Hand Tracking Mesh

[![MediaPipe](https://img.shields.io/badge/MediaPipe-Tasks_Vision-blue.svg)](https://developers.google.com/mediapipe)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

A real-time, browser-based interactive visualizer that tracks your hands using your webcam and generates dynamic, neon geometric meshes between your fingers. 

</div>

---


## 🧠 What it is

This project utilizes Google's **MediaPipe** machine learning models directly inside the browser. It tracks 21 3D landmarks per hand in real-time with zero server latency (everything runs client-side), and uses the HTML5 `<canvas>` API to render a custom graphic effect rather than a standard skeletal overlay.

## ✨ Features

- **Intra-hand Mesh:** When one hand is detected, a complex 3D wireframe mesh connects your individual finger joints.
- **Inter-hand Laser Web:** When two hands are detected, the system draws connections spanning from the joints of the left hand to the right hand, creating a dynamic web.
- **Holographic Neon Rendering:** Uses high-performance Canvas compositing (`lighter` blending mode) to literally glow when lines overlap, mapped to a cyberpunk neon color palette (Pink, Yellow, Cyan, Green).
- **Privacy First:** 100% of the AI processing happens locally on your machine. No video data is ever sent to a server.

## 📁 Directory Structure

```text
├── index.html       # The main entry point (video frame & canvas overlay)
├── css/
│   └── style.css    # Full-screen responsive layout and dark theme
└── js/
    └── main.js      # MediaPipe initialization, tracking logic, and rendering engine
```

## 🚀 How to Run Locally

Because this project uses vanilla web technologies and loads MediaPipe via a CDN, there is no complicated build step required. 

1. Clone this repository locally:
   ```bash
   git clone https://github.com/shrimanasa/web_hands.git
   ```
2. Open the directory in your terminal and serve it using any local web server. For example, using Python:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.
4. Accept the camera permissions when prompted.
