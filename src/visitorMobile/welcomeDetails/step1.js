import React, { useEffect } from "react";
import "./step1.scss";
import { Button, Form, TextBox, Validator } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import { useRegisterVisitor } from "../../Atoms/customHook";
import { requestOtp } from "../../api/registorApi";
import { toastDisplayer } from "../../components/toastDisplayer/toastdisplayer";
import { EmailRule, RequiredRule } from "devextreme-react/validator";

export const Step1 = () => {
  const [registerVisitor, setRegisterVisitor] = useRegisterVisitor();
  const navigate = useNavigate();

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterVisitor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Previous Button function
  const handlePreviousBtn = () => {
    navigate("/welcomevisitor");
  };

  // Handle Continue Button
  const hanldeOnContinue = () => {
    console.log("yooo : ", registerVisitor.e_mail);
    if (registerVisitor.vname === "") {
      return 
    } else if (registerVisitor.e_mail === "") {
      return 
    } else if (registerVisitor.phone1 === "") {
      return 
    } else if (registerVisitor.vcmpname === "") {
      return 
    } else if (registerVisitor.vlocation === "") {
      return 
    } else {
      hanldeGetOtp();
      return navigate("/checkinotp");

    }
  };

  // Handle OTP
  const hanldeGetOtp = () => {
    const email = registerVisitor.e_mail;
    const role = "visitor";
    const handleOtp = requestOtp(email, role);

    if (handleOtp === true) {
      return console.log("error");
    }
  };

  const hanldeNavigateCheckOut = () => {
    navigate("/checkout");
  };
  useEffect(() => {
    console.log("registor : ", registerVisitor);
  }, [registerVisitor]);
  return (
    <div className="Step1">
      <form>
        <div className="backbtn">
          <i
            className="ri-arrow-left-line"
            style={{ fontSize: "20px" }}
            onClick={handlePreviousBtn}
          ></i>
        </div>
        <div className="header-step">
          <div className="step-number">
            <span>Step 1/4</span>
          </div>
          <div className="welcome-text">
            <span>Welcome!</span> <span>Fill in the details</span>
          </div>
        </div>

        <div className="input-text">
          <TextBox
            label="Name"
            value={registerVisitor.vname}
            labelMode="static"
            stylingMode="outlined"
            height={"56px"}
            className="step-textbox"
            onValueChanged={(e) =>
              handleInputChange({ target: { name: "vname", value: e.value } })
            }
          >
            <Validator>
              <RequiredRule message="Name is required" />
            </Validator>
          </TextBox>
          <TextBox
            label="Email"
            value={registerVisitor.e_mail}
            labelMode="static"
            stylingMode="outlined"
            height={"56px"}
            className="step-textbox"
            Validator={true}
            onValueChanged={(e) =>
              handleInputChange({ target: { name: "e_mail", value: e.value } })
            }
          >
            <Validator className="custom-validator">
              <EmailRule message="Email is invalid" />
              <RequiredRule message="Email is required" />
            </Validator>
          </TextBox>
          <TextBox
            label="Mobile Number"
            value={registerVisitor.phone1}
            labelMode="static"
            stylingMode="outlined"
            height={"56px"}
            className="step-textbox"
            onValueChanged={(e) =>
              handleInputChange({ target: { name: "phone1", value: e.value } })
            }
          >
            <Validator className="custom-validator">
              <RequiredRule message="mobile Number is required" />
            </Validator>
          </TextBox>
          <TextBox
            label="Company"
            value={registerVisitor.vcmpname}
            labelMode="static"
            stylingMode="outlined"
            height={"56px"}
            className="step-textbox"
            onValueChanged={(e) =>
              handleInputChange({
                target: { name: "vcmpname", value: e.value },
              })
            }
          >
            <Validator className="custom-validator">
              <RequiredRule message="Company is required" />
            </Validator>
          </TextBox>
          <TextBox
            label="Location"
            value={registerVisitor.vlocation}
            labelMode="static"
            stylingMode="outlined"
            height={"56px"}
            className="last-textbox"
            onValueChanged={(e) =>
              handleInputChange({
                target: { name: "vlocation", value: e.value },
              })
            }
          >
            <Validator className="custom-validator">
              <RequiredRule message="Location is required" />
            </Validator>
          </TextBox>
        </div>
        <div className="btn-section">
          <Button
            text="Continue"
            width={"100%"}
            useSubmitBehavior={true}
            height={"44px"}
            onClick={hanldeOnContinue}
          />
        </div>

        <div className="already-text">
          <span> Already a visitor?</span>
          <span onClick={hanldeNavigateCheckOut}> Check Out</span>
        </div>
      </form>
    </div>
  );
};
