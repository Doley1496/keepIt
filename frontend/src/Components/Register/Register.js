import React, { useState } from "react";

import Layout from "../../Components/Layout/Layout.js";
import "../Register/Register.css";

import axios from "axios";

import toast from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";

import { BiShow, BiHide } from "react-icons/bi";

import SignUpLogo from "../../images/signUp.png";

let REACT_APP_CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

const Register = () => {
  /* */

  /* Creating a variable for useNavigate(). */
  const navigate = useNavigate();

  /* Creating a useState() hook to show the password. */
  const [showPassword, setShowPassword] = useState(false);

  /* Creating a useState() hook to show the confirm password. */
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* Creating a useState() hook to hold the value of the inputs fields username,email,password,phone. */
  const [Inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    answer: "",
    myProfile: "",
  });

  /* ***************************************************************************************************** */

  /* Creating a function with name handleShowPassword and passing it in the onClick event of the 
     password field of the register form.
     It will interchange its value.
     ie.  When we will click on the show-icon then it will display the hide-icon.
          And when we will click on the hide-icon then it will display the show-icon
  */
  const handleShowPassword = () => {
    setShowPassword((previous) => !previous);
  };

  /* Creating a function with name handleShowConfirmPassword and passing it in the onClick event of the 
     confirm password field of the register form.
     It will interchange its value.
     ie.  When we will click on the show-icon then it will display the hide-icon.
          And when we will click on the hide-icon then it will display the show-icon
  */
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((previous) => !previous);
  };

  /* ***************************************************************************************************** */

  /* Creating a function with name change() and passing it in the onChange event of the email fields and the
     password fields of the login form's.
     onChange() event will temporarily save the data of the input fields.
     ie.. The onChange() event attribute fires the event when the element loses focus.
  */
  const change = (event) => {
    /* Destructing the name and value from event.target. */
    const { name, value } = event.target;

    /* We are setting(storing) the Inputs array ie. setInputs() with all the previous values of the
       Inputs array(using spread operator) and also storing the name(title and body)
       and value(what title and body provided by the user) in key value pairs.
    */
    setInputs({ ...Inputs, [name]: value });
  };

  /* ***************************************************************************************************** */

  /* Creating a function name submit() and passing(calling) it in the onSubmit event of the form. 
     ie... when we will click on the Register button then this function will get execute and inside this 
     function we have written the logic to submit all the details provided in the register form into our database.  
  */
  const register = async (event) => {
    /* */

    /* Preventing the default refresh of the web page. */
    event.preventDefault();

    try {
      /* */

      /* We cannot get the product's data directly so we will use the default property of the browser to get
         the data. So,we are creating FormData() and storing it in a varible userData.
      */
      const userData = new FormData();

      /* Using the variable userData we are appending(adding) all the userSchema's value that we have created
         in the useState() ie. Inputs for all the schema's value.
      */
      userData.append("username", Inputs.username);
      userData.append("email", Inputs.email);
      userData.append("password", Inputs.password);
      userData.append("confirmPassword", Inputs.confirmPassword);
      userData.append("answer", Inputs.answer);
      userData.append("myProfile", Inputs.myProfile);

      /*   Sending network request(ie. making an api call) using axios to register a new user.
           Directly destructing the response( data's ) in the variable data ie.the response( data )
           that we will get from the controller function registerController() created inside the controller
           authController.js which is made for this following route(api endpoint).
      */

      // const { data } = await axios.post(
      //   "http://localhost:8000/api/v1/register",
      //   userData
      // );

      // const { data } = await axios.post(
      //   "https://keepitfrontdoley.onrender.com/api/v1/register",
      //   userData
      // );

      const { data } = await axios.post(
        `${REACT_APP_CLIENT_URL}/v1/register`,
        userData
      );

      /* when we successfully make an api call using axios and get(destruct) the response(data),
         we will show the toast success message. Else we will show the error message.
      */
      if (data?.success) {
        /* showing the success message. */
        toast.success(data.message);

        navigate("/login");

        /* showing the error message. */
      } else {
        toast.error(data.message);
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/register" route.
     because for this route we have provide component {<Register />}
     ie. <Route path="/register" element={<Register />} /> 
  */
  return (
    <Layout title={"Register Here"}>
      <div className="form-container" style={{ minHeight: "80vh" }}>
        {/* Creating a Register form using bootstrap form */}

        <form onSubmit={register}>
          <h1 className="title">Register</h1>

          {/* Creating user's profile photo input field*/}
          <div className="d-flex mb-3 profilePic">
            <label className="btn btn-outline-secondary col-md-9">
              <img src={SignUpLogo} height={50} width={50} />
              <h6 className="text-center">Upload</h6>
              <input
                type="file"
                name="myProfile"
                required
                accept="image/*"
                onChange={(event) =>
                  setInputs({ ...Inputs, myProfile: event.target.files[0] })
                }
                className="form-control profile-box"
              />
            </label>
          </div>

          {/* ********************************************************************************************** */}

          {/* Creating user username input field*/}
          <div className="mb-3">
            <input
              type="text"
              name="username"
              placeholder="Enter Your UserName"
              required
              autoFocus
              value={Inputs.username}
              onChange={change}
              className="form-control"
            />
          </div>

          {/* *********************************************************************************************** */}

          {/* Creating Email input field*/}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              required
              value={Inputs.email}
              onChange={change}
              className="form-control"
            />
          </div>

          {/* *********************************************************************************************** */}

          {/* Creating Password input field*/}
          <div className="mb-3 flex px-1 pb-1 mt-1 mb-1 ">
            <input
              /* When we will get showPassword then we will make our type as text otherwise password type. */
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              required
              value={Inputs.password}
              onChange={change}
              className="inputs"
            />
            <span className="flex cursor-pointer" onClick={handleShowPassword}>
              {/* Using ternary operator when we will get showPassword then we will display show-icon
                  otherwise we will display hide-icon. 
              */}
              {showPassword ? (
                <BiShow className="icons" />
              ) : (
                <BiHide className="icons" />
              )}
            </span>
          </div>

          {/* *********************************************************************************************** */}

          {/* Creating Confirm Password input field*/}
          <div className="mb-3 flex px-1 pb-1 mt-1 mb-1">
            <input
              /* When we will get showConfirmPassword then we will make our type as text otherwise password type. */
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Your Password"
              required
              value={Inputs.confirmPassword}
              onChange={change}
              className="inputs"
            />
            <span className="flex" onClick={handleShowConfirmPassword}>
              {/* Using ternary operator when we will get showConfirmPassword then we will 
                  display show-icon otherwise we will display hide-icon. 
              */}
              {showConfirmPassword ? (
                <BiShow className="icons" />
              ) : (
                <BiHide className="icons" />
              )}
            </span>
          </div>

          {/* ************************************************************************************************ */}

          {/* Creating Security-Question input field*/}
          <div className="mb-3">
            <input
              type="text"
              name="answer"
              placeholder="Enter Your Favourite Sport"
              required
              value={Inputs.answer}
              onChange={change}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input type="checkbox" required className="mx-2" />
            All Terms and Conditions apply
          </div>

          {/* ************************************************************************************************ */}
          {/* Creating a Register button input field. */}
          <button type="submit" className="btn btn-primary ">
            Register
          </button>

          {/* Creating a Login button input field. */}
          <h6 className="mt-3">Already have account? Please login!</h6>
          <button className="btn ">
            <Link aria-current="page" to="/login" className="nav-link active ">
              Login
            </Link>
          </button>

          {/* */}
        </form>
      </div>
    </Layout>
  );
};

export default Register;
