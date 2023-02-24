import React from "react";

import styled from "styled-components";

const CategoryButton = styled.div`
  background-color: ${(props) => (props.selected ? "#bdbdbd" : "#ffffff")};
  display: inline-block;
  margin: 10px;
  padding: 6px;
  border: solid 1px black;
  border-radius: 20px;
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
