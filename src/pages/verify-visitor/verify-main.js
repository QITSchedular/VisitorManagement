import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/breadcrumbs/BreadCrumbs";
import {
  HeaderText,
  SubText,
} from "../../components/typographyText/TypograghyText";
import "./verify-visitor.scss";
import SearchBox from "./search-box";
import VisitorCard from "./visitor-card/visitor-card";
import { visitors } from "./visitor-card/visitorData";

const VerifyVisitorMain = () => {
  const [searchText, setSearchText] = useState("");
  const formatItemName = (name) => {
    if (!searchText || searchText.trim() === "") {
      return name;
    }
    const lowerCaseSearchText = searchText.toLowerCase();
    let highlightedName = name;
    const regex = new RegExp(lowerCaseSearchText, "gi");
    highlightedName = highlightedName.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );
    return highlightedName;
  };
  useEffect(() => {
    formatItemName(searchText);
  }, [searchText]);

  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (index) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
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
            <SubText text={`In total, you have 110 visitors`} />
          </div>
          <div className="title-section-btn">
            <SearchBox searchText={searchText} setSearchText={setSearchText} />
          </div>
        </div>
        <div className="visitor-cards-container">
          {visitors.map((visitor, index) => (
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
