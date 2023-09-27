import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import Layout from "../../Components/Layout/Layout.js";
import "../ForgotPassword/ForgotPassword.css";

const ForgotPassword = () => {
  /* */

  /* Creating a variable for useNavigate(). */
  const navigate = useNavigate();

  /* Creating a useState() hook to hold the value of the inputs fields email,newPassword,and answer. */
  const [Inputs, setInputs] = useState({
    email: "",
    answer: "",
    newPassword: "",
  });

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
     ie... when we will click on the Reset button then this function will get execute and inside this 
     function we have written the logic to reset the old password with the new password. 
  */
  const submit = async (event) => {
    /* */

    /* Preventing the default refresh of the web page. */
    event.preventDefault();

    try {
      /* Sending network request(ie. making an api call) to the following route using axios to reset a password.
         And we are directly destructing the response( data's ) in the variable data ie.the
         response( data ) that we will get from the controller function forgotPasswordController() 
         created inside the controller authController.js. 
         In axios we pass all the fields. 
      */
      const { data } = await axios.post(
        "https://todofrontdoley.onrender.com/api/v1/forgot-password",
        Inputs
      );
      // "http://localhost:8000/api/v1/forgot-password",

      /* when we successfully make an api call using axios and get(destruct) the response(data), 
         we will show the toast success message and make the input fields of the Forgot password form empty
         and navigate(redirect) to the login route page.Else we will show the error message. 
      */
      if (data?.success) {
        /* showing the success message. */
        toast.success(data.message);

        /* after successful password reset we will navigate(redirect) to the login route page. */
        navigate("/login");

        /* showing the error message. */
      } else {
        toast.error(data.message);
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      error;
    }
  };

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/forgot-password" route.
  because for this route we have provide component {<ForgotPassword />}
   ie. <Route path="/forgot-password" element={<ForgotPassword />} /> */
  return (
    <Layout title={"Forgot-Password"}>
      <div className="form-container">
        {/* Creating a Register Page using bootstrap form */}

        <form onSubmit={submit}>
          <h1 className="title">Reset Password</h1>

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

          {/* Creating Question input field*/}
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

          {/* Creating Password input field*/}
          <div className="mb-3">
            <input
              type="password"
              name="newPassword"
              placeholder="Enter Your New Password"
              required
              value={Inputs.newPassword}
              onChange={change}
              className="form-control"
            />
          </div>

          {/* Creating Reset Button input field*/}
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
