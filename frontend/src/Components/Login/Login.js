import React, { useState } from "react";

import Layout from "../../Components/Layout/Layout.js";
import "../Login/Login.css";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/* Importing useDispatch from react-redux to call the function of the reducers. */
import { useDispatch } from "react-redux";
import { authActions } from "../ReduxStore/ReduxStore.js";

import { BiShow, BiHide } from "react-icons/bi";

let REACT_APP_CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

const Login = () => {
  /* */

  /* Creating a variable for useDispatch(). */
  const dispatch = useDispatch();

  /* Creating a variable for useNavigate(). */
  const navigate = useNavigate();

  /* Creating a useState() hook to show the password. */
  const [showPassword, setShowPassword] = useState(false);

  /* Creating a useState() hook to hold the value of the inputs fields username,email,password,phone. */
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
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

  /* Creating a function name submit() and passing(calling) it in the onSubmit event of the form. 
     ie... when we will click on the Login button then this function will get execute and inside this 
     function we have written the logic to submit all the details provided in the login form into our database.  
  */
  const submit = async (event) => {
    /* */

    /* Preventing the default refresh of the web page. */
    event.preventDefault();

    try {
      /* */

      /* Sending network request(ie. making an api call) using axios to login a existing user.
         Directly destructing the response( data's ) in the variable data ie.the response( data )
         that we will get from the controller function loginController() created inside the controller 
         authController.js which is made for this following route(api endpoint). 
         In axios we pass all the fields. 
      */

      // const { data } = await axios.post(
      //   "http://localhost:8000/api/v1/login",
      //   Inputs
      // );

      // const { data } = await axios.post(
      //   "https://keepitfrontdoley.onrender.com/api/v1/login",
      //   Inputs
      // );

      const { data } = await axios.post(
        `${REACT_APP_CLIENT_URL}/v1/login`,
        Inputs
      );

      /* Storing the id of the user in Session Storage. */
      sessionStorage.setItem("id", data.user._id);

      /* when we successfully make an api call using axios and get(destruct) the response(data), 
         we will show the toast success message and make the input fields of the Register form empty and 
         navigate(redirect) to the login route page.Else we will show the error message. 
      */
      if (data?.success) {
        /* showing the success message. */
        toast.success(data.message);

        /* dispatch() funtion is used to call the function of the reducers. */
        dispatch(authActions.login());

        /* after successful login we will navigate(redirect) to the todo-lists route page. */
        navigate("/todo-lists");

        /* showing the error message. */
      } else {
        toast.error(data.message);
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/login" route.
     because for this route we have provide component {<Login />}
     ie. <Route path="/login" element={<Login />} /> 
  */
  return (
    <Layout title={"Login Here"}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        {/* Creating a Register Page using bootstrap form */}

        <form onSubmit={submit}>
          <h1 className="title">Login</h1>

          {/* Creating Email input field*/}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              required
              autoFocus
              value={Inputs.email}
              onChange={change}
              className="form-control"
            />
          </div>

          {/* Creating Password input field*/}
          <div className="mb-3">
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

          {/* Creating Login Button input field*/}
          <button type="submit" className="btn btn-primary">
            Login
          </button>

          {/* Creating ForgotPassword Button input field*/}
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-primary"
              /* Using onClick event,when click we will navigate(redirect) to the route "/forgot-password" */
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          {/* */}
        </form>
      </div>
    </Layout>
  );
};

export default Login;
