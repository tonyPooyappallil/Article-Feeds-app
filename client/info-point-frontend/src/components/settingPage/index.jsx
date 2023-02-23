import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("user"));
  if (!localUser) {
    navigate("/");
  }

  const [user, setUser] = useState(localUser);
  const [editToggle, setEditToggle] = useState(false);

  //   useEffect(() => {
  //     console.log("coming");
  //     const dataFetch = async () => {
  //       axios
  //         .get(`https://busy-plum-bee-cuff.cyclic.app/article/${articleId}`)
  //         .then(function (data) {
  //           setArticle(data.data.data);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //       axios
  //         .get("https://busy-plum-bee-cuff.cyclic.app/category")
  //         .then(function (data) {
  //           setCategory(data.data.data);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //       axios
  //         .get("https://busy-plum-bee-cuff.cyclic.app/user")
  //         .then(function (data) {
  //           setAllUsers(data.data.data);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //     };
  //     dataFetch();
  //     console.log("ddd");
  //   }, []);

  return (
    <div>
      <h2> Personal Details</h2>
      <div onClick={() => setEditToggle((value) => !value)}>Edit</div>
      <div>
        <div>First Name </div>

        {editToggle ? (
          <div>
            <input type="text" />
          </div>
        ) : (
          <div> {user.firstName} </div>
        )}
      </div>
      <div>
        <div>Last Name </div>
        {editToggle ? (
          <div>
            <input type="text" />
          </div>
        ) : (
          <div> {user.lastName} </div>
        )}
      </div>
      <div>
        <div>Email </div>
        {editToggle ? (
          <div>
            <input type="text" />
          </div>
        ) : (
          <div> {user.email} </div>
        )}
      </div>
      <div>
        <div>Mobile Number </div>
        {editToggle ? (
          <div>
            <input type="text" />
          </div>
        ) : (
          <div> {user.mobileNum} </div>
        )}
      </div>
      {editToggle && (
        <div>
          {" "}
          <div>
            <div>Password </div>
            <div>
              <input type="text" />
            </div>
          </div>
          <div>
            <div>Confirm Password</div>
            <div>
              <input type="text" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
