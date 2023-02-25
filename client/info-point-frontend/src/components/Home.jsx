import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Preferences from "./signup/Preferences";
import { useNavigate } from "react-router-dom";
import { AppContext, UserContext } from "../context";
import { useIsMobile } from "../utilities";
import styled from "styled-components";
import {
  FlexRowJustifyCenterDiv,
  MyButton,
  MyInput,
} from "./customStyledCompnents";
import "../datePickerCss/index.css";

const Home = () => {
  const navigate = useNavigate();
  const localUSer = JSON.parse(localStorage.getItem("user"));
  if (localUSer) {
    navigate("/dashboard");
  }

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [dob, setDob] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [userData, setUserData] = useState({});
  const { loggedIn, setLogin } = useContext(AppContext);
  const { user, setUserContext } = useContext(UserContext);
  const isMobile = useIsMobile();
  const loginSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("https://busy-plum-bee-cuff.cyclic.app/user/login", {
        id,
        password,
      })
      .then(function (response) {
        setUserData(response.data);
        setLogin(true);
        localStorage.setItem("user", JSON.stringify(response.data));
        setUserContext(response.data);
        navigate("/dashboard", {
          state: { user: { ...response.data }, category: category },
        });
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "Uh oh, the data you provided is incorrect. If you dont have an account yet, please Sign up"
        );
      });
  };

  useEffect(() => {
    const dataFetch = async () => {
      axios
        .get("https://busy-plum-bee-cuff.cyclic.app/category")
        .then(function (data) {
          setCategory(data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    dataFetch();
  }, []);

  const signUpSubmit = async (e) => {
    e.preventDefault();

    if (passwordMismatch) return;

    if (!id) {
      alert("Email is Mandatory");
      return;
    }

    if (!mobile) {
      alert("Mobile is Mandatory");
      return;
    }

    if (!password) {
      alert("Password Cannot be Empty");
      return;
    }

    if (confirmedPassword !== password) {
      setPasswordMismatch(true);
      return;
    }

    //process category selections

    const finalCategoryList = Object.keys(selectedCategory);
    if (!finalCategoryList.length) {
      alert("You have to select atleast 1 interested category");
      return;
    }

    // creating the user
    axios
      .post("https://busy-plum-bee-cuff.cyclic.app/user", {
        firstName,
        lastName,
        dateOfBirth: dob,
        email: id,
        mobileNum: mobile,
        password,
        interests: finalCategoryList,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setId("");
    setPassword("");
    setNewUser(false);
  };

  const catSelected = (id) => {
    if (selectedCategory[id]) {
      let data = { ...selectedCategory };
      delete data[id];
      setSelectedCategory({ ...data });
      return;
    }

    setSelectedCategory((prevState) => {
      return { ...prevState, ...{ [id]: 1 } };
    });
  };

  return (
    <MainContainer>
      <LogoContainer isMobile={isMobile}>
        <img
          src="https://www.infopoint.de//flash/images/logo/logo.png"
          alt=""
        />
      </LogoContainer>

      {!newUser ? (
        <LoginContainer>
          <h2>Login</h2>
          <form onSubmit={(e) => loginSubmit(e)}>
            <LoginFormDataContainer isMobile={isMobile}>
              <div>
                <div>
                  <label>Email / Mobile</label>
                </div>
                <div>
                  <label>Password</label>
                </div>
              </div>
              <div>
                <div>
                  <MyInput
                    isMobile={isMobile}
                    type="text"
                    name="name"
                    value={id}
                    onChange={({ target: { value } }) => setId(value)}
                  />
                </div>
                <div>
                  <MyInput
                    isMobile={isMobile}
                    type="password"
                    name="name"
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                  />{" "}
                </div>
              </div>
            </LoginFormDataContainer>
            <div>
              <SubmitInput type="submit" value="LOGIN" />
            </div>
          </form>
        </LoginContainer>
      ) : (
        <LoginContainer>
          <h2>Sign Up</h2>
          <form
            onSubmit={(e) => {
              signUpSubmit(e);
            }}
          >
            <SignUpContainer isMobile={isMobile}>
              <FlexRowJustifyCenterDiv isMobile={isMobile}>
                <div>
                  {" "}
                  <label>First Name</label>
                </div>
                <div>
                  <MyInput
                    isMobile={isMobile}
                    type="text"
                    name="name"
                    value={firstName}
                    onChange={({ target: { value } }) => setFirstName(value)}
                  />
                </div>
              </FlexRowJustifyCenterDiv>
              <FlexRowJustifyCenterDiv isMobile={isMobile}>
                <div>
                  {" "}
                  <label>Last Name</label>{" "}
                </div>
                <div>
                  <MyInput
                    isMobile={isMobile}
                    type="text"
                    name="name"
                    value={lastName}
                    onChange={({ target: { value } }) => setLastName(value)}
                  />
                </div>
              </FlexRowJustifyCenterDiv>
              <FlexRowJustifyCenterDiv isMobile={isMobile}>
                <div>
                  <label>Email</label>
                </div>
                <div>
                  <MyInput
                    isMobile={isMobile}
                    type="text"
                    name="name"
                    value={id}
                    onChange={({ target: { value } }) => setId(value)}
                  />
                </div>
              </FlexRowJustifyCenterDiv>
              <FlexRowJustifyCenterDiv isMobile={isMobile}>
                <div>
                  {" "}
                  <label>Mobile Number</label>
                </div>
                <div>
                  <MyInput
                    isMobile={isMobile}
                    type="text"
                    name="name"
                    value={mobile}
                    onChange={({ target: { value } }) => setMobile(value)}
                  />
                </div>
              </FlexRowJustifyCenterDiv>
              <DatePickerContainer isMobile={isMobile}>
                <div>
                  <label>Date Of Birth</label>{" "}
                </div>{" "}
                <div>
                  <DatePicker
                    format="dd-MM-y"
                    value={dob}
                    onChange={(date) => setDob(date)}
                  />
                </div>
              </DatePickerContainer>
              <FlexRowJustifyCenterDiv isMobile={isMobile}>
                <div>
                  {" "}
                  <label>Password</label>
                </div>{" "}
                <div>
                  {" "}
                  <MyInput
                    isMobile={isMobile}
                    type="password"
                    name="name"
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                  />
                </div>
              </FlexRowJustifyCenterDiv>
              <FlexRowJustifyCenterDiv isMobile={isMobile}>
                <div>
                  {" "}
                  <label>Confirm Password</label>
                </div>{" "}
                <div>
                  {" "}
                  <MyInput
                    isMobile={isMobile}
                    type="password"
                    name="name"
                    value={confirmedPassword}
                    onChange={({ target: { value } }) => {
                      if (value !== password) {
                        setPasswordMismatch(true);
                      } else {
                        setPasswordMismatch(false);
                      }
                      setConfirmedPassword(value);
                    }}
                  />
                  {passwordMismatch && <div>Passwords mismatch!</div>}
                </div>
              </FlexRowJustifyCenterDiv>
            </SignUpContainer>

            <Preferences
              category={category}
              catSelected={catSelected}
              selectedCategory={Object.keys(selectedCategory)}
            />
            <SubmitInput type="submit" value="Submit" />
          </form>
        </LoginContainer>
      )}

      {!newUser && (
        <NewUserQuesContainer>
          <span>New User? </span>{" "}
          <MyButton
            color="white"
            backgroundColor="#1166f9"
            onClick={() => {
              setId("");
              setPassword("");
              setNewUser(true);
            }}
          >
            Sign Up
          </MyButton>
        </NewUserQuesContainer>
      )}
    </MainContainer>
  );
};

export default Home;

const MainContainer = styled.div`
  width: 95%;
  margin: auto;
`;

const LogoContainer = styled.div`
  width: ${(props) => (props.isMobile ? "80%" : "50%")};
  padding-top: 40px;
  margin: auto;
  margin-bottom: 20px;
  img {
    width: 100%;
    color: white;
    background-color: white;
    padding: 10px;
    border-radius: ${(props) => (props.isMobile ? "15px" : "20px")};
    margin: auto;
  }
`;

const LoginContainer = styled.div`
  background-color: #1e4483;
  color: white;
  padding: 18px;
  border-radius: 10px;
  border: 2px solid #285192;
  h2 {
    font-size: 40px;
  }
  label {
    font-weight: 600;
  }
`;

const LoginFormDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 18px;
  div {
    padding: ${(props) => (props.isMobile ? "2px" : "12px")};
    padding-bottom: 15px;
  }
`;
const SubmitInput = styled.input`
  font-weight: 800;
  font-size: 16px;
  background-color: #4d8fff;
  color: white;
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const NewUserQuesContainer = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 600;
  padding-top: 20px;
  span {
    padding-right: 15px;
  }
`;
const SignUpContainer = styled.div`
  div {
    font-size: ${(props) => (props.isMobile ? "16px" : "18px")};
    font-weight: 600;
    padding: ${(props) => (props.isMobile ? "3px" : "3px")};
    /* padding-bottom: 0px; */
  }
`;
const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: left;
  div:nth-of-type(1) {
    margin-left: 5px;
    margin-right: ${(props) => (props.isMobile ? "0px" : "28px")};
  }
  div:nth-of-type(2) {
    width: ${(props) => (props.isMobile ? "" : "177px")};
    /* margin-left: 50px; */
  }
`;
