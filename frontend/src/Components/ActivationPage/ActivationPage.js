import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Layout from "../../Components/Layout/Layout.js";

import success from "../../images/images.jpg";

const ActivationPage = () => {
  /* */

  // const { activation_token } = useParams();

  const params = useParams();

  /* Creating a useState() hook to set the error as true or false. */
  const [validUrl, setValidUrl] = useState(false);

  /* ***************************************************************************************************** */

  /* Creating a function name activateEmail and passing(calling) it in the useEffect() hook. 
     Inside this function we have written the logic to activate the email of the current user.
  */
  const activateEmailUrl = async () => {
    /* */

    try {
      /*   Sending network request(ie. making an api call) using axios to activate the link.
           Directly destructing the response( data's ) in the variable data ie.the response( data )
           that we will get from the controller function activationLinkController() created inside the controller
           authController.js which is made for this following route(api endpoint).
      */
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/verify-email/${params.emailToken}`
      );

      setValidUrl(true);

      /* when we successfully make an api call using axios and get(destruct) the response(data),
         we will show the toast success message. Else we will show the error message.
      */
      if (data?.success) {
        /* showing the success message. */
        toast.success(data.message);
        console.log(data.data.message);
      }

      /* Catching the error and displaying it and setting the error array. */
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setValidUrl(false);
    }
  };

  /* *************************************** useEffect() hooks ************************************** */

  /* Creating useEffect hook if we get the activation-token then we will call activateEmail() function 
     to activate the email link and providing the activation_token as dependencies.
  */
  useEffect(() => {
    activateEmailUrl();
  });

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/activation/:activation_token" route.
     because for this route we have provide component {<ActivationPage />}
     ie. < Route  path="/activation/:activation_token"  element={<ActivationPage />} />
  */
  return (
    <Layout title={"Activation Link"}>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {validUrl ? (
          <div>
            <h1>Your account has been created successfully.</h1>
            <img src={success} alt="success" />
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          </div>
        ) : (
          <p>Your token is expired.</p>
        )}
      </div>
    </Layout>
  );
};

export default ActivationPage;
