import React, { useEffect, useRef, useState } from "react";
import { Button, CheckBox } from "devextreme-react";
import { LoginImage, LoginLogo, QRCodeImage } from "../../assets";
import { useNavigate, Link } from "react-router-dom";
import QRCode from "react-qr-code";
import "./QRCodeForm.scss";
import { toPng } from "html-to-image";
import { QrCode } from "@mui/icons-material";

const QRCodeForm = () => {
  const [qrString, setQrString] = useState("");
  const navigate = useNavigate();
  const qrRef = useRef();
  const handleSubmit = () => {
    navigate("/qr-code");
  };

  const handleDownload = () => {
    if (qrRef.current) {
      toPng(qrRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "qr-code.png";
          link.click();
        })
        .catch((err) => {
          console.error("Failed to download QR code", err);
        });
    }
  };

  const handleContinue = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  //const qrString = "vooo";
  // useEffect(() => {
  //   console.log("string : ", sessionStorage.getItem("qr-string"));
  //   setQrString(sessionStorage.getItem("qr-string"));
  // }, []);
  useEffect(() => {
    const storedQrString = sessionStorage.getItem("qr-string");
    if (!storedQrString) {
      console.log("yooooo");
      navigate(-1); // Navigate to the previous page if qr-string is not present
    } else {
      setQrString(storedQrString);
    }
  }, [navigate]);
  return (
    <div className="login-container">
      <div className="login-container-left">
        <div className="login-form">
          <div className="header-image">
            <img src={LoginLogo} alt="logo" width={200} height={70} />
          </div>
          <div className="step-text">Step 4\4</div>
          <div className="header-title">
            <div className="header-main-title">
              <span>Download QR Code</span>
            </div>
            <div className="header-sub-title">
              <div>Print the QR code and paste it at the entrance.</div>
            </div>
          </div>
          <div className="login-container-right-body">
            <div className="qr-code" ref={qrRef}>
              {/* <QrCode
                className="qr-image"
                value="hellvsdjvmnmnfbafsd,dmnf,dbfnbsd,fbnsdfbjsdvajo"
              /> */}
              <QRCode value={qrString} className="qr-image" />
              {/* <img src={QRCodeImage} alt="qr-code" /> */}
            </div>
          </div>
          <div className="login-container-right-footer">
            <Button
              text="Download"
              width={"100%"}
              height={"48px"}
              stylingMode="outlined"
              onClick={handleDownload}
            />
          </div>
          <div className="login-container-right-footer">
            <Button
              text="Continue"
              width={"100%"}
              height={"48px"}
              onClick={handleContinue}
            />
          </div>

          <div className="terms-condition">
            <div>
              I agree with your{" "}
              <span className="terms-service">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
      <div className="login-container-right">
        <img src={LoginImage} alt="Login" />
      </div>
    </div>
  );
};

export default QRCodeForm;
