import React, { useEffect, useRef, useState } from "react";
import "./profile.scss";
import HeaderTab from "../../components/HeaderTab/HeaderTab";
import { LoadPanel, TextBox, SelectBox } from "devextreme-react";
import {
  GetCmpDept,
  GetCmpDetail,
  GetUserDetail,
  UpdateCmpData,
  UpdateUserData,
} from "../../api/userAPI";
import { useAuth } from "../../contexts/auth";
import { toastDisplayer } from "../../components/toastDisplayer/toastdisplayer";
import qrcode from "qrcode";
import { Button } from "devextreme-react/button";
import { HeaderText } from "../../components/typographyText/TypograghyText";
import CustomLoader from "../../components/customerloader/CustomLoader";
import { RequiredRule, EmailRule, Validator } from "devextreme-react/validator";


export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState(false);
  const [activePage, setActivePage] = useState();
  const activePageText = "Profile";
  const HeaderTabText = ["Notification", "Profile", "General Settings"];
  const [isProfExpand, setIsProfExpand] = useState(false);
  const [isCmpExpand, setIsCmpExpand] = useState(false);
  const [formData, setFormData] = useState(null);
  const [userFormData, setUserFormData] = useState(null);
  const [isCmp, setIsCmp] = useState(user.userrole == "COMPANY" ? true : false);
  const Genders = ["Male", "Female"];
  const [deptData, setDeptData] = useState([]);

  const loadDeptData = async () => {
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

  const getProfileData = async () => {
    setLoading(true);
    const response = await GetCmpDetail(user.cmpid);
    if (response.hasError === true) {
      setLoading(false);
      return toastDisplayer("error", response.errorMessage);
    } else {
      setCompanyData(response.responseData);

      var dataRes = response.responseData;
      setFormData(response.responseData);


      if (canvasRef.current) {
        qrcode.toCanvas(
          canvasRef.current,
          process.env.REACT_APP_URL + "#/welcomevisitor/" + dataRes.qrstring,
          (error) => {
            if (error) {
              console.error("Error while genratting  QR code:", error);
            }
          }
        );
        setLoading(false);
      }
      // return toastDisplayer("suceess", "OTP send successfully..!!");
    }
  };

  const getUserProfileData = async () => {
    setLoading(true);
    const response = await GetUserDetail(user.cmpid, user.transid);
    if (response.hasError === true) {
      setLoading(false);
      return toastDisplayer("error", response.errorMessage);
    } else {
      // setCompanyData(response.responseData);

      // var dataRes = response.responseData;
      setUserFormData(response.responseData);
      setLoading(false);
      }
      // return toastDisplayer("suceess", "OTP send successfully..!!");
    }
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    getProfileData();
    loadDeptData();
    if (user.userrole == "USER" || user.userrole == "ADMIN") {
      getUserProfileData();
    }
  }, []);

  const handleProfExpand = () => {
    setIsProfExpand(!isProfExpand);
  };
  const handleCmpExpand = () => {
    setIsCmpExpand(!isCmpExpand);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [uploadedFileName, setUploadedFileName] = useState("");
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setUploadedFileName(file.name);
    const base64 = await convertToBase64(file);
    setFormData((prevState) => ({
      ...prevState,
      ["cmplogo"]: base64,
    }));
  };

  const handleInputChange = (fieldName, e) => {
    console.log(fieldName);
    setUserFormData((prevState) => ({
      ...prevState,
      [fieldName]: e,
    }));
  };

  const handleSaveData = async () => {
    if (user.userrole == "COMPANY") {
      console.log(formData);
      setFormData(companyData);
      setLoading(true);
      const response = await UpdateCmpData(formData);
      if (response.hasError === true) {
        setLoading(false);
        console.log(response.errorMessage);
        return toastDisplayer("error", response.errorMessage);
      } else {
        getProfileData();
        setLoading(false);
        console.log(response.responseData);
        return toastDisplayer("success", "Profile data updated..!!");
      }
    } else {
      console.log("----------->", userFormData);
      setLoading(true);
      // userFormData["company_id"] = user.cmpid;
      const reqPayload = {
        transid: userFormData.transid,
        username: userFormData.username,
        phone: userFormData.phone,
        department_id: userFormData.cmpdeptid,
        gender: userFormData.gender,
        company_id: user.cmpid,
      };
      // return console.log(reqPayload);
      const response = await UpdateUserData(reqPayload);
      if (response.hasError === true) {
        setLoading(false);
        console.log(response.errorMessage);
        return toastDisplayer("error", response.errorMessage);
      } else {
        getUserProfileData();
        setLoading(false);
        console.log(response.responseData);
        return toastDisplayer("success", "Profile data updated..!!");
      }
    }
  };
  const handleCancelEdit = () => {
    console.log(formData);
    setFormData(companyData);
  };

  return (
    <>
      {loading && (
        <div className="Myloader">
          <CustomLoader />
        </div>
      )}
      <div className="profile">
        <HeaderTab
          HeaderTabText={HeaderTabText}
          HeaderText={activePage}
          setActivePage={setActivePage}
          activePageText={activePageText}
        />
        <div className={"content-block dx-card "}>
          <div className="upper-section">
            <div className={"form-avatar"}>
              {/* <img alt={"Profile"} src={"ProfileQr"} /> */}

              <canvas ref={canvasRef}></canvas>
            </div>
            <div className="profileHeader">
              <div className="about-profile">
                {user.userrole == "COMPANY" ? (
                  <>
                    <span className="portal-name">Company Portal</span>

                    <div className="name-address">
                      <span className="bname">{companyData.bname}</span>
                      {companyData.city != null && companyData.city != "" ? (
                        <>
                          <span>|</span>
                          <span className="cityTxt">
                            {companyData.city}
                            {companyData.state != null ? (
                              <>,{companyData.state}</>
                            ) : (
                              <></>
                            )}
                          </span>
                        </>
                      ) : (
                        <>
                          {companyData.state != null ? (
                            <>
                              <span>|</span>
                              <span className="cityTxt">
                                {companyData.state}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {user.userrole == "ADMIN" ? (
                      <>
                        <span className="portal-name">Admin Portal</span>
                      </>
                    ) : (
                      <>
                        <span className="portal-name">User Portal</span>
                      </>
                    )}
                    <div className="name-address">
                      <span className="bname">{userFormData?.username}</span>

                      <span>|</span>
                      <span className="cityTxt">
                        {
                          deptData?.find(
                            (e) => e.transid == userFormData.cmpdeptid
                          )?.deptname
                        }
                      </span>
                    </div>
                  </>
                )}
                <span className="forget-pass">Reset Password</span>
              </div>
              <div className="save-btn-section">
                <Button
                  text={"Cancel"}
                  height={44}
                  stylingMode="outlined"
                  width={100}
                  onClick={handleCancelEdit}
                />

                <Button
                  text={"Save"}
                  height={44}
                  width={100}
                  onClick={handleSaveData}
                />
              </div>
            </div>
          </div>

          {user.userrole == "COMPANY" ? (
            <></>
          ) : (
            <>
              <div className="edit-profile-section">
                <div className="profile-section-header">
                  <span>Your profile</span>
                  {isProfExpand ? (
                    <Button icon="chevronup" onClick={handleProfExpand} />
                  ) : (
                    <Button icon="chevrondown" onClick={handleProfExpand} />
                  )}
                </div>
                {isProfExpand ? (
                  <>
                    <div className="profile-section-editor">
                      <TextBox
                        label="User Name"
                        labelMode="static"
                        stylingMode="outlined"
                        className="step-textbox"
                        height={"56px"}
                        width={"304px"}
                        value={userFormData.username}
                        onValueChanged={(e) =>
                          handleInputChange("username", e.value)
                        }
                      />
                      <TextBox
                        label="Email Address"
                        labelMode="static"
                        stylingMode="outlined"
                        className="step-textbox"
                        height={"56px"}
                        width={"304px"}
                        readOnly={true}
                        value={userFormData.e_mail}
                      />
                      <TextBox
                        label="Mobile Number"
                        labelMode="static"
                        stylingMode="outlined"
                        className="step-textbox"
                        height={"56px"}
                        width={"304px"}
                        value={userFormData.phone}
                        onValueChanged={(e) =>
                          handleInputChange("phone", e.value)
                        }
                      />
                    </div>

                    <div className="profile-section-editor">
                      <SelectBox
                        label="Select Department"
                        placeholder="Input"
                        labelMode="static"
                        stylingMode="outlined"
                        onValueChanged={(e) =>
                          handleInputChange("cmpdeptid", e.value)
                        }
                        height={"56px"}
                        width={"304px"}
                        items={deptData}
                        displayExpr={"deptname"}
                        valueExpr={"transid"}
                        value={userFormData?.cmpdeptid}
                      >
                        <Validator>
                          <RequiredRule message="Department is required" />
                        </Validator>
                      </SelectBox>
                      <SelectBox
                        label="Select Gender"
                        placeholder="Input"
                        labelMode="static"
                        stylingMode="outlined"
                        items={Genders}
                        height={"56px"}
                        width={"304px"}
                        onValueChanged={(e) => handleInputChange("gender", e)}
                        value={userFormData?.gender}
                      ></SelectBox>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}

          <div className="edit-profile-section">
            <div className="profile-section-header">
              <span>Company profile</span>
              {isCmpExpand ? (
                <Button icon="chevronup" onClick={handleCmpExpand} />
              ) : (
                <Button icon="chevrondown" onClick={handleCmpExpand} />
              )}
            </div>
            {isCmpExpand ? (
              <>
                <div className="profile-section-editor">
                  <TextBox
                    label="Business Name"
                    labelMode="static"
                    stylingMode="outlined"
                    className="step-textbox"
                    height={"56px"}
                    width={"304px"}
                    value={formData.bname}
                    onValueChanged={(e) => handleInputChange("bname", e.value)}
                    readOnly={!isCmp}
                  />
                  <TextBox
                    label="Business Location"
                    labelMode="static"
                    stylingMode="outlined"
                    className="step-textbox"
                    height={"56px"}
                    width={"304px"}
                    value={formData.blocation}
                    onValueChanged={(e) =>
                      handleInputChange("blocation", e.value)
                    }
                    readOnly={!isCmp}
                  />
                  <TextBox
                    label="Email Address"
                    labelMode="static"
                    stylingMode="outlined"
                    className="step-textbox"
                    height={"56px"}
                    width={"304px"}
                    readOnly={true}
                    value={companyData.e_mail}
                  />
                </div>
                <div className="profile-section-editor">
                  <TextBox
                    label="Country"
                    labelMode="static"
                    stylingMode="outlined"
                    className="step-textbox"
                    height={"56px"}
                    width={"304px"}
                    value={formData.country}
                    onValueChanged={(e) =>
                      handleInputChange("country", e.value)
                    }
                    readOnly={!isCmp}
                  />
                  <TextBox
                    label="State"
                    labelMode="static"
                    stylingMode="outlined"
                    className="step-textbox"
                    height={"56px"}
                    width={"304px"}
                    value={formData.state}
                    onValueChanged={(e) => handleInputChange("state", e.value)}
                    readOnly={!isCmp}
                  />
                  <TextBox
                    label="City"
                    labelMode="static"
                    stylingMode="outlined"
                    className="step-textbox"
                    height={"56px"}
                    width={"304px"}
                    value={formData.city}
                    onValueChanged={(e) => handleInputChange("city", e.value)}
                    readOnly={!isCmp}
                  />
                </div>
                <div className="profile-section-editor">
                  <TextBox
                    label="Zipcode"
                    labelMode="static"
                    stylingMode="outlined"
                    className="step-textbox"
                    height={"56px"}
                    width={"304px"}
                    value={formData.zipcode}
                    onValueChanged={(e) =>
                      handleInputChange("zipcode", e.value)
                    }
                    readOnly={!isCmp}
                  />
                  <TextBox
                    label="Phone1"
                    labelMode="static"
                    stylingMode="outlined"
                    className="step-textbox"
                    height={"56px"}
                    width={"304px"}
                    value={formData.phone1}
                    onValueChanged={(e) => handleInputChange("phone1", e.value)}
                    readOnly={!isCmp}
                  />
                  <TextBox
                    label="Phone2"
                    labelMode="static"
                    stylingMode="outlined"
                    className="step-textbox"
                    height={"56px"}
                    width={"304px"}
                    value={formData.phone2}
                    onValueChanged={(e) => handleInputChange("phone2", e.value)}
                    readOnly={!isCmp}
                  />
                </div>
                <div className="profile-section-editor">
                  <TextBox
                    label="Website"
                    labelMode="static"
                    stylingMode="outlined"
                    className="step-textbox"
                    height={"56px"}
                    width={"304px"}
                    value={formData.websitelink}
                    onValueChanged={(e) =>
                      handleInputChange("websitelink", e.value)
                    }
                    readOnly={!isCmp}
                  />
                  {isCmp && (
                    <>
                      <label className="uplaod_btn" htmlFor="file_upload">
                        <i class="ri-upload-2-fill"></i>
                        {uploadedFileName ? (
                          <p>{uploadedFileName}</p>
                        ) : (
                          "Upload company logo."
                        )}
                      </label>
                      <input
                        //disabled={enableOnVerification}
                        type="file"
                        id="file_upload"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                        accept="image/png, image/jpeg"
                      />
                    </>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
};
