import React from "react";
import "../About/About.css";
import Layout from "../../Components/Layout/Layout.js";

const About = () => {
  return (
    /* Using SEO in About.js page now title will be shown as About us - Ecommerce app. */

    <Layout title={"About us - Ecommerce app"}>
      {/* Using grid to separate the contents in two parts 1st part contains image and 
          2nd part contains some text.
      */}

      {/* 1st part contains image */}
      <div className="row about">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      {/* 2nd part contains about information */}

      <div className="col-md-10">
        <div>
          <h2 className="text-center mb-5 under">About Us!</h2>
          <h3 style={{ textAlign: "center" }} className="mb-6">
            Welcome To <span id="W_Name1">keepIt</span>
          </h3>

          <div className="spacing">
            <p>
              <span id="W_Name2">keepIt</span> is a Professional{" "}
              <span id="W_Type1">Note taking</span> Platform. Here we will
              provide you only interesting content, which you will like very
              much. We're dedicated to providing you the best of{" "}
              <span id="W_Type2">Note taking</span>, with a focus on
              dependability and <span id="W_Spec">notes writing</span>. We're
              working to turn our passion for{" "}
              <span id="W_Type3">Note taking</span> into a booming{" "}
              <a
                href="https://www.blogearns.com/2021/05/free-about-us-page-generator.html"
                rel="do-follow"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                online website
              </a>
              . We hope you enjoy our <span id="W_Type4">Note taking</span> as
              much as we enjoy offering them to you.
            </p>
            <p>
              I will keep posting more important posts on my Website for all of
              you. Please give your support and love.
            </p>

            <p>
              At keepIt, we understand that taking notes can be a tedious and
              overwhelming task. That's why we have created a user-friendly
              note-taking webpage similar to google keep, to make your life
              easier.Our team of dedicated professionals has years of experience
              in the tech industry and a passion for making organization and
              productivity accessible to everyone. We saw the need for a simple,
              efficient note-taking platform and decided to fill that gap with
              keepIt.Founded in 2015, our goal is to provide a seamless
              note-taking experience for individuals and businesses alike. With
              our intuitive design and advanced features, you can easily create,
              organize, and access your notes from any device.Whether you're a
              busy professional or a student trying to stay on top of their
              studies, keepIt is here to help you stay organized and focused.
              Join the thousands of satisfied users who have made the switch to
              keepIt today!
            </p>
          </div>

          <p style={{ fontWeight: "bold", textAlign: "center" }}>
            Thanks For Visiting Our Site
            <br />
            <br />
            <span
              style={{
                color: "blue",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Have a nice day!
            </span>
          </p>
        </div>
      </div>

      {/* */}
    </Layout>
  );
};

export default About;
