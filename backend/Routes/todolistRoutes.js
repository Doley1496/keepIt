/* Creating react router object. */
const router = require("express").Router();

const {
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../Controllers/todoListController.js");

// const { requireSignIn } = require("../Middlewares/todoListMiddleware.js");

/* ******************************** 1: Create a new todo task  ******************************** */

/* Creating a route(api endpoint) ie. /create-task and when this api endpoint will be call using axios 
   then the controller ie. createTaskController will get execute and inside this controller we have 
   written the logic how to create a new Todo task in the database.
   And we are passing a middleware ie. requireSignIn which means the user must be signIn to perform the CRUD 
   operations in our website.
*/
router.post("/create-task/:id", createTaskController);

/* ****************************** 2. Reading(getting) a Todo task  ******************************** */

/* Creating a route(api endpoint) ie. /get-task and when this api endpoint will be call using axios 
   then the controller ie. getTaskController will get execute and inside this controller we have 
   written the logic how to get(Read) a Todo task from the database.
   And we are passing a middleware ie. requireSignIn which means the user must be signIn to perform the CRUD 
   operations in our website.
*/
router.get("/get-task/:id", getTaskController);

/* ******************************** 3. Update a Todo task  ******************************** */

/* Creating a route(api endpoint) ie. /update-task and when this api endpoint will be call using axios 
   then the controller ie. updateTaskController will get execute and inside this controller we have 
   written the logic how to update an existing Todo task in our database.
   And we are passing a middleware ie. requireSignIn which means the user must be signIn to perform the CRUD 
   operations in our website.
*/
router.put("/update-task/:id", updateTaskController);

/* ******************************** 4. Delete a Todo task  ******************************** */

/* Creating a route(api endpoint) ie. /delete-task and when this api endpoint will be call using axios 
   then the controller ie. deleteTaskController will get execute and inside this controller we have 
   written the logic how to delete an existing Todo task from our database.
   And we are passing a middleware ie. requireSignIn which means the user must be signIn to perform the CRUD 
   operations in our website.
*/
router.delete("/delete-task/:id", deleteTaskController);

/* exporting the module router. */
module.exports = router;
