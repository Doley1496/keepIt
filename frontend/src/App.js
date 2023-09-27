import React, { useEffect } from "react";

import HomePage from "./Components/Home/HomePage.js";
import About from "./Components/About/About.js";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy.js";
import PageNotFound from "./Components/PageNotFound/PageNotFound.js";
import Contact from "./Components/Contact/Contact.js";
import Register from "./Components/Register/Register.js";
import Login from "./Components/Login/Login.js";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword..js";
import TodoList from "./Components/TodoList/TodoList.js";
// import ActivationPage from "./Components/ActivationPage/ActivationPage.js";

/* Routes will work like container where we can keep all our Route. */
import { Routes, Route } from "react-router-dom";

/* Importing useDispatch from react-redux to call the function of the reducers. */
import { useDispatch } from "react-redux";

/* Importing authActions variable from ReduxStore.js */
import { authActions } from "./Components/ReduxStore/ReduxStore.js";

const App = () => {
  /* */

  /* Creating a variable for useDispatch(). */
  const dispatch = useDispatch();

  /* When our application will load we will check that if any id is present in the Session Storage.
     if any id is present then it will stored everything in redux.

     Therefore we will use useEffect() hook so that we can access all the data in the initial time.
  */
  useEffect(() => {
    /* */

    /* We are getting the id of the user from the Session Storage and storing in a variable. */
    const userId = sessionStorage.getItem("id");

    /* If id of the user is present in the Session Storage then we will call the login() reducer
       function by using dispatch() function. 
    */
    if (userId) {
      /* */

      /* dispatch() funtion is used to call the function of the reducers. */
      dispatch(authActions.login());
    }
  }, []);

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  return (
    <>
      {/* Here we are Creating diffrent Route for different page of our website */}

      {/* */}
      <Routes>
        {/* With the help of element we will show the components we want to show for different web pages 
            in different routes. 
        */}

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<PrivacyPolicy />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* <Route path="/verify-email/:emailToken" element={<ActivationPage />} /> */}

        <Route path="/todo-lists" element={<TodoList />} />

        {/* Means when all the above routes is not found then show this route(PageNotFound) */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
