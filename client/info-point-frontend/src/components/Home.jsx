import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Preferences from "./signup/Preferences";
import { useNavigate } from "react-router-dom";
import { AppContext, UserContext } from "../context";

const Home = () => {
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
  const navigate = useNavigate();
  const { loggedIn, setLogin } = useContext(AppContext);
  const { user, setUserContext } = useContext(UserContext);

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
    <div>
      {!newUser ? (
        <div>
          <h2>Login</h2>
          <form onSubmit={(e) => loginSubmit(e)}>
            <label>
              Email / Mobile Number:
              <input
                type="text"
                name="name"
                value={id}
                onChange={({ target: { value } }) => setId(value)}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                name="name"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      ) : (
        <div>
          <h2>SignUp</h2>
          <form
            onSubmit={(e) => {
              signUpSubmit(e);
            }}
          >
            <label>
              First Name
              <input
                type="text"
                name="name"
                value={firstName}
                onChange={({ target: { value } }) => setFirstName(value)}
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                name="name"
                value={lastName}
                onChange={({ target: { value } }) => setLastName(value)}
              />
            </label>
            <label>
              Date Of Birth
              <DatePicker
                format="y-MM-dd"
                value={dob}
                onChange={(date) => setDob(date)}
              />
            </label>
            <label>
              Email
              <input
                type="text"
                name="name"
                value={id}
                onChange={({ target: { value } }) => setId(value)}
              />
            </label>
            <label>
              Mobile Number:
              <input
                type="text"
                name="name"
                value={mobile}
                onChange={({ target: { value } }) => setMobile(value)}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                name="name"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </label>
            <label>
              Confirm Password:
              <div>
                {" "}
                <input
                  type="text"
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
            </label>
            <Preferences category={category} catSelected={catSelected} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}

      {!newUser && (
        <div>
          New User?{" "}
          <button
            onClick={() => {
              setId("");
              setPassword("");
              setNewUser(true);
            }}
          >
            SignUp
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
