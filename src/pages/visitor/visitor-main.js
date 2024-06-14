import React, { useEffect, useState } from "react";
import {
  HeaderText,
  SubText,
} from "../../components/typographyText/TypograghyText";
import { SelectBox, Button, Popup, ContextMenu } from "devextreme-react";
import "./visitor-main.scss";
import Breadcrumbs from "../../components/breadcrumbs/BreadCrumbs";
import { useNavigate } from "react-router-dom";
// import { customers } from "./data";
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
import { useWebSocket } from "../../contexts/websocket";
import { useAuth } from "../../contexts/auth";

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
  const [visitors, setVisitors] = useState([]);
  const [status, setStatus] = useRecoilState(statusAtom);
  const [state, setState] = useRecoilState(stateAtom);
  const [addedby, setAddedby] = useRecoilState(addedByAtom);

  const { send, eventEmitter } = useWebSocket();
  const { user } = useAuth();
  useEffect(() => {
    console.log("++++++++++++++++++++++++++++++++++++++++");
    eventEmitter.on("visitors", (data) => {
      console.log("visitors :", data.visitors);
      setVisitors(data.visitors);
    });
    eventEmitter.on("new_visitor", (data) => {
      console.log("visitors :", data.visitor);
      setVisitors((prevVisitors) => {
        if (!prevVisitors.some(existingVisitor => existingVisitor.id === data.visitor.id)) {
            return [data.visitor, ...prevVisitors];
        }
        return prevVisitors;
    });
    });

    eventEmitter.on("update_visitor", (data) => {
      console.log("visitors :", data.visitor);
      setVisitors(prevVisitors =>
        prevVisitors.map(visitor =>
          visitor.id === data.visitor.transid
            ? { ...visitor, state: data.visitor.status=="R" ? "Rejected" : data.visitor.status=="A" ? "Approved" : "" , reason: data.visitor.reason }
            : visitor
        )
      );
      // setVisitors(data.visitors);
    });


    // Send a message to the server to request visitor data
    send({ type: "send_visitors", cmpid: user ? user.cmpid : 0 });

    // Cleanup on unmount
    return () => {
      eventEmitter.off("visitors");
    };
  }, [send, eventEmitter]);

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
          dataSource={visitors}
          // dataSource={customers}
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
          <Column dataField="id" visible={false} />
          <Column dataField="vName" />
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
          <Column dataField="vCmpname" />
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

          <Column dataField="addedBy" />
          <Toolbar className="toolbar-item">
            <Item location="before">
              <div className="informer">
                <SubText text={`In total, you have ${visitors.length} visitors`} />
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
