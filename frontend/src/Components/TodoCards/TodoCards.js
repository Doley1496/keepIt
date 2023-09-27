import React from "react";
import "../TodoCards/TodoCards.css";

import { RiDeleteBin5Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";

/* Creating a component name TodoCards() where we are writing the logic to create cards. 
   We are receiving(accepting) the title,body,index,and deleteIndex as props send by the
   TodoCards component from the TodoList component. 
*/
const TodoCards = ({
  title,
  body,
  cardId,
  deleteCardId,
  cardIndex,
  updateCardIndex,
}) => {
  /* */

  /* Creating a function with name Display() and passing it to the Update button.
     ie... when we will click on the Update button this function will get execute and inside 
     this function we have written the logic to display a form to update the contents of the todo list.
     We are selecting the Update button with its id "todo-update" by using the 
     event(document.getElementById) and providing css style to be display as what the value contains.
  */
  const Display = (value) => {
    document.getElementById("display-form").style.display = value;
  };

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/todo-lists" route after the contents of the TodoList
     component. 
    ie. We will use this component in the TodoList component.
  */
  return (
    <div className="p-3 todo-cards">
      <div>
        {/* Displaying the title of the Todo list which is send as props by the parent(TodoList component). */}
        <h5>{title}</h5>

        {/* Displaying the body of the Todo list which is send as props by the parent(TodoList component).
            And using split function to show only 50 words after that it will show .... 
        */}
        <p className="todo-cards-p">{body.split("", 50)}</p>
      </div>

      {/* Creating the update and the delete button. */}
      <div className="d-flex justify-content-around">
        {/* */}

        {/* Creating a Update react-icon and providing Update text along with it and we are 
            passing two functions Display() and updateCardIndex().
          When the Update icon will be click then Display() and updateCardIndex() function will get execute.
          In Display() function we have written the logic to display a form to update the contents of the todo-list.
          In updateCardIndex() function we have written the logic to update the contents of the todo-list card.       
        */}
        <div
          className="d-flex justify-content-center align-items-center px-2 py-1 card-icon-head "
          onClick={() => {
            Display("block");
            updateCardIndex(cardIndex);
          }}
        >
          <RxUpdate className="card-icons update" />
          Update
        </div>

        {/* Creating a delete react-icon and providing Delete text along with it.
            We are passing(calling) the function deleteIndexNumber() that we are receiving as props 
            from the TodoList component. When the Delete icon will be click then deleteCardId() 
            function will get execute where we have written the logic to delete a particular todo list on 
            basis of the id of that todo list.       
        */}
        <div
          className="d-flex justify-content-center align-items-center px-2 py-1 card-icon-head "
          onClick={() => {
            deleteCardId(cardId);
          }}
        >
          <RiDeleteBin5Line className="card-icons delete" />
          Delete
        </div>

        {/* */}
      </div>
    </div>
  );
};

export default TodoCards;
