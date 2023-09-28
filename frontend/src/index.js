// eslint-disable-next-line

import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals.js";

import { BrowserRouter } from "react-router-dom";

/* Importing in-built component Provider from react-redux.  */
import { Provider } from "react-redux";

/* Importing component ReduxStore from ./Components/ReduxStore/ReduxStore.js  */
import { authStore } from "./Components/ReduxStore/ReduxStore.js";

require("dotenv").config();

/* Enabling all the context api in our application so that we can use it in any component globally. */

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={authStore}>
      <App />
    </Provider>
  </BrowserRouter>
);

reportWebVitals();

// "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },

// "eslintConfig": {
//   "extends": [
//     "react-app",
//     "react-app/jest"
//   ]
// },

// "client": "npm start --prefix ../Frontend",
// "dev": "concurrently \"npm run server\" \"npm run client\""
