import React, { useEffect, useState } from "react";
import DataGrid, {
  Column,
  Paging,
  Scrolling,
  SearchPanel,
  Selection,
  Pager,
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react";
import "./popup.scss";
function HelperPopupPage({
  handleCancel,
  handleSave,
  datagridData,
  keyExpr,
  handleDataGridRowSelection,
  dataGridRef,
  selectedRowKeys,
  title,
  caption,
}) {
  const [dataSource, setDataSource] = useState(null);
  const [selectedRowKeysN, setSelectedRowKeys] = useState([]);
  const [selectedRowKeysNew, setSelectedRowKeysNew] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    const dataGridDataHandler = async () => {
      if (selectedRowKeys.length > 0) {
        setSelectedRowKeysNew([selectedRowKeys[0].userName]);
      }
      setDataSource(datagridData);
      setSelectedRowKeys(selectedRowKeysN);
    };
    dataGridDataHandler();
  }, [datagridData]);

  const handleDataGridRowSelectionTemp = ({ selectedRowKeys }) => {
    setSelectedRowKeysNew(selectedRowKeys);
    handleDataGridRowSelection({ selectedRowKeys });
  };

  return (
    <>
      <div className="popup-main-cointainer search-panel-width">
        <div className="popup-header">
          <div className="release-popup-main">
            <div>
              <div className="conform-popup-header-text">{title}</div>
              <div className="conform-popup-sub-text">{caption}</div>
            </div>
            <div className="close-btn-section">
              <Button icon="close" onClick={handleCancel} />
            </div>
          </div>
        </div>
        {loading ? (
          // <Triangleloader />
          ""
        ) : (
          <div className="popup-data verify-pro-datagrid">
            <DataGrid
              height={window.innerHeight - 250}
              dataSource={dataSource}
              keyExpr={keyExpr}
              showBorders={false}
              columnAutoWidth={true}
              hoverStateEnabled={true}
              onSelectionChanged={handleDataGridRowSelectionTemp}
              ref={dataGridRef}
              selectedRowKeys={selectedRowKeysNew}
            >
              <SearchPanel
                visible={true}
                className={"search-panel"}
              />
              <Selection mode="multiple" allowSelectAll={false} />
              <Scrolling columnRenderingMode="virtual" />
              <Paging defaultPageSize={10} />
              <Pager
                visible={true}
                displayMode="compact"
                showNavigationButtons={true}
              />
              <Column
                alignment={"left"}
                dataField={"username"}
                caption={"USER NAME"}
                allowEditing={false}
              ></Column>
              <Column
                alignment={"left"}
                dataField={"e_mail"}
                caption={"USER EMAIL"}
                allowEditing={false}
              ></Column>
              <Column
                alignment={"left"}
                dataField={"phone"}
                caption={"MOBILE NUMBER"}
                allowEditing={false}
              ></Column>
              <Column
                alignment={"left"}
                dataField={"usertype"}
                caption={"USER ROLE"}
                allowEditing={false}
              ></Column>
            </DataGrid>
          </div>
        )}
        <div
          className="buttons-section"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <Button
            text="Cancel"
            width={144}
            height={44}
            style={{ backGroundColor: "white", border:"2px solid #C6C6C6",borderRadius : "4px" }}
            onClick={handleCancel}
            className="cancelQcBtn"
          />
          <Button
            text="Add"
            type="default"
            width={144}
            height={44}
            onClick={handleSave}
            className="OkQcBtn"
          />
        </div>
        
      </div>
    </>
  );
}

export default HelperPopupPage;
