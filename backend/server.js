/* */
// eslint-disable-next-line

/* requiring and configuring the dotenv. */
require("dotenv").config();

/* server.js is a nodeJs file therefore instead of import we will use require method */

const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

// const path = require("path");

/* Getting the database that we connected to the mongoDb server in db.js */
require("./Config/db.js");

/* Getting the routes from the Routes folder. */
const authRoutes = require("./Routes/authRoutes.js");
const todolistRoutes = require("./Routes/todolistRoutes.js");

/* app configuration */
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Middlewares */

/* cors is used to send request from frontend to backend. */
app.use(cors());

/* Converting to json format. */
app.use(express.json());

/* Setting the Path where the user's profile photos will be save. ie. in uploads folder. */
app.use("/uploads", express.static("uploads"));

/*   Creating different Semi-Routes(API endpoints)  */

/* after "/api/v1" route the routes created in authRoutes will be added to the
   following route.Similarly for other routes as well.
*/
app.use("/api/v1", authRoutes);
app.use("/api/v2", todolistRoutes);

// /**********************************  RENDER **************************************************** */

// /* Deployment of static files using RENDER. */
// app.use(express.static(path.join(__dirname, "Frontend/build")));

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "Frontend/build/index.html"));
// });

// /**********************************  RENDER **************************************************** */

/* Sending a response message to the home route */
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ToDO App",
  });
});

/* Connnecting port dynamically at 8080. */
const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log(`Server is running in ${process.env.DEV_MODE} at port ${PORT}`);
});

/* Package.json 

  "eslintConfig": {
     "extends": [
       "react-app",
       "react-app/jest"
    ]
   },

*/
