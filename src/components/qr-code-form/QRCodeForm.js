import React from "react";
import { Button, CheckBox } from "devextreme-react";
import { LoginImage, LoginLogo, QRCodeImage } from "../../assets";
import { useNavigate, Link } from "react-router-dom";
import "./QRCodeForm.scss";

const QRCodeForm = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/qr-code");
  };
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
            <div className="qr-code">
              <img src={QRCodeImage} alt="qr-code" />
            </div>
          </div>
          <div className="login-container-right-footer">
            <Button
              text="Download"
              width={"100%"}
              height={"48px"}
              stylingMode="outlined"
            />
          </div>
          <div className="login-container-right-footer">
            <Button text="Continue" width={"100%"} height={"48px"} />
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
