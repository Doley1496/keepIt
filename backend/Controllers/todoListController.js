const userModels = require("../Models/userModels.js");
const todoModels = require("../Models/todoModels.js");

/* ********************************** Creating CRUD Controller ******************************** */

/*******************************************************************************************************/
/***************************      1: Creating Task Controller      *************************************/
/*******************************************************************************************************/

/* Creating a controller with name createTaskController which will create(add) a new Todo list
   in our database.
*/
const createTaskController = async (req, res) => {
  try {
    /* Destructing the title, body and email from req.body. */
    const { title, body } = req.body;

    /* Checking the current user who is trying to create a new Todo list is a existing user or not using 
       findOne() mongoose method on the basis of the user's id.
       Because the user need to be a existing user to create a new Todo list.
    */
    const existingUser = await userModels.findById(req.params.id);

    /* if the user doesn't exists in our database then we will tell the user that before creating the 
       Todo list you have to Register first. 
    */
    if (!existingUser) {
      return res.status(200).send({
        success: true,
        message: "Please Register first",
      });
    }

    /* if the user exists in our database then we will create that Todo list with all the details
       provided by the user and save it in our database. 
    */
    const CreateTodoList = await new todoModels({
      title,
      body,
      /* Passing the id of the current existing-user.
         Here existingUser will contain the id of the current existing-user. 
      */
      userId: existingUser,
    }).save();

    /* Then we will push the id of the created todo-list in the list field array of the 
       current existing user and save it. 
       Here CreateTodoList will contain the id of the current created todo-list.
    */
    existingUser.list.push(CreateTodoList);
    existingUser.save();

    /* When we successfully create a new Todo List then we will send a response message. */
    res.status(200).send({
      success: true,
      message: "New Todo List Created",
      CreateTodoList,
    });

    /* Catching the error and displaying it. */
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating a Todo List",
      error,
    });
  }
};

/*******************************************************************************************************/
/***************************      2: Reading(get) Task Controller      *********************************/
/*******************************************************************************************************/

/* Creating a controller with name getTaskController which will get a new Todo list
   from our database.
*/
const getTaskController = async (req, res) => {
  try {
    /* Finding all the Todo List of a particular user on basis of its id present in our database 
       by using mongoose find({}) method.
       And sorting the todo-list according to created time.
    */
    const allTodos = await todoModels
      .find({ userId: req.params.id })
      .sort({ createdAt: -1 });

    /* When the todos database is not empty.    
       ie. When we will successfully get all the Todo List from our database for a particular user's id
           then we will send a success response message and display all the todos.  
           Else we will display that no todo-list is available for that particluar user.    
    */
    if (allTodos.length !== 0) {
      /* */

      res.status(200).send({
        success: true,
        message: "All Todo List listed",
        allTodos,
      });

      /* */
    } else {
      res.status(200).send({
        success: true,
        message: "No Todo-List Available",
      });
    }

    /* Catching the error and displaying it. */
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Todo List",
      error,
    });
  }
};

/*******************************************************************************************************/
/****************************    3. Updating a Todo list    ********************************************/
/*******************************************************************************************************/

/* Creating a controller with name updateTaskController which will update an existing Todo list
   in our database on the basis of its id.
*/
const updateTaskController = async (req, res) => {
  try {
    /* Destructing the title,body and email from req.body. */
    const { title, body } = req.body;

    /* Finding the Todo list in our database on the basis of its id and updating the title and body of that
       Todo list by using the findByIdAndUpdate() mongoose method.      
    */
    const updatedTodoList = await todoModels.findByIdAndUpdate(
      /* We know the id is always present in req.params.id. */
      req.params.id,

      /* what we will update -> title and body. */
      { title, body },

      /* In findByIdAndUpdate mongoose method we have an object which has a property call new 
         and we have to make this property as true,if we don't write this object then our categories
         will not get update. 
      */
      { new: true }
    );

    /* When we will successfully update the Todo list then we will send a success response Message. */
    res.status(200).send({
      success: true,
      message: "Todo list Updated Successfully",
      updatedTodoList,
    });

    /* Catching the error and displaying it. */
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in Updating Todo List",
      error,
    });
  }
};

/*******************************************************************************************************/
/*******************************  4. Delete a Todo list.  **********************************************/
/*******************************************************************************************************/

/* Creating a controller with name deleteTaskController which will delete an existing Todo list along with
   the todo-list id from the list array from our database on the basis of its id.
*/
const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.body;

    /* We will first find the user in our database on basis of its id 
       If we find the user with that particular id then we will pull(remove) its 
       todo-list id from the list array.
    */
    const existingUser = await userModels.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });

    /* If the user exists in our database then we will find the user's todo-lists in our databse
       by using the findByIdAndDelete() mongoose method on the basis of its id and delete that todo-list. 
       And we know the id is always present in req.params.id.
    */
    if (existingUser) {
      /* */

      const deletedTodoList = await todoModels.findByIdAndDelete(req.params.id);

      /* When we will successfully delete the Todo List from our database then we will send a 
         success response message. 
      */
      res.status(200).send({
        success: true,
        message: "Successfully Deleted the Todo List",
        deletedTodoList,
      });
    }

    /* Catching the error and displaying it. */
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error is deleting the Todo List",
      error,
    });
  }
};

module.exports = {
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
};
