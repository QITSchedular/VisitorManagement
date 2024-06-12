import React, { useEffect, useRef, useState } from "react";
import "./OtpVerificationForm.scss";
import { Button } from "devextreme-react";
import { LoginImage, LoginLogo } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { VerifyOtp } from "../../api/registorApi";
import { useRegisterState } from "../../Atoms/customHook";

const OtpVerificationForm = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const length = 6;
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);

  const navigate = useNavigate();

  const [registerUser] = useRegisterState();

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onOtpSubmit = async (combinedOtp) => {
    const email = registerUser.e_mail;
    const role = "company";
    console.log(" otp : ", combinedOtp);
    // Add your logic here after OTP submission
    const verifyMyOtp = await VerifyOtp(email, combinedOtp, role);
    if (verifyMyOtp.response.Status === 200) {
      console.log("Otp Verified ");
      return navigate("/fill-details");
    }

    console.log("Wrong Otp");
  };

  const handleResendOtp = () => {
    // Add your logic to resend OTP
    setTimer(60); // Reset timer
  };
  const handleRetryClick = () => {
    // getOtpFromMail(officialMail, userType);
    setTimer(60);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  return (
    <>
      <div className="login-container">
        <div className="login-container-left">
          <div className="login-form">
            <div className="header-image">
              <img src={LoginLogo} alt="logo" width={200} height={70} />
            </div>
            <div className="step-text">Step 2\4</div>
            <div className="header-title">
              <div className="header-main-title">
                <span>OTP Verification </span>
              </div>
              <div className="header-sub-title">
                <div>Sent to qitdemo@gmail.com</div>
              </div>
            </div>
            <div className="main-container">
              <div className="otp-main">
                {otp.map((value, index) => {
                  return (
                    <input
                      key={index}
                      type="text"
                      ref={(input) => (inputRefs.current[index] = input)}
                      value={value}
                      onChange={(e) => handleChange(index, e)}
                      onClick={() => handleClick(index)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="otp-input-box"
                    />
                  );
                })}
              </div>
            </div>
            <div className="otp-terms">
              <span className="otp-terms-condition">
                {" "}
                {timer > 0
                  ? `Didn’t get a OTP ? Retry in ${minutes
                      .toString()
                      .padStart(2, "0")} : ${seconds
                      .toString()
                      .padStart(2, "0")}`
                  : "Didn’t get a OTP ? "}
              </span>
              {timer === 0 && (
                <span className="resend-link">
                  <Link to="/fill-details" onClick={handleRetryClick}>
                    Click here to resend{" "}
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="login-container-right">
          <img src={LoginImage} alt="Login" />
        </div>
      </div>
    </>
  );
};

export default OtpVerificationForm;
