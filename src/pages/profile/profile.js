import React, { useEffect, useRef, useState } from "react";
import "./profile.scss";
import HeaderTab from "../../components/HeaderTab/HeaderTab";
import { LoadPanel, TextBox } from "devextreme-react";
import { GetCmpDetail, UpdateCmpData } from "../../api/userAPI";
import { useAuth } from "../../contexts/auth";
import { toastDisplayer } from "../../components/toastDisplayer/toastdisplayer";
import qrcode from "qrcode";
import { Button } from "devextreme-react/button";

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
      // return toastDisplayer("suceess", "OTP send successfully..!!");
    }
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    getProfileData();
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
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: e,
    }));
  };

  const handleSaveData = async () => {
    if (user.userrole == "COMPANY") {
      console.log(formData);
      setFormData(companyData);
      setLoading(true);
      console.log("here ===========>");
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
    }
  };
  const handleCancelEdit = () => {
    console.log(formData);
    setFormData(companyData);
  };

  return (
    <>
      {loading && <LoadPanel visible={true} shadingColor="rgba(0,0,0,0.4)" />}
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
                    <span className="portal-name">Admin Portal</span>
                  </>
                ) : (
                  <>
                    <span className="portal-name">User Portal</span>
                  </>
                )}
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
                          <span className="cityTxt">{companyData.state}</span>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
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
                  <div className="profile-section-editor">
                    <TextBox
                      label="Business Name"
                      labelMode="static"
                      stylingMode="outlined"
                      className="step-textbox"
                      height={"56px"}
                      width={"304px"}
                      value={formData.bname}
                      onValueChanged={(e) =>
                        handleInputChange("bname", e.value)
                      }
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
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <>
              <span className="portal-name">User Portal</span>
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
              <div className="profile-section-editor">
                <TextBox
                  label="Zipcode"
                  labelMode="static"
                  stylingMode="outlined"
                  className="step-textbox"
                  height={"56px"}
                  width={"304px"}
                  value={formData.zipcode}
                  onValueChanged={(e) => handleInputChange("zipcode", e.value)}
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
                />
                <TextBox
                  label="Country"
                  labelMode="static"
                  stylingMode="outlined"
                  className="step-textbox"
                  height={"56px"}
                  width={"304px"}
                  value={formData.country}
                  onValueChanged={(e) => handleInputChange("country", e.value)}
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
                />
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
                />
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
              </div>
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
