import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import TreeView from "devextreme-react/tree-view";
import { navigation } from "../../app-navigation";
import { useNavigation } from "../../contexts/navigation";
import { useScreenSize } from "../../utils/media-query";
import "./SideNavigationMenu.scss";
import { Autocomplete, Button } from "devextreme-react";
import "remixicon/fonts/remixicon.css";
import * as events from "devextreme/events";
import { useAuth } from "../../contexts/auth";

export default function SideNavigationMenu(props) {
  const { children, selectedItemChanged, openMenu, compactMode, onMenuReady } =
    props;
  const { user, signOut } = useAuth();

  const { isLarge } = useScreenSize();
  function normalizePath() {
    return navigation.map((item) => ({
      ...item,
      expanded: isLarge,
      path: item.path && !/^\//.test(item.path) ? `/${item.path}` : item.path,
    }));
  }

  const items = useMemo(
    normalizePath,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    navigationData: { currentPath },
  } = useNavigation();

  const treeViewRef = useRef(null);
  const wrapperRef = useRef();
  const getWrapperRef = useCallback(
    (element) => {
      const prevElement = wrapperRef.current;
      if (prevElement) {
        events.off(prevElement, "dxclick");
      }

      wrapperRef.current = element;
      events.on(element, "dxclick", (e) => {
        openMenu(e);
      });
    },
    [openMenu]
  );

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance;
    if (!treeView) {
      return;
    }

    if (currentPath !== undefined) {
      treeView.selectItem(currentPath);
      treeView.expandItem(currentPath);
    }

    if (compactMode) {
      treeView.collapseAll();
    }
  }, [currentPath, compactMode]);

  const itemRender = (item) => {
    return (
      <div className="treeview-item-content">
        <i className={`${item.icon} custom-icon`}></i>
        <span className="custom-text">{item.text}</span>
      </div>
    );
  };
  return (
    <div
      className={`dx-swatch-additional side-navigation-menu`}
      ref={getWrapperRef}
    >
      {children}
      {compactMode && (
        <div className="search-icon">
          <i className="ri-search-line"></i>
        </div>
      )}
      {!compactMode && (
        <div className="logout-link" onClick={signOut}>
          <i class="ri-logout-box-line"></i>
          <span>Logout</span>
        </div>
      )}
      {!compactMode && (
        <div className="search-box">
          <i className="ri-search-line"></i>
          <Autocomplete
            placeholder="Search modules"
            stylingMode="outlined"
            // showClearButton={true}
            // displayExpr={(item) => item}
            searchExpr="name"
            // className={"custom-search-box"}
            // value={searchValue}
            // onValueChanged={handleSearchValueChanged}
          />
        </div>
      )}
      <div className={"menu-container"}>
        <TreeView
          ref={treeViewRef}
          items={items}
          keyExpr={"path"}
          selectionMode={"single"}
          focusStateEnabled={false}
          expandEvent={"click"}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          itemRender={itemRender}
          width={"100%"}
        />
      </div>
    </div>
  );
}
