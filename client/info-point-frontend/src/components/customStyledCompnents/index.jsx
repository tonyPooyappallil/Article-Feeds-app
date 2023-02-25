import styled from "styled-components";

export const MyInput = styled.input`
  width: ${(props) => (props.isMobile ? "180px" : "280px")};
  border: 1px solid #0a4e9221;
  border-radius: 2px;
  font-size: 16px;
  :focus {
    outline-style: outset;
    outline-color: grey;
  }
`;

export const MyButton = styled.button`
  font-weight: 800;
  font-size: 16px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  padding: 8px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

export const FlexRowJustifyCenterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: ${(props) => (props.isMobile ? "80%" : "75%")};
  margin: auto;
  div {
    width: ${(props) => (props.isMobile ? "140px" : "160px")};
    text-align: left;
  }
`;
