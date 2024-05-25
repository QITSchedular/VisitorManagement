import React from "react";
import {
  HeaderText,
  SubText,
} from "../../components/typographyText/TypograghyText";
import { Button, SelectBox } from "devextreme-react";
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
  Scrolling,
  LoadPanel,
  SearchPanel,
} from "devextreme-react/data-grid";

const VisitorMain = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Visitors/Add-Visitors");
  };

  return (
    <>
      <div className="content-block">
        <div className="navigation-header">
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
          <Column dataField="VisitorName" />
          <Column dataField="status" />
          <Column dataField="companyName" />
          <Column dataField="State" />
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
                width={116}
                height={44}
                valueExpr="value"
                displayExpr="text"
                stylingMode="outlined"
                className="left-textbox"
                placeholder="Check In"
              />
            </Item>
            <Item location="after">
              <SelectBox
                width={166}
                height={44}
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
