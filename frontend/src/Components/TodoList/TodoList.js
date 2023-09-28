import React, { useState, useEffect } from "react";

import Layout from "../../Components/Layout/Layout.js";
import "../TodoList/TodoList.css";
import TodoCards from "../TodoCards/TodoCards.js";
import TodoUpdate from "../TodoUpdate/TodoUpdate.js";

import toast from "react-hot-toast";
import axios from "axios";

let id = sessionStorage.getItem("id");
let toUpdateArray = [];

let REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

/* Creating a component name TodoList() where we are writing the logic to show the input fields to
   create a new todo-list and show that created todo-list in a card.  
*/
const TodoList = () => {
  /* */

  /* Creating a useState() hook to hold the value of the inputs fields TITLE and BODY. */
  const [Inputs, setInputs] = useState({ title: "", body: "" });

  /* Creating a useState() hook to store the contents of the inputs fields TITLE and BODY. */
  const [ContentArray, setContentArray] = useState([]);

  /* ***************************************************************************************************** */

  /* Creating a function with name showBody() and passing it in the onClick event of the form's TITLE field.
     ie... when we will click on the TITLE then the BODY area will be shown.
     We are selecting the BODY with its id "textArea" by using the event(document.getElementById) 
     and providing css style to be display as block.
  */
  const showBody = () => {
    document.getElementById("textArea").style.display = "block";
  };

  /* ***************************************************************************************************** */

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

  /* Creating a function with name Add() and passing it in the onClick event of the ADD button.
     ie... when we will click on the ADD button this function will get execute and it will check the
     conditions and accordingly it will save the title and the body in the Content array and display 
     the card in /todo-list page.
  */
  const createTodoList = async () => {
    /* */

    /* If the title field or the body field is empty then we will give a toast error message. */

    if (Inputs.title === "" || Inputs.body === "") {
      /* */

      /* When title or body is empty then we will display a error message. */
      toast.error("Title Or Body Cannot be Empty");

      /* 
       Else we will check the id.
       
       If we get the user's id we wil make a axios post request to the following 
       route and provide all the details of this input fields to the controller of this following route
       ie. createTaskController.
       
       Otherwise we will successfully we will make the input fields empty and give a toast success message. 
      */
    } else {
      /* */

      if (id) {
        /* */

        // await axios.post(`http://localhost:8000/api/v2/create-task/${id}`, {
        //   title: Inputs.title,
        //   body: Inputs.body,
        //   id: id,
        // });

        // await axios.post(
        //   `https://keepitbackdoley.onrender.com/api/v2/create-task/${id}`,
        //   {
        //     title: Inputs.title,
        //     body: Inputs.body,
        //     id: id,
        //   }
        // );

        await axios.post(`${REACT_APP_SERVER_URL}/v2/create-task/${id}`, {
          title: Inputs.title,
          body: Inputs.body,
          id: id,
        });

        /* After successfully adding the todo list we will making the input fields empty. */
        setInputs({ title: "", body: "" });

        /* When the user is creating the todo list by logged in then we will show a toast success message. */
        toast.success("Your Task is added");

        /* */
      } else {
        /* We are storing in the Content array with its setter function ie. setContentArray() with all
           the previous values of the Content array(using spread operator) and also the contents present 
           in the Inputs array.
           ie. We are temporalily storing the user's todo-list in the ContentArray and when 
               he will login we will save the todo-list in our database permanently.
        */
        setContentArray([...ContentArray, Inputs]);

        /* After successfully adding the todo list we will making the input fields empty. */
        setInputs({ title: "", body: "" });

        /* When the user is creating the todo list by logged in then we will show a toast success message. */
        toast.success("Your Task is added");

        /* When the user is creating the todo list without logged in then we will show a toast error message. */
        toast.error("Your Task is not saved! Please Login To Save");
      }
    }
  };

  /* ***************************************************************************************************** */

  /* Creating a function name getTodoLists() to get all the todo-lists. When we will call this function
     then we will get all the todo-lists present in the allTodos variable created in the controller 
     todoListController.js inside the function getTaskController().
     We will use this function where we want to show all the todo-lists.
  */
  const getTodoLists = async () => {
    /* */

    try {
      /* */

      /* Before getting a todo-list card we will check for the user's id.
         If we get the user's id then only we will get the todo-list card from the database
         otherwise we will not get it.
         ie. We will allow a user to get his todo-list card when he is loggedIn to its account. 
      */

      if (id) {
        /* */

        /* Sending network request(ie. making an get api call) using axios to get the todo-lists.
           Directly destructing the response( data's ) in the variable data ie.the response( data's )
           that we will get from the allTodos variable created in the controller function getTaskController()
           which is made for this following route(api endpoint).
        */

        // const { data } = await axios.get(
        //   `http://localhost:8000/api/v2/get-task/${id}`
        // );

        // const { data } = await axios.get(
        //   `https://keepitbackdoley.onrender.com/api/v2/get-task/${id}`
        // );

        const { data } = await axios.get(
          `${REACT_APP_SERVER_URL}/v2/get-task/${id}`
        );

        /* When we successfully get all the todo-lists then we will set the ContentArray with the todo-lists
           present in allTodos variable,else we will show a error message.
        */
        if (data?.success) {
          setContentArray(data?.allTodos);
        } else {
          toast.error("No-Task available");
        }

        /* */
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      console.log(error);
    }
  };

  /* ***************************************************************************************************** */

  /* Creating a function with name deleteTodoList() and passing it to the TodoCards component as children.
     We will use this function in the Delete icon of the TodoCards component.
   
     ie... when we will click on the Delete icon this function will get execute and it will delete that
           particular card on basis of its selected id number of the todo-list card. 
  */
  const deletedTodoList = async (cardId) => {
    try {
      /* */

      /* Before deleting a todo-list card we will check for the user's id.
         If we get the user's id then only we will delete otherwise we will not delete.
         ie. We will allow a user to delete his todo-list card when he is loggedIn to its account. 
      */
      if (id) {
        /* */

        /* Sending network request(ie. making an delete api call) using axios to delete a todo-lists.
           Directly destructing the response( data's ) in the variable data ie.the response( data's )
           that we will get from the controller function getTaskController() which is made for this
           following route(api endpoint).
        */
        const { data } = await axios.delete(
          `${REACT_APP_SERVER_URL}/v2/delete-task/${cardId}`,
          { data: { id: id } }
        );

        // const { data } = await axios.delete(
        //   `http://localhost:8000/api/v2/delete-task/${cardId}`,
        //   { data: { id: id } }
        // );

        // const { data } = await axios.delete(
        //   `https://keepitbackdoley.onrender.com/api/v2/delete-task/${cardId}`,
        //   { data: { id: id } }
        // );

        /* When we successfully deleted the todo-list then we will show a toast success message and
           call the getTodoLists() function else show a error message.
        */
        if (data?.success) {
          toast.success("Your Todo Card is deleted");

          /* recalling the function so that we get the updated value in the initial time. */
          getTodoLists();
        }

        /* */
      } else {
        toast.error("Please! Login First");
      }

      /* Catching the error and displaying it with a toast message. */
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  };

  /* ***************************************************************************************************** */

  /* Creating a function with name displayCurrentCardItem() to get all the details of the Todo-list of 
     the current selected card.
  */
  const displayCurrentCardItem = async (value) => {
    toUpdateArray = ContentArray[value];
  };

  /* ***************************************************************************************************** */

  /* ***************************************************************************************************** */
  /* *************************************** useEffect() hooks ************************************** */

  /* Creating useEffect hook and passing getTodoLists() function to get all the todo-lists in initial time
     and passing createTodoList in the array as dependencies.
  */
  useEffect(() => {
    getTodoLists();
  }, [getTodoLists()]);

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/todo-lists" route.
     because for this route we have provide component {<TodoList />}
     ie. <Route path="/todo-lists" element={<TodoList />} /> 
  */
  return (
    <Layout title={"Todo lists"}>
      <div className="todoList">
        <div className="container-todo container d-flex flex-column">
          <div className="d-flex flex-column w-100 p-1 m-3 todo-inputs-div">
            {/* */}

            {/* Creating input field for TITLE */}
            <input
              type="text"
              placeholder="TITLE"
              name="title"
              // value={Inputs.title || ""}
              value={Inputs.title}
              className="my-3 p-2 todo-inputs"
              onClick={showBody}
              onChange={change}
            />

            {/* Creating input field for BODY */}
            <textarea
              type="text"
              placeholder="BODY"
              name="body"
              // value={Inputs.body || ""}
              value={Inputs.body}
              className="p-2 todo-inputs"
              id="textArea"
              onChange={change}
            />

            {/* */}
          </div>

          {/* Creating a button to add a todo-list in our database */}
          <div className="d-flex w-lg-50 w-100">
            <button
              className="home-btn mt-3 mb-3 px-5 py-2"
              onClick={createTodoList}
            >
              ADD
            </button>
          </div>

          {/* */}
        </div>

        {/* ******************************************************************************************* */
        /* ********************************************************************************************/}

        {/* Mapping in the ContentArray and Using the TodoCards component to display the card we created in 
            TodoCards.js
         ie. After successfully adding the contents in the ContentArray we will display the Todo Card.
             And passing the title,body,index number and a function to delete a particular todo 
             list to the child component ie. TodoCards component so that we can make the Todo card
             with those details and display it here.
        */}
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {/* */}

              {/* Dynamically accessing the above ContentArray of the useState() using map function 
                  and passing all its data's in the items parameter and index's in index parameter.
              */}
              {ContentArray &&
                ContentArray.map((item, index) => (
                  /* */

                  <div
                    key={index}
                    className="mx-3 my-5 col-lg-3 col-sm-5 col-11 mx-lg-5"
                  >
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      cardId={item._id}
                      deleteCardId={deletedTodoList}
                      cardIndex={index}
                      updateCardIndex={displayCurrentCardItem}
                    />
                  </div>

                  /* */
                ))}

              {/* */}
            </div>
          </div>
        </div>

        {/* */}
      </div>

      {/* ******************************************************************************************* */
      /* ********************************************************************************************/}

      {/* Using the TodoUpdate component to display the form to update the todo list when the
          Update button will be click present inside the Todo Card. 
      */}
      <TodoUpdate displayCurrentCardItem={toUpdateArray} />

      {/* ******************************************************************************************* */
      /* ********************************************************************************************/}

      {/* */}
    </Layout>
  );
};

export default TodoList;
