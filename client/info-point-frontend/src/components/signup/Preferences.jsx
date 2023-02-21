import React from "react";

const Preferences = ({ category, catSelected }) => {
  return (
    <div>
      {category.map((item) => {
        return (
          <div onClick={() => catSelected(item._id)}> {item.categoryName}</div>
        );
      })}{" "}
    </div>
  );
};

export default Preferences;
