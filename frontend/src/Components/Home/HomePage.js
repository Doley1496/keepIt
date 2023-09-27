import React from "react";
import "../Home/HomePage.css";
import Layout from "../../Components/Layout/Layout.js";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Layout title={"Todo List"}>
      <div className="home d-flex justify-content-center align-items-center">
        <div className="container d-flex justify-content-center align-items-center flex-column">
          <h1 className="text-center">
            Organize your <br /> work and life <br />
            at an efficient way.
            <br />
          </h1>

          <h6>
            Make your everyday work done <br /> Single app that will make your
            life to <br />
            remember of all your things to be done.
          </h6>

          <Link to="/todo-lists">
            <button className="home-btn p-2">Make Todo List</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
