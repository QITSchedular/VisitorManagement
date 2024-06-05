import React from "react";
import { HeaderText } from "../../components/typographyText/TypograghyText";

const UserSettingsMain = () => {
  return (
    <>
      <div className="content-block">
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="User Settings" />
          </div>
        </div>
      </div>
      <div className="content-block dx-card"></div>
    </>
  );
};

export default UserSettingsMain;
