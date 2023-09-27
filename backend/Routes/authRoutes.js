/* */

const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  forgotPasswordController,
  getImageController,
  testController,
} = require("../Controllers/authController.js");

const {
  requireSignIn,
  isAdmin,
} = require("../Middlewares/todoListMiddleware.js");

const upload = require("../Middlewares/multer.js");

/******************************************************************************************************/

/* ******************************** 1: Registering a new user ******************************** */

/* Creating a route(api endpoint) ie. /register and when this api endpoint will be call using axios 
   then the controller ie. registerController will get execute and inside this controller we have 
   written the logic how to register a new user.
*/
router.post("/register", upload.single("myProfile"), registerController);

/* ******************************** 2. Logging a user  ******************************** */

/* Creating a route(api endpoint) ie. /login and when this api endpoint will be call using axios 
   then the controller ie. loginController will get execute and inside this controller we have 
   written the logic how to login a existing user.
*/
router.post("/login", loginController);

/* ******************************** 3: Reset the user's password ******************************** */

/* Creating a route(api endpoint) ie. /forgot-password and when this api endpoint will be call using axios 
   then the controller ie. forgotPasswordController will get execute and in this controller we have written 
   the logic to reset the user's password.
*/
router.post("/forgot-password", forgotPasswordController);

/* ******************************** 4: get image route ******************************** */

/* Creating a route(api endpoint) ie. /get-image and when this api endpoint will be call using axios 
   then the controller ie. getImageController will get execute and in this controller we have written 
   the logic to get the profile photo of the user.
*/
router.get("/get-image", getImageController);

/* ******************************** 5: Testing the route ******************************** */

/* Creating a route(api endpoint) ie. /test and when this api endpoint will be call using axios 
   then the controller ie. testController will get execute and in this controller we have written 
   the logic to test our route.
   We are passing middlewares because only admin and the admin should be signIn to test our route.
*/
router.get("/test", requireSignIn, isAdmin, testController);

/* exporting the module router. */
module.exports = router;
