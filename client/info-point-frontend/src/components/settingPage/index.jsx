import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-date-picker";
import Preferences from "../signup/Preferences";
import { isEmpty } from "lodash";
import { userUpdate } from "../../utilities";

const Settings = () => {
  const navigate = useNavigate();
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
      return { ...curr, category: { ...editedData.category, ...stateUpdater } };
    });
  }, []);

  const catSelected = (id) => {
    console.log("in cat select id", id);
    if (editedData?.category && editedData.category[id]) {
      console.log("inside her");
      let data = { ...editedData.category };
      delete data[id];
      setEditedData((curr) => {
        return { ...curr, category: { ...data } };
      });
      return;
    }

    console.log("here befoew set", id);

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
    Object.keys(dataToSubmit).forEach((key) => {
      if (isEmpty(dataToSubmit[key])) {
        delete dataToSubmit[key];
      }
    });
    console.log("dataToSubmit", dataToSubmit);
    const data = await userUpdate(user.id, dataToSubmit);
    console.log("data", data[0]);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <div>
      <h2> Personal Details</h2>
      <div onClick={() => setEditToggle((value) => !value)}>Edit</div>
      <div>
        <div>First Name </div>

        {editToggle ? (
          <div>
            <input
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
      </div>
      <div>
        <div>Last Name </div>
        {editToggle ? (
          <div>
            <input
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
      </div>
      <div>
        <div>Email </div>
        {editToggle ? (
          <div>
            <input
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
      </div>
      <div>
        <div>Mobile Number </div>
        {editToggle ? (
          <div>
            <input
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
      </div>
      <div>
        <div>Date of Birth </div>

        {editToggle ? (
          <div>
            <DatePicker
              format="y-MM-dd"
              value={editedData.dateOfBirth}
              onChange={(e) => {
                setEditedData((data) => {
                  return { ...data, dateOfBirth: e };
                });
              }}
            />
          </div>
        ) : (
          <div> : {moment.utc(user.dateOfBirth).format("DD/MM/YY")} </div>
        )}
      </div>
      {editToggle && (
        <div>
          <Preferences
            category={category}
            catSelected={catSelected}
            selectedCategory={Object.keys(editedData.category)}
          ></Preferences>
        </div>
      )}
      {editToggle && (
        <div>
          {" "}
          <div>
            <div>Password </div>
            <div>
              <input
                value={editedData.password}
                type="password"
                onChange={(e) => {
                  setEditedData((data) => {
                    return { ...data, password: e.target.value.trim() };
                  });
                }}
              />
            </div>
          </div>
          <div>
            <div>Confirm Password</div>
            <div>
              <input
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
          </div>
        </div>
      )}
      {editToggle && (
        <div>
          <button
            onClick={() => {
              onEditSubmit();
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
