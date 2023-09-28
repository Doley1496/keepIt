import React, { useState, useEffect } from "react";
import "../Header/Header.css";

import toast from "react-hot-toast";

import axios from "axios";

// import { useNavigate } from "react-router-dom";

import { BiSolidBookHeart } from "react-icons/bi";
import { Link } from "react-router-dom";

/* Importing useSelector from react-redux to select the initial-state. */
import { useSelector } from "react-redux";

/* Importing useDispatch and useSelector from react-redux to call the function of the reducers. */
import { useDispatch } from "react-redux";

/* Importing authActions variable from ReduxStore.js */
import { authActions } from "../../Components/ReduxStore/ReduxStore.js";

let REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Header = () => {
  /* */

  // /* Creating a variable for useNavigate(). */
  // const navigate = useNavigate();

  /* Creating a useState() hook to hold the profile photo of the user. */
  const [profilePic, setProfilePic] = useState("");

  /* Creating a variable for useDispatch(). */
  const dispatch = useDispatch();

  /* Using state of the useSelector's funtion we are selecting the initial-state( ie. isLoggedIn ) 
     of the authSlice variable and storing it in isLoggedIn variable. 
  */
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  /* ***************************************************************************************************** */

  /* Defining the function logout() that we passed in the onClick event of the Logout button.
     When the user will click on the Logout button we will redirect to the home page and we will remove
     all the data from the session storage and from the state as well so that our register button and the 
     login button visibles again by removing the dropdown-menu. 
  */
  const logout = () => {
    /* */

    /* Removing the user's id from the Session Storage after logout. */
    sessionStorage.clear("id");

    /* dispatch() funtion is used to call the function of the reducers. */
    dispatch(authActions.logout());

    /* When we will successfully logout then we will show a toast success message. */
    toast.success("Logout Successfully");
  };

  /* ***************************************************************************************************** */

  /* Creating a function name getProfileImage() and passing(calling) it in the useEffect() hook. 
     and inside this function we have written the logic to get the user's profile-photo in the navbar after he
     successfuly login to its account.
     ie... when the user will login the user will get its profile-photo in the navbar in initial time.  
  */
  const getProfileImage = async () => {
    /* */

    try {
      /* */

      /* Sending network request(ie. making an api call) using axios to get the profile-photo of the user.
         Directly destructing the response( data's ) in the variable data ie.the response( data )
         that we will get from the controller function getImageController() created inside the controller
         authController.js which is made for this following route(api endpoint).
      */

      const img_path = process.env.REACT_APP_IMAGE_PATH;

      const { data } = await axios.get(`${REACT_APP_SERVER_URL}/v1/get-image`);

      setProfilePic(img_path + "1695270835471_Adidas.webp");

      // img_path + data?.profileImage

      // const { data } = await axios.get(
      //   "http://localhost:8000/api/v1/get-image"
      // );

      // const { data } = await axios.get(
      //   `https://keepitbackdoley.onrender.com/api/v1/get-image`
      // );

      /* Catching the error and displaying it. */
    } catch (error) {
      console.log(error);
    }
  };

  /* *************************************** useEffect() hook ************************************** */

  /* Creating useEffect hook and calling the function getProfileImage() to get the profile image in
     initial time and passing empty array as dependencies.
  */
  useEffect(() => {
    getProfileImage();
  }, []);

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <BiSolidBookHeart />
            KeepIt
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* */}

              {/* Creating home link to go to the home page. */}
              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {/* Creating About us link to go to the about us page. */}
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/todo-lists"
                >
                  Todo Notes
                </Link>
              </li>

              {/******************************************************************************************/}

              {/* When a user is not loggedIn then we will show the Register button and the Login button
                  and we will hide the dropdown-menu.
              */}
              {!isLoggedIn && (
                <>
                  {/* Creating register link to go to the registration page. */}
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>

                  {/* Creating login link to go to the login page. */}
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}

              {/******************************************************************************************/}

              {/* When a user is loggedIn then we will show a dropdown menu with the user's image which 
                  will contain a logout button and a todo-list button(to go the todo-list page)
                  and we will hide the register and login button.
              */}
              {isLoggedIn && (
                <>
                  {/* Creating a dropdown menu with the user's image when the user will click on its 
                      image then will show the user 2 options. 
                  */}
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link"
                      to=""
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="http://localhost:8000/uploads/photos/1695270835471_Adidas.webp"
                        // src={profilePic}
                        alt="profile-pic"
                        className="img-fluid user-profile-pic"
                      />
                    </Link>

                    <ul className="dropdown-menu">
                      {/* 1st option of the Dropdown menu will be Todo lists. */}
                      <li>
                        <Link className="dropdown-item" to="/todo-lists">
                          Your Todo Notes
                        </Link>
                      </li>

                      {/* 2nd option of the Dropdown menu will be Logout. */}
                      <li onClick={logout}>
                        <Link className="dropdown-item" to="/">
                          Logout
                        </Link>
                      </li>

                      {/* */}
                    </ul>
                  </li>
                </>
              )}

              {/* */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
