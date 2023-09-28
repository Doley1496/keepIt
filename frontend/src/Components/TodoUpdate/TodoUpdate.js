import React, { useState, useEffect } from "react";
import "../TodoUpdate/TodoUpdate.css";

import toast from "react-hot-toast";
import axios from "axios";

let id = sessionStorage.getItem("id");

let REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const TodoUpdate = ({ displayCurrentCardItem }) => {
  /* */

  /* Creating a useState() hook to hold the value of the inputs fields TITLE and BODY. */
  const [Inputs, setInputs] = useState({ title: "", body: "" });

  /* Creating a function with name Display() and passing it to the Close button.
     ie... when we will click on the Close button this function will get execute and inside 
     this function we have written the logic to close that particular update form. 
     We are selecting the Close button with its id "todo-update" by using the 
     event(document.getElementById) and providing css style to be display as what the value contains.
  */
  const Display = (value) => {
    document.getElementById("display-form").style.display = value;
  };

  /* Creating a function with name change() and passing it in the onChange event of the email fields and the
     password fields of the login form's.
     onChange() event will temporarily save the data of the input fields.
     ie.. The onChange() event attribute fires the event when the element loses focus.
  */
  const change = (event) => {
    /* Destructing the name and value from event.target. */
    const { name, value } = event.target;

    /* We are setting(storing) the Inputs array ie. setInputs() with all the previous values of the 
       Inputs array(using spread operator) and also storing the name(title and body) 
       and value(what title and body provided by the user) in key value pairs.
    */
    setInputs({ ...Inputs, [name]: value });
  };

  /* ***************************************************************************************************** */

  /* Creating a function with name updateTodoList() and passing it to the TodoCards component as children.
     We will use this function in the Update icon of the TodoCards component.
   
     ie... when we will click on the Update icon this function will get execute and it will update that
           particular card on basis of its selected index number of the todo-list card. 
  */
  const updateTodoList = async () => {
    /* */

    /* Before updating a todo-list card we will check for the user's id.
       If we get the user's id then only we will update otherwise we will not update.
       ie. We will allow a user to update his todo-list card when he is loggedIn to its account.
    */

    try {
      /* */

      /* Before getting a todo-list card we will check for the user's id.
         If we get the user's id then only we will get the todo-list card from the database
         otherwise we will not get it.
         ie. We will allow a user to get his todo-list card when he is loggedIn to its account. 
      */

      if (id) {
        /* */

        /* Sending network request(ie. making an put api call) using axios to update a todo-lists.
           Directly destructing the response( data's ) in the variable data ie.the response( data's )
           that we will get from the controller function updateTaskController() which is made for this
           following route(api endpoint).
        */
        const { data } = await axios.put(
          `${REACT_APP_SERVER_URL}/v2/update-task/${displayCurrentCardItem._id}`,
          Inputs
        );

        // const { data } = await axios.put(
        //   `http://localhost:8000/api/v2/update-task/${displayCurrentCardItem._id}`,
        //   Inputs
        // );

        // const { data } = await axios.put(
        //   `https://keepitbackdoley.onrender.com/api/v2/update-task/${displayCurrentCardItem._id}`,
        //   Inputs
        // );

        /* When we successfully updated the todo-list then we will show a toast success message and
           call the getTodoLists() function else show a error message.
        */
        if (data?.success) {
          toast.success("Your Todo Card is updated");

          /* After successfully updating the todo list we will making the input fields empty. */
          setInputs({ title: "", body: "" });

          /* recalling the function so that we get the updated value in the initial time. */
          // getTodoLists();

          /* */
        } else {
          toast.error("Unable to update Todo-List.");
        }
      } else {
        toast.error("Please Login to update your Todo-List.");
      }

      /* */
    } catch (error) {
      /* Catching the error and displaying it with a toast message. */
      console.log(error);
    }
  };

  /* ***************************************************************************************************** */

  /* ***************************************************************************************************** */
  /* *************************************** useEffect() hooks ************************************** */

  /* Creating useEffect hook and passing setInputs() function to set all the todo-lists fields.
     and passing the function displayCurrentCardItem as dependencies.
  */
  useEffect(() => {
    setInputs({
      title: displayCurrentCardItem.title,
      body: displayCurrentCardItem.body,
    });
  }, [displayCurrentCardItem]);

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/todo-lists" route.
     when the Update button will be click.
  */
  return (
    <div id="display-form" className="todo-update">
      <div className="container d-flex justify-content-center align-items-start flex-column p-3 m-0 ">
        {/* Providing a heading for the Update form. */}
        <h2>Update Your Todo List</h2>

        {/* Creating input field for TITLE */}
        <input
          type="text"
          name="title"
          placeholder="TITLE"
          value={Inputs.title || ""}
          onChange={change}
          className="todo-inputs my-4 w-100 p-3"
        />

        {/* Creating input field for BODY */}
        <textarea
          name="body"
          placeholder="BODY"
          value={Inputs.body || ""}
          onChange={change}
          className="todo-inputs w-100 p-3"
        />

        {/* Creating two buttons Update button and Close button. */}
        <div>
          {/* Creating a Update button and providing Update text along with it and we are passing two functions 
              Display() and updateCardIndex().

          When the Update icon will be click then Display() and updateCardIndex() function will get execute.
          In Display() function we have written the logic to display a form to update the contents of the todo-list.
          In updateCardIndex() function we have written the logic to update the contents of the todo-list card.       
          */}
          <button className="btn btn-dark my-4" onClick={updateTodoList}>
            Update
          </button>

          {/* Creating a Close button and calling the Display() function on its onClick() event.
              When the Close button will be click then Display() function will get execute where we have written 
              the logic to close the update form.
         */}
          <button
            className="btn btn-danger my-4 mx-3"
            onClick={() => {
              Display("none");
            }}
          >
            Close
          </button>
        </div>

        {/* */}
      </div>
    </div>
  );
};

export default TodoUpdate;
