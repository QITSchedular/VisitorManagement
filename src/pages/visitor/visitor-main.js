import React, { useEffect, useRef, useState } from "react";
import {
  HeaderText,
  SubText,
} from "../../components/typographyText/TypograghyText";
import {
  SelectBox,
  Button,
  Popup,
  ContextMenu,
  LoadPanel,
} from "devextreme-react";
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
import { CleaningServices } from "@mui/icons-material";
import SendVerification from "../../components/popups/send-verification";
import { toastDisplayer } from "../../components/toastDisplayer/toastdisplayer";
import { checkOutVisitorApi } from "../../api/mobileVisitorApi";

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
  // let dataGrid;
  const [clickedRowData, setClickedRowData] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [status, setStatus] = useRecoilState(statusAtom);
  const [state, setState] = useRecoilState(stateAtom);
  const [addedby, setAddedby] = useRecoilState(addedByAtom);
  const [checkOutRowData  , setCheckOutRowData ]= useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { send, eventEmitter } = useWebSocket();
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterState, setFilterState] = useState("All");
  const dataGrid = useRef(null);
  // ------------------ filter according to state ----------------//
  const allVisitorsState = [
    { value: "All", text: "All Visitors" },
    { value: "Pending", text: "Pending Visitors" },
    { value: "Approved", text: "Approved Visitors" },
    { value: "Rejected", text: "Rejected Visitors" },
  ];

  const handleFilterChange = (newStatus) => {
    setFilterStatus(newStatus);
    const filterValue = newStatus === "All" ? undefined : newStatus;
    if (dataGrid.current && dataGrid.current.instance) {
      dataGrid.current.instance.columnOption(
        "state",
        "filterValue",
        filterValue,
      );
      dataGrid.current.instance.refresh();
    }
  };

  const allCheckinVisitor = [
    { value: "All", text: "All Visitors" },
    { value: "Check in", text: "Check in" },
    { value: "Check Out", text: "Check Out" },
  ];

  const handleFilterState = (newStatus) => {
    setFilterState(newStatus);
    const filterValue = newStatus === "All" ? undefined : newStatus;

    if (dataGrid.current && dataGrid.current.instance) {
      dataGrid.current.instance.columnOption(
        "status",
        "filterValue",
        filterValue,
      );
      dataGrid.current.instance.refresh();
    }
  };

  const handleCheckoutFunction =()=>{
    
  }
  useEffect(() => {
    const onVisitors = (data) => {
      setLoading(true);
      setVisitors(data.visitors);
      setLoading(false);
    };

    const onNewVisitor = (data) => {
      setVisitors((prevVisitors) => {
        if (
          !prevVisitors.some(
            (existingVisitor) => existingVisitor.id === data.visitor.id,
          )
        ) {
          return [data.visitor, ...prevVisitors];
        }
        return prevVisitors;
      });
    };

    const onUpdateVisitor = (data) => {
      setVisitors((prevVisitors) =>
        prevVisitors.map((visitor) =>
          visitor.id === data.visitor.transid
            ? {
                ...visitor,
                state:
                  data.visitor.status === "R"
                    ? "Rejected"
                    : data.visitor.status === "A"
                    ? "Approved"
                    : "",
                reason: data.visitor.reason,
              }
            : visitor,
        ),
      );
    };

    eventEmitter.on("visitors", onVisitors);
    eventEmitter.on("new_visitor", onNewVisitor);
    eventEmitter.on("update_visitor", onUpdateVisitor);

    send({ type: "send_visitors", cmpid: user ? user.cmpid : 0 });

    return () => {
      eventEmitter.off("visitors", onVisitors);
      eventEmitter.off("new_visitor", onNewVisitor);
      eventEmitter.off("update_visitor", onUpdateVisitor);
    };
  }, [send, eventEmitter, user]);

  var selectedRowData = "";
  const onCloneIconClick = (e) => {
    selectedRowData = e.data;
  };
  const actionTemplate = (cellData, e) => {

    console.log(cellData.data)
    
    const actionMenuItems = [
      {
        text: "Check Out",
        onClick: () => {
          handleOpenPopup();
        },
      },
      {
        text: "View Details",
        onClick: () => {
          navigate(`/Visitors/Details-of-Visitor?visitorId=${selectedRowData.id}`)
        },
      },
    ];

    const sanitizedClassName = `actionbtn-${sanitizeClassName(
      cellData.data.ID,
    )}`;
    

    const actionMenuMode = "context1";

    // const handleMenuClick = (e) => {
    //   if (e.itemData.text === "View Details") {
    //     console.log("View Details clicked for row: ", cellData.data);
    //     // Navigate to the appropriate page
    //     if (
    //       cellData.data.status === "none" &&
    //       cellData.data.state === "Rejected" &&
    //       cellData.data.AddedBy === "Company"
    //     ) {
    //       navigate("/Visitors/Edit-Visitor-Details");
    //     } else {
    //       navigate("/Visitors/Details-of-Visitor");
    //     }
    //   } else if (e.itemData.text === "Check Out") {
    //     console.log("Check Out clicked for row: ", cellData.data);
    //     // Handle check out logic here
    //   }
    // };

    
    return (
      <>
        <div className="actionDetails">
          <Button
            stylingMode="outlined"
            className={sanitizedClassName}
            onClick={() => onCloneIconClick(cellData)}
          >
            <MoreHorizOutlinedIcon />
          </Button>
        </div>
        <ContextMenu
          items={actionMenuItems}
          target={`.${sanitizedClassName}`}
          showEvent={"dxclick"}
          cssClass={"actionMenu"}
          //onItemClick={handleMenuClick}
        />
      </>
    );
  };

  const handleOpenPopup = () => {
    setCheckOutRowData(selectedRowData);
    setIsPopupVisible(true);
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const handleCheckOut = async () => {
    console.log("selected" ,checkOutRowData)
    const authState = JSON.parse(sessionStorage.getItem("authState"));


    const cmpid = authState.user.cmpid;

    const payload = {
      e_mail: checkOutRowData.vEmail,
      company_id: cmpid,
    };
    //console.log("Payload : " , payload)
   // return null
    const checkOutVisitor = await checkOutVisitorApi(payload);
    if (checkOutVisitor.hasError === true) {
      return toastDisplayer("error", `${checkOutVisitor.error}`);
    }

    setIsPopupVisible(false);
    return toastDisplayer("success", "Visitor checked Out Successfully");
  };
  return (
    <>
      {loading ? <LoadPanel visible={true} /> : ""}
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
          ref={dataGrid}
          
          // ref={(ref) => {
          //   dataGrid = ref;
          // }}
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
          <Column dataField="vName" caption="Visitor name" />
          {/* <Column type="buttons" cellRender={actionTemplate}>
            <ColumnButton
              onClick={(cellData) => handlePopupIconClick(cellData)}
            >
              <MoreHorizOutlinedIcon />
            </ColumnButton>
          </Column> */}
          <Column
            dataField="ACTIONS"
            cellRender={actionTemplate}
            caption="ACTIONS"
            allowSorting={false}
            width={"10%"}
            allowSearch={false}
          />
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
          <Column dataField="vCmpname" caption="Company Name" />
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
                <SubText
                  text={`In total, you have ${visitors.length} visitors`}
                />
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
                items={allCheckinVisitor}
                value={filterState}
                onValueChanged={(e) => handleFilterState(e.value)}
              />
            </Item>
            <Item location="after">
              <SelectBox
                // width={166}
                // height={44}
                valueExpr="value"
                displayExpr="text"
                stylingMode="outlined"
                items={allVisitorsState}
                value={filterStatus}
                // placeholder="Pending Visitors"
                onValueChanged={(e) => handleFilterChange(e.value)}
              />
            </Item>
          </Toolbar>
        </DataGrid>
      </div>
      <SendVerification
        header="Checkout Confirmation"
        subHeader="Are you sure you want visitor to checkout? "
        approval="Check Out"
        discard="Cancel"
        saveFunction={handleCheckOut}
        isVisible={isPopupVisible}
        onHide={handleClosePopup}
      />
    </>
    
  );
};

export default VisitorMain;
