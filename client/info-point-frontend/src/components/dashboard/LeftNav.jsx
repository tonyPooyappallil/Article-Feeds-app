import React from "react";
import { useNavigate } from "react-router-dom";

const LeftNav = () => {
  const navigate = useNavigate();

  return (
    <div>
      LeftNav
      <div
        onClick={() => {
          navigate("/settings");
        }}
      >
        Settings
      </div>
    </div>
  );
};

export default LeftNav;
