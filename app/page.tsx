"use client";

import { useRef, useState } from 'react';

export default function Home() {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const handleCamera = async () => {
    if (isCameraOn) {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
    } else {
      try {
        const constraints = {
          video: {
            facingMode: { ideal: "environment" } // Utilise "user" pour la caméra avant et "environment" pour la caméra arrière
          }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
      } catch (err) {
        console.error("Error accessing the camera: ", err);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <button onClick={handleCamera} style={{ marginBottom: '20px' }}>
        {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
      </button>
      <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '500px', height: 'auto' }}></video>
    </div>
  );
}
