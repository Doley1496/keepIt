import React from "react";
import "../Footer/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  /* */

  /* Returning the content to be displayed in the footer */
  return (
    <div className="container-fluid footer">
      {/* Heading to be displayed as a footer */}
      <h5 className="text-center">All Rights Reserved &copy; 2023</h5>

      {/* Creating 3 links using Link tag ie....to go to the following routes. when we click on those links
          route("/about") which will display the component ie. {<About />}
          route("/contact") which will display the component ie. {<Contact />}
          route("/policy") which will display the component ie. {<PrivacyPolicy />} 
       */}
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
