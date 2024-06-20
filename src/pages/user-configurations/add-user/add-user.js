import { Button, SelectBox, TextBox } from "devextreme-react";
import React, { useEffect, useState } from "react";
import { HeaderText } from "../../../components/typographyText/TypograghyText";
import "./add-user.scss";
import { Button as TextBoxButton } from "devextreme-react/text-box";
import { PopUpIcon } from "../../../assets";
import OtpPopup from "../../../components/popups/otp-popup";
import { RequiredRule, EmailRule, Validator } from "devextreme-react/validator";
import { requestOtp } from "../../../api/registorApi";
import { LoadPanel } from "devextreme-react/load-panel";
import { useAuth } from "./../../../contexts/auth";
import { GetCmpDept, SaveUserData } from "../../../api/userAPI";
import { toastDisplayer } from "../../../components/toastDisplayer/toastdisplayer";

const AddUser = () => {
  const [isOtpPopupVisible, setIsOtpPopupVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const [refFocused, setrefFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOTPVerified, setIsOTPVrified] = useState(false);
  const { user } = useAuth();
  const [deptData, setDeptData] = useState([]);

  const loadDeptData = async () => {
    setLoading(true);
    const response = await GetCmpDept(user.cmpid);
    if (response.hasError === true) {
      setLoading(false);
      return console.log(response.errorMessage);
      // return toastDisplayer("error", getOtpFromID.errorMessage);
    } else {
      console.log(response.responseData);
      setDeptData(response.responseData);
      setLoading(false);
      // return toastDisplayer("suceess", "OTP send successfully..!!");
    }
  };
  useEffect(() => {
    loadDeptData();
  }, []);

  const GenerateOTP = async (officialMail, type) => {
    setLoading(true);
    setrefFocused(true);
    const getOtpFromID = await requestOtp(officialMail, type);

    if (getOtpFromID.hasError === true) {
      setLoading(false);
      // return console.log(getOtpFromID.errorMessage);
      return toastDisplayer("error", getOtpFromID.errorMessage);
    } else {
      setIsOtpPopupVisible(true);
      setLoading(false);
      // return console.log("OTP send successfully..!!");
      return toastDisplayer("suceess", "OTP send successfully..!!");
    }
  };

  const OtpBtnHandler = () => {
    console.log(formData?.e_mail);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isMatch = regex.test(formData?.e_mail);

    if (isMatch === false) {
      console.log("Enter a correct Mail");
      return;
      // return toastDisplayer("error", "Enter a correct Mail ");
    }
    GenerateOTP(formData?.e_mail, "user");
  };

  const mobileOption = {
    isDisabled: true,
    icon: PopUpIcon,
    onClick: () => {
      OtpBtnHandler();
    },
  };
  const handleCloseOtpPopup = () => {
    setIsOtpPopupVisible(false);
  };
  const userType = ["Admin", "User"];
  const Genders = ["Male", "Female"];

  const handleClick = async () => {
    if (isOTPVerified) {
      const requiredFields = ["username", "password", "e_mail", "cmpdeptid"];

      const hasEmptyField = requiredFields.find((field) => !formData[field]);
      if (hasEmptyField) {
        return console.log(hasEmptyField);
      }
      const reqPayload = {
        username: formData?.username,
        password: formData?.password,
        e_mail: formData?.e_mail,
        phone: formData?.phone,
        cmptransid: user.cmpid,
        cmpdeptid: formData?.cmpdeptid,
        gender: formData?.gender || null,
        usertype: formData?.usertype,
        changepassstatus: 0,
      };
      setLoading(true);
      const response = await SaveUserData(reqPayload);
      if (response.hasError === true) {
        setLoading(false);
        console.log(response.errorMessage);
        return toastDisplayer("error", response.errorMessage);
      } else {
        setLoading(false);
        setFormData(null);
        setIsOTPVrified(false);
        console.log(response.responseData);
        return toastDisplayer("suceess", "OTP send successfully..!!");
      }
    } else {
      console.log("OTP is not verified..!!");
    }
  };

  const handleInputChange = (fieldName, e) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: e.value,
    }));
  };

  return (
    <>
      {/* <LoadPanel visible={true} shadingColor="rgba(0,0,0,0.4)" /> */}
      {loading && <LoadPanel visible={true} shadingColor="rgba(0,0,0,0.4)" />}
      <div className="dx-card" style={{ marginTop: "16px" }}>
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="Add Users" />
          </div>
          <div className="title-section-btn">
            <Button
              text="Save Details"
              width={140}
              height={44}
              className="button-with-margin"
              onClick={handleClick}
              useSubmitBehavior={true}
            />
          </div>
        </div>
        <form>
          <div className="add-user-form">
            <div className="form-input">
              <SelectBox
                label="Select User Type"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
                items={userType}
                onValueChanged={(e) => handleInputChange("usertype", e)}
                value={formData?.userType}
              >
                <Validator>
                  <RequiredRule message="Usertype is required" />
                </Validator>
              </SelectBox>
            </div>
            <div className="form-input">
              <TextBox
                label="Name"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
                onValueChanged={(e) => handleInputChange("username", e)}
                value={formData?.username}
              >
                <Validator>
                  <RequiredRule message="Username is required" />
                </Validator>
              </TextBox>
            </div>
          </div>
          <div className="add-user-form">
            <div className="form-input">
              <TextBox
                label="Password"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
                onValueChanged={(e) => handleInputChange("password", e)}
                value={formData?.password}
              >
                <Validator>
                  <RequiredRule message="Password is required" />
                </Validator>
              </TextBox>
            </div>
            <div className="form-input popup-textbox">
              <TextBox
                label="Mobile Number"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
                onValueChanged={(e) => handleInputChange("phone", e)}
                value={formData?.phone}
              >
                {/* <TextBoxButton
                name="popupSearch"
                location="after"
                options={mobileOption}
              /> */}
              </TextBox>
            </div>
          </div>
          <div className="add-user-form">
            <div className="form-input popup-textbox">
              <TextBox
                label="Email Address"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
                valueChangeEvent="keyup"
                onValueChanged={(e) => handleInputChange("e_mail", e)}
                readOnly={isOTPVerified}
                value={formData?.e_mail}
              >
                <TextBoxButton
                  name="popupSearch"
                  location="after"
                  options={mobileOption}
                />
                <Validator>
                  <RequiredRule message="Email is required" />
                  <EmailRule message="Email is invalid" />
                </Validator>
              </TextBox>
            </div>
            <div className="form-input">
              <SelectBox
                label="Select Department"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
                onValueChanged={(e) => handleInputChange("cmpdeptid", e)}
                items={deptData}
                displayExpr={"deptname"}
                valueExpr={"transid"}
                value={formData?.cmpdeptid}
              >
                <Validator>
                  <RequiredRule message="Department is required" />
                </Validator>
              </SelectBox>
            </div>
          </div>
          <div className="add-user-form">
            <div className="form-input">
              <SelectBox
                label="Select Gender"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
                items={Genders}
                onValueChanged={(e) => handleInputChange("gender", e)}
                value={formData?.gender}
              ></SelectBox>
            </div>
            <div className="form-input"></div>
          </div>
        </form>
      </div>
      <OtpPopup
        header="OTP Verification"
        subHeader={`Sent to ${formData?.e_mail}`}
        isVisible={isOtpPopupVisible}
        onHide={handleCloseOtpPopup}
        email={`${formData?.e_mail}`}
        role={"user"}
        isBtnVisible={true}
        setIsOTPVrified={setIsOTPVrified}
      />
    </>
  );
};

export default AddUser;
