import React, { useState, useEffect, useCallback } from "react";
import Breadcrumbs from "../../components/breadcrumbs/BreadCrumbs";
import {
  HeaderText,
  SubText,
} from "../../components/typographyText/TypograghyText";
import "./verify-visitor.scss";
import SearchBox from "./search-box";
import VisitorCard from "./visitor-card/visitor-card";
import { visitors } from "./visitor-card/visitorData";
import { getVisiotrCompanyWise } from "../../api/visitorApi";
import { toastDisplayer } from "../../components/toastDisplayer/toastdisplayer";
import CustomLoader from "../../components/customerloader/CustomLoader";
import { LoadPanel } from "devextreme-react";

const VerifyVisitorMain = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredVisitors, setFilteredVisitors] = useState(visitors);
  const [visitorDataState, setVisitorDataState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const lowerCaseSearchText = searchText ? searchText.toLowerCase() : "";
    const filteredData = visitors.filter((visitor) =>
      visitor.VisitorName.toLowerCase().includes(lowerCaseSearchText)
    );
    setFilteredVisitors(filteredData);
  }, [searchText]);

  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (index) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    console.log("This is my State : ", visitorDataState);
  }, [visitorDataState]);

  const getAllVisitor = async () => {
    setIsLoading(true);
    const details = JSON.parse(sessionStorage.getItem("authState"));
    const { user } = details;
    console.log("user data : ", details);
    const company_id = user.cmpid;

    const visitorData = await getVisiotrCompanyWise(company_id);
    if (visitorData.hasError === true) {
      console.log();
      setIsLoading(false);
      return toastDisplayer("error", `${visitorData.error}`);
    }
    console.log("my data : ", visitorData);
    const data = visitorData.responseData;
    const filteredData = data.filter((entry) => entry.state === "Pending");
    setIsLoading(false);
    setVisitorCount(filteredData.length);
    return setVisitorDataState(filteredData);
  };

  useEffect(() => {
    getAllVisitor();
  }, []); // The empty array ensures this runs only once

  return (
    <>
      {isLoading && (
        <div className="Myloader">
          <CustomLoader />
        </div>
      )}
      <div className="content-block">
        <div className="navigation-header-main">
          <div className="title-section">
            <HeaderText text="Add Visitors" />
          </div>
        </div>
      </div>
      <Breadcrumbs />
      <div
        className="content-block dx-card"
        style={{ backgroundColor: "#FDFDFD" }}
      >
        <div
          className="navigation-header-main"
          style={{ marginBottom: "24px" }}
        >
          <div className="title-section">
            <SubText text={`In total, you have ${visitorCount} visitors`} />
          </div>
          <div className="title-section-btn">
            <SearchBox searchText={searchText} setSearchText={setSearchText} />
          </div>
        </div>
        <div className="visitor-cards-container">
          {/* {isLoading && <LoadPanel visible={true} />} */}

          {visitorDataState.map((visitor, index) => (
            <VisitorCard
              key={index}
              visitor={visitor}
              isExpanded={expandedCards[index]}
              onToggleExpand={() => toggleExpand(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default VerifyVisitorMain;
