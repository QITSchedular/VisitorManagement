import React, { useEffect, useRef, useState } from "react";
import "./generalsetting.scss";
import HeaderTab from "../../components/HeaderTab/HeaderTab";
import { HeaderText } from "../../components/typographyText/TypograghyText";
import { Button, DataGrid } from "devextreme-react";
import {
  Column,
  Editing,
  Paging,
  RequiredRule,
} from "devextreme-react/data-grid";
import { toastDisplayer } from "../../components/toastDisplayer/toastdisplayer";
import { GetCmpDept } from "../../api/userAPI";
import { useAuth } from "../../contexts/auth";

const GeneralSetting = () => {
  const [activePage, setActivePage] = useState();
  const HeaderTabText = ["Notification", "Profile", "General Settings"];
  const gridRef = useRef(null);
  const [categoryData, setCategoryData] = useState(false);
  const { user } = useAuth();

  const getDeptData = async () => {
    var apiRes = await GetCmpDept(user.cmpid);
    if (!apiRes.hasError) {
      setCategoryData(apiRes.responseData);
    } else {
      return toastDisplayer("error", apiRes.errorMessage);
    }
  };

  useEffect(() => {
    getDeptData();
  }, []);

  const handleAddPopup = async () => {
    if (gridRef.current && gridRef.current.instance) {
      const gridInstance = gridRef.current.instance;

      try {
        gridInstance.addRow();
      } catch (error) {
        console.error("Error adding row:", error);
      }
    } else {
      console.error("Grid instance not available.");
    }
  };
  return (
    <div className="GeneralSetting">
      <HeaderTab
        HeaderTabText={HeaderTabText}
        HeaderText={activePage}
        setActivePage={setActivePage}
      />
      <div className="content-block dx-card">
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="Add Department" />
          </div>
          <div className="title-section-btn">
            <Button
              text="Add Department"
              height={44}
              onClick={handleAddPopup}
              useSubmitBehavior={true}
            />
          </div>
        </div>
        <div style={{ marginTop: "24px" }}>
          <DataGrid
            id="gridContainer"
            dataSource={categoryData}
            keyExpr="cmptransid"
            allowColumnReordering={true}
            showBorders={true}
            ref={gridRef}
            // onRowUpdated={handleUpdateCategory}
            // onRowRemoved={handleRemoveCategory}
            // onRowInserted={handleAddCategory}
            // onEditCanceled={""}
          >
            <Paging defaultPageSize={6} defaultPageIndex={0} />
            <Editing mode="row" allowUpdating={true} allowDeleting={true} />
            <Column caption="Department NAME" dataField="deptname">
              {/* <ValidationRule
                  type="required"
                  message="Category name is required"
                /> */}
              <RequiredRule message="Required" />
            </Column>
          </DataGrid>
        </div>
      </div>
    </div>
  );
};

export default GeneralSetting;
