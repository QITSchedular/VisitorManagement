import React, { useState, useRef } from "react";
import "./step3.scss";
import { Button } from "devextreme-react";

export const Step3 = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [imageSrcBase, setImageSrcBase] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 720, height: 1280 } }) // 9:16 aspect ratio
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
  };

  const stopCamera = () => {
    let stream = videoRef.current.srcObject;
    let tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
    setIsCameraOn((prevState) => !prevState);
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageSrc = canvas.toDataURL("image/jpeg");
    console.log("Captured Image: ", imageSrc);
    setImageSrcBase(imageSrc);
  };

  return (
    <div className="step3">
      <div className="backbtn">
        <i className="ri-arrow-left-line" style={{ fontSize: "20px" }}></i>
      </div>
      <div className="header-step">
        <div className="step-number">
          <span>Step 3/4</span>
        </div>
        <div className="welcome-text">
          <span>Click Photo</span> <span>Fill in the details</span>
        </div>
      </div>
      <div className="picture">
        <div className="imgcapture">
          <video
            ref={videoRef}
            width="140"
            height="160"
            autoPlay
            style={{ display: isCameraOn ? "block" : "none" }}
          ></video>
          <canvas
            ref={canvasRef}
            width="720"
            height="1280"
            style={{ display: "none" }}
          ></canvas>
        </div>
        {imageSrcBase && (
          <div className="imgcapture">
            <img
              src={imageSrcBase}
              alt="profile"
              height="160px"
              width="140px"
            />
          </div>
        )}

        <div className="captureBtn">
          <Button
            text={"Click a picture"}
            width={"100%"}
            height={"44px"}
            className="clickBtn"
            onClick={toggleCamera}
          />
          <Button
            text={"Continue"}
            width={"100%"}
            height={"44px"}
            onClick={capturePhoto}
          />
        </div>
      </div>
    </div>
  );
};
