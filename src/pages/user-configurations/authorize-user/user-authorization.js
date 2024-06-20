import React, { useEffect, useRef, useState } from "react";
import TreeList, {
  Column,
  SearchPanel,
  Toolbar,
  Item,
} from "devextreme-react/tree-list";
import CheckBox from "devextreme-react/check-box";
import TextBox, { Button as TextBoxButton } from "devextreme-react/text-box";
import {
  authObject,
  finalObject,
} from "../../../components/common-object/common-object";
import { Button, LoadPanel, Popup } from "devextreme-react";
import { HeaderText } from "../../../components/typographyText/TypograghyText";
import { helpIcon, saveIcon } from "../../../assets/icon";
import HelperPopupPage from "../../../components/Helper-popup/helper_popup";
import "./user-authorization.scss";
import { useAuth } from "../../../contexts/auth";
import {
  getUserAuthRole,
  getUserData,
  postAuthenticationRule,
} from "../../../api/common";
const UserAuthorization = () => {
  const [loading, setLoading] = useState(false);
  const [UserData, setUserData] = useState(false);
  const [AuthPopUp, setAuthPopUp] = useState(false);
  const [isModuleTreeVisible, setModuleTreeVisible] = useState(false);
  const [CopyAuthPopUp, CopysetAuthPopUp] = useState(false);
  const [expandedKeys] = useState([]);
  const [selectedKeys] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [selectedRowKeysOnChangeAuth, setSelectedRowKeysOnChangeAuth] = useState([]);
  const [selectedCopyRowKeysOnChangeAuth, setSelectedCopyRowKeysOnChangeAuth] =  useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedCopyRowKeys, setSelectedCopyRowKeys] = useState([]);
  const [userAuthorizationRule, setuserAuthorizationRule] = useState([]);
  const [userCopyData, setUserCopyData] = useState([]);
  const dataGridCopyRefAuthRule = useRef();
  const dataGridRefAuthRule = useRef();
  const updatedStates = {};
  const { user } = useAuth();

  const handleCheckboxValueChanged = (taskId, field, value) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value,
      },
    }));
  };

  const userHelpOptions = {
    icon: helpIcon,
    onClick: () => showPopupHandler(),
  };
  
  const showPopupHandler = () => {
    setAuthPopUp(true);
  };

  const handleCancel = () => {
    setAuthPopUp(false);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let result = await getUserData("All", user.cmpid);
      if (result.hasError) {
        setLoading(false);
        console.log("Error : ", result);
        // return toastDisplayer("error", result.errorMessage);
      }
      setLoading(false);
      const new_data = result.responseData.filter((user) => user.usertype !== "Admin");
      setUserData(new_data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (userAuthorizationRule) {
      findTaskIDWithAccess(userAuthorizationRule, authObject);
    } else {
      authObject.forEach((task) => {
        updatedStates[task.Task_ID] = {
          C: false,
        };
      });
      setCheckboxStates(updatedStates);
    }
  }, []);

  function findTaskIDWithAccess(object, data) {
    setCheckboxStates(updatedStates);
    object.forEach((item) => {
      if (item.hasAccess) {
        const task = data.find(
          (taskItem) =>
            taskItem.Task_Subject.toLowerCase() === item.text.toLowerCase()
        );

        if (task) {
          updatedStates[task.Task_ID] = {
            C: true,
          };
        }
      } else {
        const task = data.find(
          (taskItem) =>
            taskItem.Task_Subject.toLowerCase() === item.text.toLowerCase()
        );

        if (task) {
          updatedStates[task.Task_ID] = {
            C: false,
          };
        }
      }
    });

    setCheckboxStates((prevStates) => ({
      ...prevStates,
      ...updatedStates,
    }));
  }
 
  const handleSave = async () => {
    setSelectedRowKeys(selectedRowKeysOnChangeAuth);
    if (selectedRowKeysOnChangeAuth.length > 0) {
      setLoading(true);
      setAuthPopUp(false);
      copyToPopUpData(selectedRowKeysOnChangeAuth[0].e_mail);
      const getUserAuthRoleRes = await getUserAuthRole(
        selectedRowKeysOnChangeAuth[0].e_mail,
        selectedRowKeysOnChangeAuth[0].usertype,
        user.cmpid
      );
      if (!getUserAuthRoleRes.hasError) {
        const authData = getUserAuthRoleRes.responseData;

        const correctedString = authData.Authentication_Rule.replace(/'/g, '"')
          .replace(/True/g, "true")
          .replace(/False/g, "false");

        const userAuthJSON = JSON.parse(correctedString);
        setuserAuthorizationRule(userAuthJSON);
        findTaskIDWithAccess(userAuthJSON, authObject);
      } else {
        authObject.forEach((task) => {
          updatedStates[task.Task_ID] = {
            C: false,
          };
        });
        setCheckboxStates(updatedStates);
      }
      setModuleTreeVisible(true);
      setLoading(false);
    } else {
      setModuleTreeVisible(false);
      setLoading(false);
      // return toastDisplayer("error", "Please select a user");
    }
  };
 
  const selectedRowSetterApprove = async (params) => {
    setSelectedRowKeysOnChangeAuth(params);
  };

  const handleDataGridRowSelectionAuthRuleUser = async ({
    selectedRowKeys,
  }) => {
    setSelectedRowKeysOnChangeAuth(selectedRowKeys);
    const length = await selectedRowKeys.length;
    if (selectedRowKeys.length > 1) {
      const value = await dataGridRefAuthRule.current.instance.selectRows(
        selectedRowKeys[length - 1]
      );
      return selectedRowSetterApprove(value);
    } else {
      const value = await dataGridRefAuthRule.current.instance.selectRows(
        selectedRowKeys[0]
      );
      return selectedRowSetterApprove(value);
    }
  };


  const handleClick = async () => {
    try {
      setLoading(true);
      const finalNavigation = finalObject.map((authItem) => {
        const task = authObject.find(
          (taskItem) =>
            taskItem.Task_Subject.toLowerCase() === authItem.text.toLowerCase()
        );

        if (task) {
          return {
            ...authItem,
            hasAccess: task ? checkboxStates[task.Task_ID].C : false,
          };
        }
        return authItem;
      });
      const payload = {
        useremail: selectedRowKeysOnChangeAuth[0].e_mail,
        userrole: selectedRowKeysOnChangeAuth[0].usertype,
        cmptransid: user.cmpid,
        module_classes: finalNavigation,
      };
      const apiResponse = await postAuthenticationRule(payload);
      if (apiResponse.hasError) {
        // return toastDisplayer("error", apiResponse.errorMessage);
      } else {
        setSelectedRowKeys([]);
        // setSelectedRowKeysOnChangeAuth([]);
        // setModuleTreeVisible(false);
        setLoading(false);
        // return toastDisplayer("success", apiResponse.responseData.statusMsg);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // ================== copy data
 
  const copyhelpOptions = {
    icon: helpIcon,
    class: "copyIcon",
    onClick: async () => {
      copyshowPopupHandler();
    },
  };

  const copyshowPopupHandler = () => {
    CopysetAuthPopUp(true);
  };

  const copyToPopUpData = (id) => {
    const new_data = UserData.filter((user) => user.e_mail !== id);
    setUserCopyData(new_data);
  };

  const handleCopyPopupCancel = () => {
    CopysetAuthPopUp(false);
  };

  const handleDataGridCopyRowSelectionAuthRuleUser = async ({
    selectedRowKeys,
  }) => {
    setSelectedCopyRowKeysOnChangeAuth(selectedRowKeys);
  };
 
  const handleCopySave = async () => {
    const res = [];
    setLoading(true);
    await Promise.all(
      selectedCopyRowKeysOnChangeAuth.map(async (element) => {
        var new_data = UserData.filter((user) => user.e_mail == element);
        const payload = {
          useremail: new_data[0].e_mail,
          userrole: new_data[0].usertype,
          cmptransid: user.cmpid,
          module_classes: userAuthorizationRule,
        };
        const apiResponse = await postAuthenticationRule(payload);
        res.push(apiResponse);
      })
    );

    if (res.length > 0) {
      if (res.some((item) => item.hasError)) {
        res.forEach((item) => {
          if (item.hasError) {
            setLoading(false);
            // toastDisplayer("error", item.errorMessage);
          }
        });
      } else {
        // toastDisplayer("success", "Copy rule successfully...!!");
      }
      setLoading(false);
      CopysetAuthPopUp(false);
    } else {
      setLoading(false);
      CopysetAuthPopUp(false);
      // return toastDisplayer("error", "Something went wrong");
    }
  };

  return (
    <>
      {loading && <LoadPanel visible={true} />}
      {AuthPopUp && (
        <Popup
          visible={true}
          height={window.innerHeight - 100}
          width={"1000px !important"}
          showCloseButton={false}
          className="initate-popup-css"
          showTitle={false}
          contentRender={() => (
            <HelperPopupPage
              title={"User Details"}
              caption={"Choose the user"}
              handleCancel={handleCancel}
              handleSave={handleSave}
              datagridData={UserData}
              keyExpr={"e_mail"}
              handleDataGridRowSelection={
                handleDataGridRowSelectionAuthRuleUser
              }
              dataGridRef={dataGridRefAuthRule}
              selectedRowKeys={selectedRowKeys}
            />
          )}
        ></Popup>
      )}
      {CopyAuthPopUp && (
        <Popup
          visible={true}
          height={window.innerHeight - 100}
          width={"1000px !important"}
          showCloseButton={false}
          className="initate-popup-css"
          showTitle={false}
          contentRender={() => (
            <HelperPopupPage
              title={"Apply Same Authorisation Rule to Users"}
              caption={"Apply rules to users"}
              handleCancel={handleCopyPopupCancel}
              handleSave={handleCopySave}
              datagridData={userCopyData}
              keyExpr={"e_mail"}
              handleDataGridRowSelection={
                handleDataGridCopyRowSelectionAuthRuleUser
              }
              dataGridRef={dataGridCopyRefAuthRule}
              selectedRowKeys={selectedCopyRowKeys}
            />
          )}
        ></Popup>
      )}

      <div className="dx-card" style={{ marginTop: "16px" }}>
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="Authorise User" />
          </div>
          <div className="title-section-btn">
            {isModuleTreeVisible && (
              <Button
                text="Save Details"
                width={140}
                height={44}
                className="button-with-margin"
                onClick={handleClick}
              />
            )}
          </div>
        </div>

        <div className="main-content-div">
          <div className="auth-title-section">
            <TextBox
              labelMode="outside"
              placeholder="User Name"
              width={"40%"}
              className="seachBox"
              value={
                selectedRowKeysOnChangeAuth.length > 0
                  ? selectedRowKeysOnChangeAuth[0].e_mail
                  : ""
              }
            >
              <TextBoxButton
                name="popupSearch"
                location="after"
                options={userHelpOptions}
                height={44}
                width={44}
                className="searchicon"
                style={{ "background-color": "#f6f6f6" }}
              />
            </TextBox>
          </div>
        </div>
        {isModuleTreeVisible && (
          <TreeList
            dataSource={authObject}
            keyExpr="Task_ID"
            defaultExpandedRowKeys={expandedKeys}
            defaultSelectedRowKeys={selectedKeys}
            showRowLines={true}
            showColumnLines={false}
            columnAutoWidth={true}
            className="tree-list-main"
          >
            <SearchPanel visible={true} />
            <Column dataField="Task_Subject" caption="Modules" width={300} />
            <Column dataField="Task_ID" visible={false} />
            <Column
              caption="Authorise"
              alignment={"center"}
              cellRender={(cellData) => {
                return (
                  <>
                    <CheckBox
                      value={checkboxStates[cellData.data.Task_ID]?.C}
                      onValueChanged={(e) => {
                        handleCheckboxValueChanged(
                          cellData.data.Task_ID,
                          "C",
                          e.value
                        );
                      }}
                    />
                  </>
                );
              }}
            />

            <Toolbar className="header-toolbar-modules">
              <Item location="before">
                <div className="informer">
                  {/* <span className="sub-text">All Modules</span> */}
                </div>
              </Item>
              <Item name="searchPanel" />
              <Item location="after" cssClass="searchPanelIcon">
                <TextBox
                  placeholder="Pre-set Rule"
                  width={168}
                  className="report-right"
                >
                  <TextBoxButton
                    name="popupSearch"
                    location="after"
                    options={copyhelpOptions}
                    height={44}
                    className="popup-copy-icon"
                  />
                </TextBox>
              </Item>
            </Toolbar>
          </TreeList>
        )}
      </div>
    </>
  );
};

export default UserAuthorization;
