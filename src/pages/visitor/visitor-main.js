import React, { useState } from "react";
import {
  HeaderText,
  SubText,
} from "../../components/typographyText/TypograghyText";
import { SelectBox, Button, Popup, ContextMenu } from "devextreme-react";
import "./visitor-main.scss";
import Breadcrumbs from "../../components/breadcrumbs/BreadCrumbs";
import { useNavigate } from "react-router-dom";
import { customers } from "./data";
import DataGrid, {
  Column,
  Paging,
  Toolbar,
  Item,
  Pager,
  SearchPanel,
} from "devextreme-react/data-grid";
import "remixicon/fonts/remixicon.css";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useRecoilState } from "recoil";
import { addedByAtom, stateAtom, statusAtom } from "../../contexts/atom";

const getStatusColor = (status) => {
  const statusColors = {
    Approved: "#124d22",
    Pending: "#934908",
    Rejected: "#AD1820",
    "Check in": "0D4D8B",
    "Check Out": "#AD1820",
  };

  return statusColors[status];
};
const sanitizeClassName = (str) => {
  return String(str).replace(/[^a-zA-Z0-9_-]/g, "");
};
const VisitorMain = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Visitors/Add-Visitors");
  };
  let dataGrid;
  const [clickedRowData, setClickedRowData] = useState(null);
  const [status, setStatus] = useRecoilState(statusAtom);
  const [state, setState] = useRecoilState(stateAtom);
  const [addedby, setAddedby] = useRecoilState(addedByAtom);

  // const handlePopupIconClick = (cellData) => {
  //   const selectedRow = cellData.row.data;
  //   setClickedRowData(selectedRow);
  //   // setIsAdditionalCardVisible(true);
  //   setStates(selectedRow.state);
  //   setStatus(selectedRow.status);
  //   setAddedby(selectedRow.AddedBy);
  //   if (
  //     selectedRow.status === "none" &&
  //     selectedRow.state === "Rejected" &&
  //     selectedRow.AddedBy === "Company"
  //   ) {
  //     navigate("/Visitors/Edit-Visitor-Details");
  //   } else {
  //     navigate("/Visitors/Details-of-Visitor");
  //   }
  // };

  const handlePopupIconClick = (rowData) => {
    setClickedRowData(rowData);
    setState(rowData.state);
    setStatus(rowData.status);
    setAddedby(rowData.AddedBy);
  };

  const handleMenuClick = (e, rowData) => {
    handlePopupIconClick(rowData);
    console.log("row data", rowData);
    if (e.itemData.text === "View Details") {
      if (
        rowData.status === "none" &&
        rowData.state === "Rejected" &&
        rowData.AddedBy === "Company"
      ) {
        navigate("/Visitors/Edit-Visitor-Details");
      } else {
        navigate("/Visitors/Details-of-Visitor");
      }
    }
  };

  const actionTemplate = (cellData) => {
    const actionMenuItems = [
      {
        text: "Check Out",
      },
      {
        text: "View Details",
      },
    ];

    const sanitizedClassName = `actionbtn-${sanitizeClassName(
      cellData.data.ID
    )}`;

    return (
      <>
        <div className="actionDetails">
          <Button stylingMode="outlined" className={sanitizedClassName}>
            <MoreHorizOutlinedIcon />
          </Button>
        </div>
        <ContextMenu
          items={actionMenuItems}
          target={`.${sanitizedClassName}`}
          showEvent={"dxclick"}
          cssClass={"actionMenu"}
          onItemClick={(e) => handleMenuClick(e, cellData.data)}
        />
      </>
    );
  };

  return (
    <>
      <div className="content-block">
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="Add Visitors" />
          </div>
          <div className="title-section-btn">
            <Button
              text="Export to Excel"
              stylingMode="outlined"
              width="auto"
              height={44}
            />
            <Button
              text="Manual Entry"
              width={140}
              height={44}
              className="button-with-margin"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      <Breadcrumbs />
      <div className="content-block dx-card">
        <DataGrid
          dataSource={customers}
          showBorders={false}
          selection={{
            mode: "multiple",
          }}
          className="data-grid"
          hoverStateEnabled={true}
          columnAutoWidth={true}
          ref={(ref) => {
            dataGrid = ref;
          }}
        >
          <SearchPanel
            visible={true}
            width={300}
            height={44}
            placeholder="Search visitors"
          />
          <Paging defaultPageSize={10} />
          <Pager
            visible={true}
            displayMode="compact"
            showNavigationButtons={true}
          />
          <Column dataField="ID" visible={false} />
          <Column dataField="VisitorName" />
          {/* <Column type="buttons" cellRender={actionTemplate}>
            <ColumnButton
              onClick={(cellData) => handlePopupIconClick(cellData)}
            >
              <MoreHorizOutlinedIcon />
            </ColumnButton>
          </Column> */}
          <Column cellRender={actionTemplate} allowSorting={false} />
          <Column
            alignment={"center"}
            // width={150}
            dataField={"status"}
            caption={"Status"}
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
          <Column dataField="companyName" />
          <Column
            alignment={"center"}
            // width={150}
            dataField={"state"}
            caption={"State"}
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

          <Column dataField="AddedBy" />
          <Toolbar className="toolbar-item">
            <Item location="before">
              <div className="informer">
                <SubText text={`In total, you have 110 visitors`} />
              </div>
            </Item>
            <Item name="searchPanel" />
            <Item location="after">
              <SelectBox
                // width={116}
                // height={44}
                valueExpr="value"
                displayExpr="text"
                stylingMode="outlined"
                className="left-textbox"
                placeholder="Check In"
              />
            </Item>
            <Item location="after">
              <SelectBox
                // width={166}
                // height={44}
                valueExpr="value"
                displayExpr="text"
                stylingMode="outlined"
                placeholder="Pending Visitors"
              />
            </Item>
          </Toolbar>
        </DataGrid>
      </div>
    </>
  );
};

export default VisitorMain;
