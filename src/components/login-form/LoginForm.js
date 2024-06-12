import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextBox, Button as TextBoxButton } from "devextreme-react/text-box";
import notify from "devextreme/ui/notify";
import { useAuth } from "../../contexts/auth";
import { Button } from "devextreme-react";
import { eyeopen, eyeclose } from "../../assets/icon";
import { Validator, RequiredRule } from "devextreme-react/validator";
import "./LoginForm.scss";
import { LoginImage, LoginLogo } from "../../assets";

export default function LoginForm() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showpwd, setShowPwd] = useState(false);
  const [passwordMode, setPasswordMode] = useState("password");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");

  const handlePWDChange = (e) => {
    setPassword(e.value);
    setPasswordError(false);
  };

  const handleUserLogin = async () => {
    setLoading(true);
    try {
      const response = await signIn(email, password);
      // Handle successful login here
      console.log("response 2 :  ", response);
      notify("Login successful", "success", 2000);
      navigate("/dashboard");
    } catch (error) {
      // Handle login error here
      console.log("error handling : ", error);
      notify("Login failed", "error", 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (event) => {
    setEmail(event.value);
  };

  const handlePassword = (event) => {
    setPassword(event.value);
  };

  const onCreateAccountClick = useCallback(() => {
    navigate("/create-account");
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-container-left">
        <div className="login-form">
          <div className="header-image">
            <img src={LoginLogo} alt="logo" width={200} height={70} />
          </div>
          <div className="header-title">
            <div className="header-main-title">
              <span>Login into an account </span>
            </div>
            <div className="header-sub-title">
              <div>
                Don’t have an account?
                <span className="create-account" onClick={onCreateAccountClick}>
                  Create an account
                </span>
              </div>
            </div>
          </div>
          <div className="login-container-right-body">
            <div className="inputField">
              <TextBox
                label="Email Address"
                placeholder="Input text"
                labelMode="static"
                stylingMode="outlined"
                height={56}
                onValueChanged={handleEmail}
              >
                <Validator className="custom-validator">
                  <RequiredRule message="Email Address is required" />
                </Validator>
              </TextBox>
            </div>
            <div className="inputField">
              <TextBox
                label="Password"
                placeholder="Input text"
                value={password}
                mode={passwordMode}
                labelMode="static"
                height={56}
                stylingMode="outlined"
                onValueChanged={handlePassword}
              >
                <TextBoxButton
                  name="password"
                  location="after"
                  options={{
                    icon: `${showpwd ? eyeopen : eyeclose}`,
                    stylingMode: "text",
                    onClick: () => {
                      setShowPwd(!showpwd);
                      setPasswordMode((prevPasswordMode) =>
                        prevPasswordMode === "text" ? "password" : "text"
                      );
                    },
                  }}
                />
                <Validator>
                  <RequiredRule message="Password is required" />
                </Validator>
              </TextBox>
            </div>
            <div className="forget-pwd">
              <Link to={"/reset-password"}>Forgot Password?</Link>
            </div>
          </div>

          <div className="login-container-right-footer">
            <Button
              text="Continue"
              width={"100%"}
              height={"48px"}
              useSubmitBehavior={true}
              onClick={handleUserLogin}
              disabled={loading}
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
}
