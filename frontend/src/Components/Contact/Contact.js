import React from "react";
import Layout from "../../Components/Layout/Layout.js";
import "../Contact/Contact.css";

import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    // Using SEO in Contact.js page now title will be shown as Contact Us

    <Layout title={"Contact Us"}>
      <div className="row contact ">
        {/* Using grid system to separate the contents in two parts 1st part contains image and 
        2nd part contains contact information */}

        {/* 1st part contains image */}
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>

        {/* 2nd part contains contact information */}
        <div className="col-md-4">
          {/*  Heading of the contact information */}
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>

          {/*  Paragraph of the contact information */}
          <p className="text-justify mt-2">
            Any query and info about product feel free to call anytime we are
            available 24X7
          </p>

          <p className="mt-3">
            {/* Using React icon BiMailSend */}
            <BiMailSend /> : www.info@madhurtodolist14.com
          </p>

          {/* Using React icon BiPhoneCall */}
          <p className="mt-3">
            <BiPhoneCall /> : +91 - 9101134037
          </p>

          {/* Using React icon BiSupport */}
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
