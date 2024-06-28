import React, { useEffect, useState } from "react";
import HeaderTab from "../../components/HeaderTab/HeaderTab";
import "./notification.scss";
import { useWebSocket } from "../../contexts/websocket";
import { useAuth } from "../../contexts/auth";
import { SelectBox } from "devextreme-react";
import NotificationItem from "./NotificationItem";
import { getAllNotification, updateNotificationStatus } from "../../api/common";
import { useRecoilState } from "recoil";
import { notificationAtom } from "../../contexts/atom";
import { HeaderText } from "../../components/typographyText/TypograghyText";

const Notification = () => {
  const [activePage, setActivePage] = useState();

  const [notificationAtomState, setNotificationAtomState] =
    useRecoilState(notificationAtom);

  const [notificationCnt, setNotificationCnt] = useState(0);
  useEffect(() => {
    if (notificationAtom) {
      // console.log("notificationAtomState : ", notificationAtomState);
      // setNotificationCnt(notificationAtomState.length);
    }
  }, [notificationAtomState]);

  const HeaderTabText = ["Notification", "Profile", "General Settings"];
  // const HeaderTabText = [
  //   `Notification ${notificationCnt}`,
  //   "Profile",
  //   "General Settings",
  // ];

  const { send, eventEmitter } = useWebSocket();
  const [notificationData, setNotificationData] = useState([]);
  const [notificationAllData, setNotificationAllData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("R");
  const { user } = useAuth();
  // const [notificationData, setNotificationData] =
  //   useRecoilState(notificationAtom);

  useEffect(() => {
    if (notificationAtom && notificationAtomState) {
      if (notificationAtomState) {
        setNotificationData(notificationAtomState);
      }
      // console.log("notificationAtomState : ",notificationAtomState)
    }
  }, [notificationAtomState]);

  useEffect(() => {
    // eventEmitter.on('notifications', (data) => {
    //     setNotificationData(data.notification);
    // });
    eventEmitter.on("notification", (data) => {
      setNotificationData((prevData) => {
        const isDuplicate = prevData.some(
          (item) => item.transid === data.notification.transid
        );
        if (!isDuplicate) {
          return [data.notification, ...prevData];
        }
        return prevData;
      });
    });
    send({ type: "send_notifications", usrid: user ? user.transid : 0 });

    return () => {
      eventEmitter.off("notifications");
    };
  }, [send, eventEmitter]);

  useEffect(() => {
    const getData = async () => {
      if (selectedTab == "A") {
        const apiResponse = await getAllNotification(user.e_mail, user.cmpid);
        if (!apiResponse.hasError) {
          setNotificationAllData(apiResponse.responseData.notifications);
        }
      }
    };
    getData();
  }, [selectedTab]);

  const Source = [
    { value: "R", text: "Recent" },
    { value: "A", text: "ALL" },
  ];

  const updateChkStatus = async (id) => {
    const apiResponse = await updateNotificationStatus(
      id,
      user.e_mail,
      user.cmpid
    );
    if (!apiResponse.hasError) {
      const updatedData = notificationData.map((item) => {
        if (item.transid === id) {
          return { ...item, chk_status: "A" };
        }
        return item;
      });
      setNotificationData(updatedData);
    }
  };
  const handleInputChange = (value) => {
    setSelectedTab(value);
  };
  return (
    <div className="notification">
      <HeaderTab
        HeaderTabText={HeaderTabText}
        HeaderText={activePage}
        setActivePage={setActivePage}
        NotificationCnt={notificationCnt}
      />
      <div className="content-block dx-card">
        <div className="header-container">
          <HeaderText text="Notification" />
          <SelectBox
            labelMode="outside"
            width={125}
            onValueChanged={(e) => handleInputChange(e.value)}
            value={"R"}
            items={Source}
            valueExpr={"value"}
            displayExpr={"text"}
          ></SelectBox>
        </div>
        <div className="notifydropdown-body">
          {selectedTab === "R"
            ? notificationData.map((values) => (
                <>
                  <NotificationItem
                    key={values.transid}
                    values={values}
                    updateChkStatus={updateChkStatus}
                    // onClickReadMore={handleClickReadMore}
                    // expanded={expandedNotifications[values.n_Id]}
                  />
                </>
              ))
            : notificationAllData.map((values) => (
                <NotificationItem
                  key={values.transid}
                  values={values}
                  updateChkStatus={updateChkStatus}
                  // onClickReadMore={handleClickReadMore}
                  // expanded={expandedNotifications[values.n_Id]}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
