import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs/BreadCrumbs";
import {
  FormText,
  HeaderText,
} from "../../components/typographyText/TypograghyText";
import { Button as TextBoxButton } from "devextreme-react/text-box";
import { Button, SelectBox, TextBox } from "devextreme-react";
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
  const [formData, setFormData] = useState(null);
  const [isOTPVerified, setIsOTPVrified] = useState(false);
  const [deptData, setDeptData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refFocused, setrefFocused] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const { user } = useAuth();

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };
  const handleCloseOtpPopup = () => {
    setIsOtpPopupVisible(false);
  };

  const mobileOption = {
    isDisabled: true,
    icon: PopUpIcon,
    onClick: () => {
      OtpBtnHandler();
    },
  };

  const handleSelectTimeSlot = (e) => {
    console.log({ target: { name: "timeslot", value: e.value } });
    console.log("payload tiem : ", e.value.value);
    setFormData((prev) => ({
      ...prev,
      timeslot: e.value,
    }));
  };
  const handleInputChange = (fieldName, e) => {
    console.log("i am called ", e.value, "key : ", fieldName);
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: e.value,
    }));
  };

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

  useEffect(() => {
    console.log("from Data  : ", formData);
  }, [formData]);
  const OtpBtnHandler = () => {
    console.log(formData?.e_mail);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isMatch = regex.test(formData?.e_mail);
    if (isMatch === false) {
      console.log("Enter a correct Mail");
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
      console.log(response.responseData);
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
    console.log("slot: ", memoizedTimeSlots);
  }, [memoizedTimeSlots]);

  const handleSaveFunction = async () => {
    console.log("save function");
    if (isOTPVerified) {
      const requiredFields = ["username", "e_mail"];
      const hasEmptyField = requiredFields.find((field) => !formData[field]);
      if (hasEmptyField) {
        return console.log(hasEmptyField);
      }
      const reqPayload = {
        vname: formData?.username,
        e_mail: formData?.e_mail,
        phone1: "",
        company_id: user.cmpid,
        vcmpname: formData?.company,
        vlocation: formData?.location,
        cnctperson: formData?.meetPerson,
        department_id: formData?.cmpdeptid,
        timeslot: formData?.timeslot,
        anyhardware: formData?.hardware,
        purposeofvisit: formData?.purpose,
        vavatar: "null" || null,
        createdby: user.transid,
        reason: "",
      };
      setLoading(true);
      const response = await registerVisitorApi(reqPayload);
      if (response.hasError === true) {
        setLoading(false);
        console.log(response.errorMessage);
        return toastDisplayer("error", response.errorMessage);
      } else {
        setLoading(false);
        setFormData(null);
        setIsOTPVrified(false);
        // console.log(response.responseData);
        return toastDisplayer("suceess", "OTP send successfully..!!");
      }
    } else {
      toastDisplayer("error", "OTP is not verified..!!");
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
