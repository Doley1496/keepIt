import React from "react";
import Layout from "../../Components/Layout/Layout.js";
import "../PageNotFound/PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    /* Using SEO in PageNotFound.js page now title will be shown as Go back - page not found. */
    <Layout title={"Go back - page not found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
