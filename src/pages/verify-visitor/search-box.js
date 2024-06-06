import React from "react";
import { TextBox } from "devextreme-react";

const SearchBox = ({ searchText, setSearchText }) => {
  const handleSearchChange = (e) => {
    setSearchText(e.value ? e.value.toLowerCase() : "");
  };

  return (
    <div className="search-section">
      <div className="box" title={"Search"}>
        <i className="ri-search-line"></i>
        <TextBox
          stylingMode="outlined"
          placeholder="Search Visitors"
          onValueChanged={handleSearchChange}
          width={300}
          displayExpr={(item) => item}
          searchExpr="name"
          showClearButton={true}
          valueChangeEvent="keyup"
        />
      </div>
    </div>
  );
};

export default SearchBox;
