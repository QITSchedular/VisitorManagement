import React from "react";
import { HeaderText } from "../../components/typographyText/TypograghyText";
import { TabPanel } from "devextreme-react";
import { Item } from "devextreme-react/cjs/tab-panel";
import "./user-settings.scss";
import AddUser from "./add-user/add-user";
import UserAuthorization from "./authorize-user/user-authorization";
import UserProfile from "./user's-profile/user-profile";
import NotificationAuthorization from "./notification-authorize/notification-authorization";

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
      <div className="content-block tab-panel">
        <TabPanel id="tabPanel" deferRendering={false}>
          <Item title="Add Users">
            <AddUser />
          </Item>
          <Item title="User’s Profile">
            <UserProfile />
          </Item>
          <Item title="Authorise User">
            <UserAuthorization />
          </Item>
          <Item title="Notification Authorise">
            <NotificationAuthorization />
          </Item>
        </TabPanel>
      </div>
    </>
  );
};

export default UserSettingsMain;
