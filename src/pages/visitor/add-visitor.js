import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs/BreadCrumbs";
import {
  FormText,
  HeaderText,
} from "../../components/typographyText/TypograghyText";
import { Button as TextBoxButton } from "devextreme-react/text-box";
import { Button, LoadPanel, SelectBox, TextBox } from "devextreme-react";
import SendVerification from "../../components/popups/send-verification";
import { PopUpIcon } from "../../assets";
import OtpPopup from "../../components/popups/otp-popup";
import { RequiredRule, EmailRule, Validator } from "devextreme-react/validator";
import { toastDisplayer } from "../../components/toastDisplayer/toastdisplayer";
import { useAuth } from "../../contexts/auth";
import { GetCmpDept } from "../../api/userAPI";
import { requestOtp } from "../../api/registorApi";
import { registerVisitorApi } from "../../api/mobileVisitorApi";

const AddVisitor = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isOtpPopupVisible, setIsOtpPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    e_mail: "",
    company: "",
    location: "",
    meetPerson: "",
    cmpdeptid: "",
    timeslot: "",
    hardware: "",
    purpose: "",
  });
  const validateFields = () => {
    const requiredFields = ["username", "e_mail"];
    return requiredFields.every((field) => formData[field]);
  };
  const [isOTPVerified, setIsOTPVrified] = useState(false);
  const [deptData, setDeptData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refFocused, setrefFocused] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const handleOpenPopup = () => {
    if (!validateFields()) {
      return toastDisplayer("error", "Please fill in all required fields.");
    }
    setIsPopupVisible(true);
  };
  const handleCloseOtpPopup = () => {
    setIsOtpPopupVisible(false);
  };
  const handleOtpBtnClick = async () => {
    setIsLoading(true);
    await OtpBtnHandler();
    setIsLoading(false);
    setIsOtpPopupVisible(true);
  };

  const mobileOption = {
    isDisabled: true,
    icon: PopUpIcon,
    onClick: () => {
      OtpBtnHandler();
    },
  };

  const handleSelectTimeSlot = (e) => {
    setFormData((prev) => ({
      ...prev,
      timeslot: e.value,
    }));
  };
  const handleInputChange = (fieldName, e) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: e.value,
    }));
  };

  const GenerateOTP = async (officialMail, type) => {
    setLoading(true);
    setrefFocused(true);
    const getOtpFromID = await requestOtp(officialMail, type);
    console.log(getOtpFromID);
    if (getOtpFromID.hasError === true) {
      setLoading(false);
      console.log("vggg", getOtpFromID);
      return toastDisplayer("error", getOtpFromID.errorMessage);
    } else {
      setIsOtpPopupVisible(true);
      setLoading(false);
      return toastDisplayer("suceess", "OTP send successfully..!!");
    }
  };

  useEffect(() => {}, [formData]);

  const OtpBtnHandler = () => {
    console.log(formData?.e_mail);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isMatch = regex.test(formData?.e_mail);
    if (isMatch === false) {
      return toastDisplayer("error", "Enter a correct Mail ");
    }
    GenerateOTP(formData?.e_mail, "visitor");
  };

  const fetchDeptData = async () => {
    setLoading(true);
    const response = await GetCmpDept(user.cmpid);
    if (response.hasError === true) {
      setLoading(false);
      // return console.log(response.errorMessage);
      // return toastDisplayer("error", getOtpFromID.errorMessage);
      return toastDisplayer("error", response.errorMessage);
    } else {
      setDeptData(response.responseData);
      setLoading(false);
      return toastDisplayer("suceess", "OTP send successfully..!!");
    }
  };

  useEffect(() => {
    fetchDeptData();
  }, []);

  const formatDateTime = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const generateTimeSlots = (date) => {
    let slots = [];
    const now = new Date();
    const currentHour = now.getHours();
    for (let i = currentHour; i < 24; i++) {
      const slotDate = new Date(date);
      slotDate.setHours(i, 0, 0, 0);
      const displayText = `${slotDate.getDate()} - ${
        slotDate.getMonth() + 1
      } - ${slotDate.getFullYear()}, ${slotDate.getHours() % 12 || 12} : 00 ${
        slotDate.getHours() >= 12 ? "pm" : "am"
      }`;
      slots.push({
        text: displayText,
        value: formatDateTime(slotDate),
      });
    }
    return slots;
  };
  const memoizedTimeSlots = useMemo(() => {
    const today = new Date();
    return generateTimeSlots(today);
  }, []);

  useEffect(() => {
    setTimeSlots(memoizedTimeSlots);
  }, [memoizedTimeSlots]);

  const handleSaveFunction = async () => {
    if (isOTPVerified) {
      if (!validateFields()) {
        return toastDisplayer("error", "Please fill in all required fields.");
      }

      const reqPayload = {
        vname: formData.username,
        e_mail: formData.e_mail,
        phone1: "",
        company_id: user.cmpid,
        vcmpname: formData.company,
        vlocation: formData.location,
        cnctperson: formData.meetPerson,
        department_id: formData.cmpdeptid,
        timeslot: formData.timeslot,
        anyhardware: formData.hardware,
        purposeofvisit: formData.purpose,
        vavatar: "null" || null,
        createdby: user.transid,
        reason: "",
      };

      setLoading(true);
      const response = await registerVisitorApi(reqPayload);
      if (response.hasError === true) {
        setLoading(false);
        return toastDisplayer("error", response.errorMessage);
      } else {
        setLoading(false);
        setFormData({});
        setIsPopupVisible(false);
        return toastDisplayer("success", "Visitor Added Successfully");
      }
    } else {
      toastDisplayer("error", "Visitor is already Exist");
    }
  };

  return (
    <>
      <div className="content-block">
        <div className="navigation-header">
          <div className="title-section">
            <HeaderText text="Add Visitors" />
          </div>
          <div className="title-section-btn">
            <Button
              text="Send for Verify"
              width={140}
              height={44}
              className="button-with-margin"
              onClick={handleOpenPopup}
              useSubmitBehavior={true}
            />
          </div>
        </div>
      </div>
      <Breadcrumbs />
      <form>
        <div className="content-block dx-card">
          <div className="title-section">
            <FormText text="Personal Details" />
          </div>
          <div className="personal-detail-form">
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
            <div className="form-input popup-textbox">
              {isLoading && (
                <LoadPanel visible={true} shadingColor="rgba(0,0,0,0.4)" />
              )}
              <TextBox
                label="Email Address"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
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
          </div>
          <div className="personal-detail-form">
            <div className="form-input">
              <TextBox
                label="Company"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
                onValueChanged={(e) => handleInputChange("company", e)}
                value={formData?.company}
              >
                <Validator>
                  <RequiredRule message="Company is required" />
                </Validator>
              </TextBox>
            </div>
            <div className="form-input">
              <TextBox
                label="Location"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
                onValueChanged={(e) => handleInputChange("location", e)}
                value={formData?.location}
              >
                <Validator>
                  <RequiredRule message="Location is required" />
                </Validator>
              </TextBox>
            </div>
          </div>
        </div>

        <div className="content-block dx-card">
          <div className="title-section">
            <FormText text="Other Details" />
          </div>
          <div className="personal-detail-form">
            <div className="form-input">
              <TextBox
                label="Person you want to meet"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
                onValueChanged={(e) => handleInputChange("meetPerson", e)}
                value={formData?.meetPerson}
              >
                <Validator>
                  <RequiredRule message="Field is required" />
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
          <div className="personal-detail-form">
            <div className="form-input">
              <SelectBox
                label="Time Slot"
                dataSource={timeSlots}
                displayExpr="text"
                valueExpr="value"
                labelMode="static"
                stylingMode="outlined"
                height={"56px"}
                className="step-textbox"
                onValueChanged={handleSelectTimeSlot}
                //value={formData?.timeslot}
              >
                <Validator>
                  <RequiredRule message="Time Slot is required" />
                </Validator>
              </SelectBox>
            </div>
            <div className="form-input">
              <TextBox
                label="Any Hardware"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
                onValueChanged={(e) => handleInputChange("hardware", e)}
                value={formData?.hardware}
              >
                <Validator>
                  <RequiredRule message="Feild is required" />
                </Validator>
              </TextBox>
            </div>
          </div>
          <div className="personal-detail-form">
            <div className="form-input full-width">
              <TextBox
                label="Purpose of Visit"
                placeholder="Input"
                labelMode="static"
                stylingMode="outlined"
                onValueChanged={(e) => handleInputChange("purpose", e)}
                value={formData?.purpose}
              >
                <Validator>
                  <RequiredRule message="Purpose of Visit is required" />
                </Validator>
              </TextBox>
            </div>
          </div>
        </div>
      </form>
      <SendVerification
        header="Send for Verification"
        subHeader="Are you sure you want to send for approval?"
        approval="Send for Verification"
        discard="Discard"
        saveFunction={handleSaveFunction}
        isVisible={isPopupVisible}
        onHide={handleClosePopup}
      />
      <OtpPopup
        header="OTP Verification"
        subHeader={`Sent to ${formData?.e_mail}`}
        isVisible={isOtpPopupVisible}
        onHide={handleCloseOtpPopup}
        email={`${formData?.e_mail}`}
        role={"visitor"}
        isBtnVisible={true}
        setIsOTPVrified={setIsOTPVrified}
      />
    </>
  );
};

export default AddVisitor;
