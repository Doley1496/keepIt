const JWT = require("jsonwebtoken");

const userModels = require("../Models/userModels.js");

/* Middlewares contains an additional argument call next().

 When we get the req(request) after that next() gets validate and then res(response) are send.
 If we donot use next() our execution will get paused and our previous code will be shown and we cannot 
 move forward. With the help of next we will validate the user.  
*/

/* ******************* Creating token base Protected Routes with the help of middlewares ******************* */

/* Creating a middleware requireSignIn. This middleware will give access to a user only when the user is signIn. */
const requireSignIn = async (req, res, next) => {
  try {
    /* Verifying the token by using the JWT verify method. */
    const decode = JWT.verify(
      /*  Token is always present inside req.headers.authorization. */
      req.headers.authorization,

      /* We have created the JWT secret key in the .env file inside the environment variable JWT_SECRET. */
      process.env.JWT_SECRET
    );

    /* Passing the decode(which contains the verified token) to the req.user. */
    req.user = decode;

    /* calling the next() function so that the further codes get executes. */
    next();

    /* Catching the error and displaying it. */
  } catch (error) {
    console.log(error);
  }
};

/* Creating a middleware isAdmin for the admin access ie. we have written some logic which will check
   the user that is logging is a admin or a general user on the basis of role provided for admin we have 
   provided role as 1 and for general user role as 0.
*/
const isAdmin = async (req, res, next) => {
  try {
    /* Finding the user is a admin or a general user with the help of findById() mongoose method
       on the basis of role field ..... where user role is 0 and admin role is 1.
    */
    const user = await userModels.findById(req.user._id);

    /* when the user is not admin then we will display the unAuthorized message,because we will not give access 
       to the dashboard created for the admin to a general user.
    */
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized User",
      });
    } else {
      /* when the user is admin we will call next() function,so that further execution continues. */
      next();
    }

    /* Catching the error and displaying it. */
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in admin middlewares",
      error,
    });
  }
};

module.exports = { requireSignIn, isAdmin };
