import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useIsMobile } from "../../utilities";
import { useLocation } from "react-router-dom";

const NavBarSectionContainer = styled.div`
  padding: ${(props) => (props.isMobile ? "10px" : "10px")};
  text-align: ${(props) => (props.isMobile ? "center" : "left")};
  padding-left: ${(props) => (props.isMobile ? "" : "58px")};
  padding-right: ${(props) => (props.isMobile ? "" : "0px")};
  cursor: pointer;
  font-size: ${(props) => (props.isMobile ? "16px" : "24px")};
  font-weight: 600;
  background-color: ${(props) => (props.selected ? "#0b0a0a21" : "none")};
  :hover {
    font-size: ${(props) => (props.isMobile ? "17px" : "26px")};
  }
`;
const NavContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "row" : "column")};
  justify-content: ${(props) => (props.isMobile ? "space-around" : "")};
`;
const LeftNav = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  return (
    <NavContainer isMobile={isMobile}>
      <NavBarSectionContainer
        isMobile={isMobile}
        selected={location.pathname.includes("create-new-article")}
        onClick={() => {
          navigate("create-new-article");
        }}
      >
        Post New Article
      </NavBarSectionContainer>
      <NavBarSectionContainer
        isMobile={isMobile}
        selected={location.pathname.includes("article-list-page")}
        onClick={() => {
          navigate("article-list-page");
        }}
      >
        My Articles
      </NavBarSectionContainer>
      <NavBarSectionContainer
        isMobile={isMobile}
        selected={location.pathname.includes("settings")}
        onClick={() => {
          navigate("settings");
        }}
      >
        Settings
      </NavBarSectionContainer>
    </NavContainer>
  );
};

export default LeftNav;
