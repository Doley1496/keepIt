const userModels = require("../Models/userModels.js");

const { hashPassword, comparePassword } = require("../Security/Security.js");

const JWT = require("jsonwebtoken");

/* To overcome a proxy error we are importing and configuring dotenv directly here */
const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");

// const sendMail = require("../Utils/SendMail.js");

// const crypto = require("crypto");

/*******************************************************************************************************/
/***************************      1 : Creating register Controller      ********************************/
/*******************************************************************************************************/

/* Creating a Controller function with name registerController which contains the logic to register a new user
   ie. it will take all the details from the user in the /register (route) page such as their name,email
   password and phone and stored it in our database collection.
*/
const registerController = async (req, res) => {
  /* */

  try {
    /*  Destructing all the schema value's from req.body. */
    const { username, email, password, confirmPassword, answer } = req.body;

    /*  Destructing the profile pic from req.file.filename using ternary operator. */
    const profilePhoto = req.file ? req.file.filename : null;

    /* Validation message If the username,email,password,answer and photo is not
       found then we will show a message using Switch statement. 
    */

    /* First we will check the password's. If password and confirm password matched then 
       only we will check further and save. 
    */
    if (password === confirmPassword) {
      /* */

      /* Checking the current registering user is a existing user or not in our database
         using findOne() mongoose method on the basis of the user's email and username.
      */
      const existingEmail = await userModels.findOne({ email: req.body.email });

      const existingUsername = await userModels.findOne({
        username: req.body.username,
      });

      /* If the email is already exists in our database ie. already registered then we will not save the
         profile pic of the user in our uploads folder.
         To remove we will use file System(fs) of nodeJs.

         If we don't do this then the user's profile pic will be save automatically in the uploads folder
         although the user's email or username already exists in the database.
      */
      if (existingEmail) {
        /* */

        /* Storing the profile-photo and the path of the profile-photo of the current user in two variables. */

        const profilePhoto = req.file.filename;
        const profilePhotoPath = `uploads/photos/${profilePhoto}`;

        /* Using fs module we are stoping the profile photo of the user to be save at uploads folder
           wrt its profile-photo path. 
        */
        fs.unlink(profilePhotoPath, (error) => {
          /* */

          /* If we get any error we will send an error message in json format. */
          if (error) {
            console.log(error);
            res.status(500).json({ message: "Error deleting the Profile Pic" });
          }
        });

        /* When email is already exist in our database then we will send a message that it already exists. */
        return res.status(200).send({
          success: false,
          message: "This Email is Already Registered! Please Login",
        });
      }

      /* If the username is already exists in our database ie. already registered then we will not save the
         profile pic of the user in our uploads folder.
         To remove we will use file System(fs) of nodeJs.

         If we don't do this then the user's profile pic will be save automatically in the uploads folder
         although the user's email or username already exists in the database.
      */
      if (existingUsername) {
        /* */

        /* Storing the profile-photo and the path of the profile-photo of the current user in two variables. */

        const profilePhoto = req.file.filename;
        const profilePhotoPath = `uploads/photos/${profilePhoto}`;

        /* Using fs module we are stoping the profile photo of the user to be save at uploads folder
           wrt its profile-picture path. 
         */

        fs.unlink(profilePhotoPath, (error) => {
          /* */

          /* If we get any error we will send an error message in json format. */
          if (error) {
            console.log(error);
            res.status(500).json({ message: "Error deleting the Profile Pic" });
          }
        });

        /* When username is already exist in our database then we will send a message that it already exists. */
        return res.status(200).send({
          success: false,
          message:
            "This Username is Already Taken! Please Enter Another Username",
        });
      }

      /* Before creating the user we will hashed the password of the user. */
      const hashedPassword = await hashPassword(password);

      /* Then we will create the user and save it. */

      const user = new userModels({
        username,
        email,
        password: hashedPassword,
        answer,
        profilePhoto,
      });

      await user.save();

      // /* After creating the user we will create the url to activate a user. */
      // const activationUrl = `http://localhost:3000/verify-email/${user._id}`;

      // /* If we successfully save the user then we will send(pass) the details such as user's email
      //    a heading and a message followed by the activation link to the user's email.
      // */
      // if (user) {
      //   /* */

      //   /* Then we will send(pass) the user's email,a heading and a message followed by the activation link.*/
      //   await sendMail({
      //     email: user.email,
      //     subject: "Verify Your Email",
      //     message: `Hello ${user.username},Please click on the link to activate your account: ${activationUrl}`,
      //   });

      //   /* When we will successfully create the user in our database and pass details to the sendMail() function
      //      then we will send a response success message.
      //   */
      //   res.status(200).send({
      //     success: true,
      //     message:
      //       "Your registration is submitted. Please verify your email to complete your registration.",
      //     user,
      //   });
      // }

      /* When we will successfully create the user in our database and pass details to the 
         sendMail() function then we will send a response success message.
      */
      res.status(200).send({
        success: true,
        message:
          "Your registration is submitted. Please verify your email to complete your registration.",
        user,
      });

      /* If the password and the confirm password doesnot match then also we will not save the profile pic 
         of the user in our uploads folder.
         To remove we will use file System(fs) of nodeJs.
         If we don't do this then the user's profile pic will be save automatically in the uploads folder
         although the user's email or username already exists in the database.

        And we will send a response message that it doesn't match.
      */
    } else {
      /* Storing the profile-photo and the path of the profile-photo of the current user in two variables. */

      const profilePhoto = req.file.filename;
      const profilePhotoPath = `uploads/photos/${profilePhoto}`;

      /* Using fs module we are stoping the profile photo of the user to be save at uploads folder
         wrt its profile-picture path. 
      */
      fs.unlink(profilePhotoPath, (error) => {
        /* */

        /* If we get any error we will send an error message in json format. */
        if (error) {
          console.log(error);
          res.status(500).json({ message: "Error deleting the Profile Pic" });
        }
      });

      /* Response message when password and confirmPassword does not match. */
      res
        .status(200)
        .send({ message: "Your Password and Confirm Password doesn't match" });
    }

    /*  Catching the error and displaying it. */
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

/*******************************************************************************************************/
/***************************      2 : Creating login Controller     *******************************/
/*******************************************************************************************************/

/* Creating a Controller function with name loginController which contains the logic for login a user.
   ie. it will check all the details entered by the user in the /login route(page) such as the email and 
   password of the user in our database and if the details matches with the data of our database then 
   we will give access to our website.
*/
const loginController = async (req, res) => {
  try {
    /* destructuring email and password from req.body. */
    const { email, password } = req.body;

    /* Checking the current logging user is a existing user or not in the users collection of our Database
       using findOne() mongoose method on the basis of the user's email.
    */
    const user = await userModels.findOne({ email });

    /* If the user's email doesn't exists in our database ie. not registered then we will show a
        message that "Email not Registered! Please Register".
    */
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Your Email is not Registered! Please Register",
      });
    }

    /* If the email exists in our database then we will compared(match) the passwords. 
       ie. the password entered by the user and the registered password present in our database.    
    */
    const passwordMatch = await comparePassword(password, user.password);

    /* If the passwords does not match then we will send a Validation message ie. Invalid Password. */
    if (!passwordMatch) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }

    /* When password match then we will create token and send response status. */

    /* We know using JWT we create token which helps us in security.
       Creating a token by using the JWT sign method.
    */
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "50d",
    });

    /* The token number will be generated when the login is successful.
       When the token will be generated successfully we will send a response message. 
    */
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
      },
      token,
    });

    /*  Catching the error and displaying it. */
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

/*******************************************************************************************************/
/******************************    3 : Creating reset password Controller  ******************************/
/*******************************************************************************************************/

/* Creating a Controller function with name forgotPasswordController which contains the logic to reset 
   the password ie. it will take the details such as email and the secret question from the user and 
   accordingly reset their password. 
*/
const forgotPasswordController = async (req, res) => {
  try {
    /* Destructuring email,answer,and newPassword from req.body */
    const { email, answer, newPassword } = req.body;

    /* Validation message when email,question and newPassword is not provided. */
    if (!email) {
      res.status(400).send({ message: "Email is Required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Secret Question is Required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "Enter A New Password" });
    }

    /* Finding the email and the answer to our security question of the user in our database.
       if the email-id and the question's answer is true ie... found then only we will reset the 
       password of the user. 
    */
    const userEmail = await userModels.findOne({ email });

    const userAnswer = await userModels.findOne({ answer });

    /* If the user's email and answer is not found then we display a Validation message  */
    if (!userEmail) {
      return res.status(500).send({
        success: false,
        message: "Wrong Email",
      });
    }

    /* If the user's email and answer is not found then we display a Validation message  */
    if (!userAnswer) {
      return res.status(500).send({
        success: false,
        message: "Wrong Favorite Sport Name",
      });
    }

    /* If the user's email and answer is found in our database then we will hash the new-password 
       provided by the user.
    */
    const hashed = await hashPassword(newPassword);

    /* After hashing the new Password we will update the old-password with the new-password in our database
       by using mongoose method call findByIdAndUpdate() on basis of its id. 
    */
    await userModels.findByIdAndUpdate(userEmail._id, { password: hashed });

    /* After Successfully updating the new Password we will show the success message. */
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });

    /* Catching the error and displaying it. */
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

/*******************************************************************************************************/
/*************************      4 : Geeting profile image Controller      ******************************/
/*******************************************************************************************************/

/* Creating a Controller function with name getImageController which contains the logic to get the profile
   image of the user from the database collection.
*/
const getImageController = async (req, res) => {
  /* */

  try {
    /* */

    /* Finding the profile image of the user in our database using findOne() mongoose method
       on the basis of the user's profilePhoto.
    */

    const profileImage = await userModels.findOne({
      profilePhoto: req.file.filename,
    });

    // const allUser = await userModels.find({});

    /* When profile photo exist in our database then we will send a message that it exists. */
    return res.status(200).send({
      success: true,
      message: "Successfully got the user's profile photo.",
      profileImage,
    });

    /* Catching the error and displaying it. */
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      // message: "Something went wrong",
      error,
    });
  }
};

/*******************************************************************************************************/
/*******************************   5 : Testing the Controller   *****************************************/
/*******************************************************************************************************/

const testController = (req, res) => {
  res.send("protected Routes");
};

/* Exporting all the modules */
module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  getImageController,
  testController,
};
