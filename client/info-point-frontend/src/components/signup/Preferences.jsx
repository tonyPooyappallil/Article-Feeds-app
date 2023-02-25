import React from "react";

import styled from "styled-components";

const CategoryButton = styled.div`
  background-color: ${(props) => (props.selected ? "#619bff" : "#B4B4B4")};
  color: ${(props) => (props.selected ? "white" : "black")};
  display: inline-block;
  margin: 10px;
  padding: 8px;
  border: ${(props) =>
    props.selected ? "2px solid black" : "2px solid #B4B4B4"};
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const Preferences = ({ category = [], catSelected, selectedCategory = [] }) => {
  return (
    <div>
      {category.map((item) => {
        return (
          <CategoryButton
            selected={selectedCategory.includes(item._id)}
            onClick={() => catSelected(item._id)}
          >
            {" "}
            {item.categoryName}
          </CategoryButton>
        );
      })}{" "}
    </div>
  );
};

export default Preferences;
