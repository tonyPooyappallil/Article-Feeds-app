import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-date-picker";
import Preferences from "../signup/Preferences";
import { isEmpty } from "lodash";
import { useIsMobile, userUpdate } from "../../utilities";
import {
  MainContainer,
  MyButton,
  MyInput,
  SubmitButton,
} from "../customStyledCompnents";
import styled from "styled-components";

const Settings = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const localUser = JSON.parse(localStorage.getItem("user"));
  if (!localUser) {
    navigate("/");
  }

  const [user, setUser] = useState(localUser);
  const [editToggle, setEditToggle] = useState(false);
  const [category, setCategory] = useState([]);
  const [editedData, setEditedData] = useState({});

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

    const stateUpdater = {};
    user.interests.forEach((id) => {
      stateUpdater[id] = 1;
    });
    setEditedData((curr) => {
      return { ...curr, category: { ...curr.category, ...stateUpdater } };
    });
  }, []);

  const catSelected = (id) => {
    if (editedData?.category && editedData.category[id]) {
      let data = { ...editedData.category };
      delete data[id];
      setEditedData((curr) => {
        return { ...curr, category: { ...data } };
      });
      return;
    }

    setEditedData((curr) => {
      return { ...curr, category: { ...(editedData.category || {}), [id]: 1 } };
    });
  };

  const onEditSubmit = async () => {
    const valuesList = Object.values(editedData);
    if (!valuesList.some((value) => !!value && !isEmpty(value))) {
      alert("No updates");
      return;
    }

    //process category selections
    const finalCategoryList = Object.keys(editedData.category);
    if (!finalCategoryList.length) {
      alert("You have to select atleast 1 interested category");
      return;
    }
    if (editedData.password !== editedData.confirmedPassword) {
      alert("Passwords not matching");
      return;
    }

    let dataToSubmit = { ...editedData, interests: finalCategoryList };
    console.log("dataToSubmit.dateOfBirth", dataToSubmit.dateOfBirth);

    Object.keys(dataToSubmit).forEach((key) => {
      if (isEmpty(dataToSubmit[key]) && !dataToSubmit[key]) {
        delete dataToSubmit[key];
      }
    });
    console.log("user", user);
    const data = await userUpdate(user.id, dataToSubmit);
    console.log("data", data);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    setEditToggle(false);
  };

  return (
    <MainContainer>
      <h2> Personal Details</h2>
      <EditContainer>
        <MyButton
          backgroundColor={editToggle ? "#00a41e" : "#2d78fa"}
          color="white"
          onClick={() => setEditToggle((value) => !value)}
        >
          Edit
        </MyButton>
      </EditContainer>

      <DetailContainer>
        <div>First Name </div>

        {editToggle ? (
          <div>
            <MyInput
              isMobile={isMobile}
              value={editedData.firstName}
              onChange={(e) => {
                setEditedData((data) => {
                  return { ...data, firstName: e.target.value.trim() };
                });
              }}
              type="text"
            />
          </div>
        ) : (
          <div> : {user.firstName} </div>
        )}
      </DetailContainer>
      <DetailContainer>
        <div>Last Name </div>
        {editToggle ? (
          <div>
            <MyInput
              isMobile={isMobile}
              value={editedData.lastName}
              type="text"
              onChange={(e) => {
                setEditedData((data) => {
                  return { ...data, lastName: e.target.value.trim() };
                });
              }}
            />
          </div>
        ) : (
          <div> : {user.lastName} </div>
        )}
      </DetailContainer>
      <DetailContainer>
        <div>Email </div>
        {editToggle ? (
          <div>
            <MyInput
              isMobile={isMobile}
              value={editedData.email}
              type="text"
              onChange={(e) => {
                setEditedData((data) => {
                  return { ...data, email: e.target.value.trim() };
                });
              }}
            />
          </div>
        ) : (
          <div> : {user.email} </div>
        )}
      </DetailContainer>
      <DetailContainer>
        <div>Mobile Number </div>
        {editToggle ? (
          <div>
            <MyInput
              isMobile={isMobile}
              value={editedData.mobileNum}
              type="text"
              onChange={(e) => {
                setEditedData((data) => {
                  return { ...data, mobileNum: e.target.value.trim() };
                });
              }}
            />
          </div>
        ) : (
          <div> : {user.mobileNum} </div>
        )}
      </DetailContainer>
      <DatePickerContainer>
        <span>Date of Birth </span>

        {editToggle ? (
          <DatePicker
            format="dd-MM-y"
            value={editedData.dateOfBirth}
            onChange={(date) => {
              setEditedData((data) => {
                return { ...data, dateOfBirth: date };
              });
            }}
          />
        ) : (
          <span> : {moment(user.dateOfBirth).format("DD/MM/YY")} </span>
        )}
      </DatePickerContainer>
      {editToggle && (
        <div>
          <div style={{ "font-weight": "500" }}>Interested Categories</div>
          <Preferences
            category={category}
            catSelected={catSelected}
            selectedCategory={Object.keys(editedData.category || {})}
          ></Preferences>
        </div>
      )}
      {editToggle && (
        <div>
          {" "}
          <DetailContainer>
            <div>Password </div>
            <div>
              <MyInput
                isMobile={isMobile}
                value={editedData.password}
                type="password"
                onChange={(e) => {
                  setEditedData((data) => {
                    return { ...data, password: e.target.value.trim() };
                  });
                }}
              />
            </div>
          </DetailContainer>
          <DetailContainer>
            <div>Confirm Password</div>
            <div>
              <MyInput
                isMobile={isMobile}
                type="password"
                value={editedData.confirmedPassword}
                onChange={(e) => {
                  setEditedData((data) => {
                    return {
                      ...data,
                      confirmedPassword: e.target.value.trim(),
                    };
                  });
                }}
              />
            </div>
          </DetailContainer>
        </div>
      )}
      {editToggle && (
        <div>
          <SubmitButton
            onClick={() => {
              onEditSubmit();
            }}
          >
            Submit
          </SubmitButton>
        </div>
      )}
    </MainContainer>
  );
};

export default Settings;

const DetailContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: center;

  div {
    padding: 9px;
    border-radius: 12px;
  }

  /* * button {
    margin: 5px;
  } */
`;
// width: ${(props) => (props.isMobile ? "80%" : "75%")};
// margin: auto;
// div {
//   width: ${(props) => (props.isMobile ? "140px" : "160px")};
//   text-align: left;
// }

const DatePickerContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 500;
  > :nth-child(1) {
    padding: 15px;
  }
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
`;
