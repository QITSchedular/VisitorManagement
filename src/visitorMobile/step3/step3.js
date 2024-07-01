import React, { useState, useRef, useEffect } from "react";
import "./step3.scss";
import { Button } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import { useRegisterVisitor } from "../../Atoms/customHook";

export const Step3 = () => {
  const navigate = useNavigate();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [imageSrcBase, setImageSrcBase] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [registerVisitor , setRegisterVisitor] = useRegisterVisitor();

  // For Starting the Camera
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

  //For Stopping the Camera 
  const stopCamera = () => {
    let stream = videoRef.current.srcObject;
    let tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;
  };

  // Camera Toggle Operation
  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
    setIsCameraOn((prevState) => !prevState);
  };

  // Capturing The Photo in the camera 
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageSrc = canvas.toDataURL("image/jpeg");
    setImageSrcBase(imageSrc);
    stopCamera();
    setIsCameraOn(false);
  };

  // Previous Button
  const handlePreviousBtn = () => {
    navigate("/welcomestep1");
  };

  // Action for continue button
  const hanldeActionContinue =()=>{
    console.log("this is my img src = " ,imageSrcBase)
    setRegisterVisitor((prev)=>({
      ...prev,
      vavatar : imageSrcBase
    }))

    return navigate('/welcomestep4')
  }


  useEffect(()=>{
    console.log("This is my State : " , registerVisitor)
  },[registerVisitor])

  return (
    <div className="step3">
      <div className="backbtn">
        <i
          className="ri-arrow-left-line"
          style={{ fontSize: "20px" }}
          onClick={handlePreviousBtn}
        ></i>
      </div>
      <div className="header-step">
        <div className="step-number">
          <span>Step 3/4</span>
        </div>
        <div className="welcome-text">
          <span>Click Photo</span> <span>Click the picture</span>
        </div>
      </div>
      <div className={`picture ${isCameraOn ? "fullscreen" : ""}`}>
        {isCameraOn && (
          <div className="imgcapture">
            <div className="video-wrapper">
              <video
                ref={videoRef}
                width="100%"
                height="100%"
                autoPlay
                style={{ display: isCameraOn ? "block" : "none" }}
              ></video>
              {isCameraOn && (
                <div className="photo-button" onClick={capturePhoto}>
                  <div className="circle"></div>
                  <div className="ring"></div>
                </div>
              )}
            </div>
            <canvas
              ref={canvasRef}
              width="720"
              height="1280"
              style={{ display: "none" }}
            ></canvas>
          </div>
        )}

        {!isCameraOn && imageSrcBase && (
          <div className="imgcapture">
            <img
              src={imageSrcBase}
              alt="profile"
              height="160px"
              width="140px"
            />
          </div>
        )}

        {!isCameraOn && (
          <div className="captureBtn">
            <Button
              text={"Click a picture"}
              width={"100%"}
              height={"44px"}
              className="clickBtn"
              onClick={toggleCamera}
            />

            {imageSrcBase && (
              <Button
              text={"Continue"}
              width={"100%"}
              height={"44px"}
              onClick={hanldeActionContinue}
            />
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default Step3;
