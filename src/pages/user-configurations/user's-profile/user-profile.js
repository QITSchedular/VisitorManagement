import React from "react";
import { HeaderText } from "../../../components/typographyText/TypograghyText";
import { Button } from "devextreme-react";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
} from "devextreme-react/data-grid";
import { userData } from "./user-data";
import "./user-profile.scss";
const getStatusColor = (status) => {
  const statusColors = {
    Changed: "#124d22",
    Pending: "#934908",
  };

  return statusColors[status];
};

const UserProfile = () => {
  return (
    <>
      <div className="dx-card" style={{ marginTop: "16px" }}>
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="User’s Profile" />
          </div>
          <div className="title-section-btn">
            <Button
              text="Save Details"
              width={140}
              height={44}
              className="button-with-margin"
              // onClick={handleClick}
            />
          </div>
        </div>
        <DataGrid
          dataSource={userData}
          showBorders={false}
          selection={{
            mode: "multiple",
          }}
          className="data-grid"
          hoverStateEnabled={true}
          columnAutoWidth={true}
          // ref={(ref) => {
          //   dataGrid = ref;
          // }}
        >
          <Paging defaultPageSize={10} />
          <Pager
            visible={true}
            displayMode="compact"
            showNavigationButtons={true}
          />
          <Editing allowDeleting={true} allowUpdating={true} useIcons={true} />
          <Column dataField="ID" visible={false} />
          <Column dataField="UserName" allowEditing={false} />
          <Column type="buttons">
            <Button name="edit" />
            <Button name="delete" />
          </Column>
          <Column dataField="Password" />
          <Column dataField="Department" allowEditing={false} />
          <Column dataField="Gender" allowEditing={false} />
          <Column dataField="EmailID" allowEditing={false} />
          <Column dataField="PhoneNumber" allowEditing={false} />
          <Column
            allowEditing={false}
            dataField="ChangePassword"
            cellRender={(data) => {
              return (
                <>
                  <span className="col-main" data-type={data["value"]}>
                    <span
                      className="status-circle"
                      style={{
                        backgroundColor: getStatusColor(data["value"]),
                      }}
                    />
                    <span data-type={data["value"]}>{data["value"]}</span>
                  </span>
                </>
              );
            }}
          />
        </DataGrid>
      </div>
    </>
  );
};

export default UserProfile;
