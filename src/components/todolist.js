import { v4 as uuidv4 } from "uuid";
import { isDefined } from "../utils/isDefined.js";
import { getSavedItems, saveItems } from "../utils/getLocalStorage.js";
import { getId, getIndex } from "../utils/getId.js";
import "../style.css";
import "../images/bin.png";

// grabs the todos from local storage, and if there are no todos it will return an empty array.
const todos = getSavedItems();

// Creates the DOM elements for each todo item to be displayed in the todo list.
function displayItems(item) {
  // create elements
  const container = document.createElement("div");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  const checkbox = document.createElement("input");
  const input = document.createElement("input");

  // set attributes for elements
  input.setAttribute("type", "text");
  input.setAttribute("value", item.toDoItem);
  input.setAttribute("placeholder", "Untitled Item");
  input.setAttribute("readonly", "readonly");

  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = item.complete;

  deleteButton.textContent = "Delete";
  editButton.textContent = "Edit";

  // add class names to elements

  container.classList.add("todo-item-container");
  deleteButton.classList.add("delete-btn");
  editButton.classList.add("edit-btn");
  input.classList.add("todo-text");

  // Determines if the checkbox should have the readonly attribute and a completed class
  if (checkbox.checked) {
    input.setAttribute("readonly", "readonly");
    input.classList.add("completed");
  }

  // appends all created elements to the div container
  container.appendChild(checkbox);
  container.appendChild(input);
  container.appendChild(editButton);
  container.appendChild(deleteButton);

  // Event Listeners for each element and based upon the event it :-

  // handles the edit functionality by capturing the event, saves the new value to local storage and appends the updated item to the DOM.
  input.addEventListener("change", (e) => {
    const todo = getId(todos, item);
    if (isDefined(todo)) item.toDoItem = e.target.value;

    saveItems(todos);
    appendToDoItems(todos);
  });

  // handles the checkbox functionality by toggling its completed state, saves the new value to local storage and appends the updated item to the DOM.
  checkbox.addEventListener("change", () => {
    const todo = getId(todos, item);
    if (isDefined(todo)) todo.complete = !todo.complete;

    saveItems(todos);
    appendToDoItems(todos);
  });

  // handles the delete functionality by removing the item from the array, saving the change to local storage and appends the changes to the DOM.
  deleteButton.addEventListener("click", () => {
    const todo = getIndex(todos, item);
    if (todo >= 0) todos.splice(todo, 1);

    saveItems(todos);
    appendToDoItems(todos);
  });

  // listens for the edit button being clicked and removes the readonly attribute and updates the textContent of the button.

  editButton.addEventListener("click", () => {
    input.removeAttribute("readonly", "readonly");
    editButton.textContent = "Save";
  });

  return container;
}

// appends the to do list to the DOM
function appendToDoItems(todosList) {
  const todoContainer = document.querySelector("#to-dos");
  todoContainer.innerHTML = "";

  // returns each todo item that is completed
  const stillToDo = todosList.filter((item) => item.complete);

  // displays the completed todo count
  const summary = document.querySelector(".todo-summary");
  summary.textContent = ` ${stillToDo.length} / ${todosList.length} Completed Items`;

  // Determines if each todo item should be displayed, or if an empty message when there are no todo items.
  if (todosList.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "No to-dos to show";
    todoContainer.appendChild(emptyMessage);
    return;
  }

  todosList.forEach((item) => {
    todoContainer.appendChild(displayItems(item));
  });
}

// Initialize the todo list to show either the todos or an empty message
appendToDoItems(todos);

function handleFormSubmit(e) {
  const usersInput = e.target.elements.toDo.value.trim();
  e.preventDefault();

  if (usersInput.length === 0) {
    alert("please provide a todo item");
    return;
  }

  todos.push({
    toDoItem: usersInput,
    id: uuidv4(),
    complete: false,
  });

  saveItems(todos);
  appendToDoItems(todos);
  e.target.elements.toDo.value = "";
}

document.querySelector("form").addEventListener("submit", handleFormSubmit);

// hot module replacement (not required)
import.meta.webpackHot.accept();
import.meta.webpackHot.dispose(() => {
  // remove listener from form when the module is updated...
  document
    .querySelector("form")
    .removeEventListener("submit", handleFormSubmit);
});
