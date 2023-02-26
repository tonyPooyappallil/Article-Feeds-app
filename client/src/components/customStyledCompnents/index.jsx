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

export const SubmitButton = styled.button`
  font-weight: 800;
  font-size: 16px;
  background-color: #4d8fff;
  color: white;
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  :hover {
    outline: none;
    padding: 11px;
    font-size: 15px;
    background-color: #2d78fa;
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
  :hover {
    padding: 8.5px;
    font-size: 15px;
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

export const ArticleFormContainer = styled.div`
  background-color: #78aaf133;
  padding: 25px;
  border-radius: 20px;
  margin: 20px;
  font-size: 18px;
  font-weight: 600;
`;

export const MainContainer = styled.div`
  padding: 2.5%;
  background-color: #ebebeb;
  margin: 1%;
  border-radius: 10px;
  border: 2px solid #2c5e9c;
  font-weight: 400;
  color: black;
  margin-bottom: 50px;
`;
