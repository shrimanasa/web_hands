const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('output_canvas');
const canvasCtx = canvasElement.getContext('2d');

// The specific colors requested
const neonColors = [
    '#FF10F0', // Neon Pink
    '#FFFF00', // Neon Yellow
    '#00E5FF', // Blue / Cyan
    '#39FF14'  // Neon Green
];

// Initialize MediaPipe Hands
const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});

hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

hands.onResults(onResults);

// Initialize Camera
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});

// Start the webcam
camera.start();

function onResults(results) {
    // Resize internal canvas resolution to match video aspect ratio constraints
    if (canvasElement.width !== results.image.width || canvasElement.height !== results.image.height) {
        // High quality display
        canvasElement.width = results.image.width;
        canvasElement.height = results.image.height;
    }

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    // Draw the webcam feed
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    // Apply dark overlay to make neon colors pop against the background
    canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    // Lighter standard composite to make colors literally "glow" when overlapping
    canvasCtx.globalCompositeOperation = "lighter";

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        
        // Convert normalized proportional coordinates (0.0 - 1.0) to absolute pixel coordinates
        const allHandsPixels = results.multiHandLandmarks.map(landmarks => {
            return landmarks.map(lm => ({
                x: lm.x * canvasElement.width,
                y: lm.y * canvasElement.height,
                z: lm.z
            }));
        });

        const landmarksHand1 = allHandsPixels[0];
        
        // Draw within hand 1
        drawWeb(landmarksHand1, landmarksHand1, true);

        if (allHandsPixels.length > 1) {
            const landmarksHand2 = allHandsPixels[1];
            
            // Draw within hand 2
            drawWeb(landmarksHand2, landmarksHand2, true);
            
            // Draw connections between hand 1 and hand 2
            drawWeb(landmarksHand1, landmarksHand2, false);
        }
    }
    canvasCtx.restore();
}

function drawWeb(pointsA, pointsB, isIntraHand) {
    canvasCtx.lineWidth = 1.5;
    
    // Loop through all points in Hand A and Hand B to connect them
    for (let i = 0; i < pointsA.length; i++) {
        for (let j = 0; j < pointsB.length; j++) {
            
            // Skip connecting the exact same point to itself within the same hand
            if (isIntraHand && i === j) continue;
            
            const ptA = pointsA[i];
            const ptB = pointsB[j];
            
            // Calculate distance between points
            const dist = Math.sqrt(Math.pow(ptA.x - ptB.x, 2) + Math.pow(ptA.y - ptB.y, 2));

            // Only draw lines if within a certain distance to create a dynamic web effect
            let maxDist = isIntraHand ? 300 : 600; 
            
            if (dist < maxDist) {
                // Determine color based on index to create a repeating structure of our neon colors
                const colorIndex = (i + j) % neonColors.length;
                canvasCtx.strokeStyle = neonColors[colorIndex];
                
                // Opacity based on distance (closer lines are solid, far ones fade out)
                const alpha = Math.max(0.05, 1.0 - (dist / maxDist));
                canvasCtx.globalAlpha = alpha;

                canvasCtx.beginPath();
                // We don't mirror the X coordinates here because the CSS transform:scaleX(-1) mirrors the entire canvas for us
                canvasCtx.moveTo(ptA.x, ptA.y);
                canvasCtx.lineTo(ptB.x, ptB.y);
                canvasCtx.stroke();
            }
        }
    }
}
