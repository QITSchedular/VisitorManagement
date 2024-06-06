import React, { useState } from "react";
import "./profile.scss";
import Form from "devextreme-react/form";
import HeaderTab from "../../components/HeaderTab/HeaderTab";
import ProfileQr from "../../assets/images/profileQr.png";
import { TextBox } from "devextreme-react";

export default function Profile() {
  const [notes, setNotes] = useState(
    "Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you`ve not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.",
  );

  const [activePage, setActivePage] = useState();
  const activePageText = "Profile";
  const HeaderTabText = ["Notification", "Profile", "General Settings"];

  return (
    <React.Fragment>
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
              <img alt={"Profile"} src={ProfileQr} />
            </div>
            <div className="about-profile">
              <span className="portal-name">Admin Portal</span>
              <div className="name-address">
                <span>QIT Solution</span>
                <span>|</span>
                <span>Surat,Gujarat</span>
              </div>
              <span className="forget-pass">Reset Password</span>
            </div>
          </div>
          <div className="edit-profile-section">
            <div className="profile-section-header">
              <span>Profile</span>
            </div>
            <div className="profile-section-editor">
              <TextBox
                label="Business Name"
                labelMode="static"
                stylingMode="outlined"
                className="step-textbox"
                height={"56px"}
                width={"304px"}
              />
              <TextBox
                label="Business Location"
                labelMode="static"
                stylingMode="outlined"
                className="step-textbox"
                height={"56px"}
                width={"304px"}
              />
              <TextBox
                label="Email Address"
                labelMode="static"
                stylingMode="outlined"
                className="step-textbox"
                height={"56px"}
                width={"304px"}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
};
