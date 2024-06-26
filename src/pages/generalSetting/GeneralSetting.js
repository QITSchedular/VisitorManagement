import React, { useEffect, useRef, useState } from "react";
import "./generalsetting.scss";
import HeaderTab from "../../components/HeaderTab/HeaderTab";
import { HeaderText } from "../../components/typographyText/TypograghyText";
import { Button } from "devextreme-react";
import DataGrid, {
  Column,
  Paging,
  Toolbar,
  Item,
  Pager,
  SearchPanel,
  RequiredRule,
  Editing,
} from "devextreme-react/data-grid";
import { toastDisplayer } from "../../components/toastDisplayer/toastdisplayer";
import { GetCmpDept } from "../../api/userAPI";
import { useAuth } from "../../contexts/auth";
import {
  deleteDepartment,
  saveDepartment,
  updateDepartment,
} from "../../api/departmentAPi";

const GeneralSetting = () => {
  const [activePage, setActivePage] = useState();
  const HeaderTabText = ["Notification", "Profile", "General Settings"];
  const gridRef = useRef(null);
  const [departmentData, setDepartmentData] = useState(false);
  const { user } = useAuth();

  const getDeptData = async () => {
    var apiRes = await GetCmpDept(user.cmpid);
    if (!apiRes.hasError) {
      setDepartmentData(apiRes.responseData);
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

  const handleAddDepartment = async (e) => {
    var newName = e.data.deptname;
    if (newName) {
      if (!newName.trim()) {
        e.cancel = true;
        return toastDisplayer("error", "Department name is required..!!");
      } else {
        const reqBody = {
          dept_name: newName,
          company_id: user.cmpid,
        };
        var apiRes = await saveDepartment(reqBody);
        if (apiRes.hasError) {
          toastDisplayer("error", apiRes.errorMessage);
          await getDeptData();
        } else {
          toastDisplayer("success", "Department added successfully!");
          await getDeptData();
        }
      }
    } else {
      e.cancel = true;
      return toastDisplayer("error", "Department name is required..!!");
    }
  };

  const handleUpdateDepartment = async (e) => {
    const updatedName = e.data.deptname;

    if (updatedName) {
      if (!updatedName.trim()) {
        e.cancel = true;
        return toastDisplayer("error", "Department name is required..!!");
      } else {
        const reqBody = {
          transid: e.data.transid,
          deptname: updatedName,
          cmptransid: user.cmpid,
        };
        const apiRes = await updateDepartment(reqBody);
        if (apiRes.hasError) {
          console.log("Error:", apiRes.errorMessage);
          toastDisplayer("error", apiRes.errorMessage);
          await getDeptData();
        } else {
          toastDisplayer("success", "Department updated successfully!");
          await getDeptData();
        }
      }
    } else {
      e.cancel = true;
      return toastDisplayer("error", "Department name is required..!!");
    }
  };

  const handleRemoveDepartment = async (e) => {
    var deptID = e.data.transid;
    var compID = user.cmpid;
    if (deptID) {
      var apiRes = await deleteDepartment(deptID, compID);
      if (apiRes.hasError) {
        return toastDisplayer("error", apiRes.errorMessage);
      } else {
        return toastDisplayer("success", "Department deleted successfully");
      }
    } else {
      e.cancel = true;
      return toastDisplayer("error", "Department name is required..!!");
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
            dataSource={departmentData}
            keyExpr="transid"
            allowColumnReordering={true}
            showBorders={true}
            ref={gridRef}
            onRowUpdated={handleUpdateDepartment}
            onRowRemoved={handleRemoveDepartment}
            onRowInserted={handleAddDepartment}
          >
            <Paging defaultPageSize={10} />
            <Pager
              visible={true}
              displayMode="compact"
              showNavigationButtons={true}
            />
            <Editing mode="row" allowUpdating={true} allowDeleting={true} />
            <Column caption="Department Name" dataField="deptname">
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
