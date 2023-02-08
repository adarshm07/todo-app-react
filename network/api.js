import { store } from "../store";
import axios from "axios";

const api = function() {
  console.log(store.getState());
};

store.subscribe(api);

const headers = {
  "Content-Type": "application/json",
  //   "x-token": user.user.token,
};

export default api;

// // this function will add todo to the database.
// async function handleAddTodo(name, categoryId) {
//     const data = await fetch("http://localhost:3001/todo/add", {
//       method: "POST",
//       headers
//       body: JSON.stringify({ name, isCompleted: false, categoryId }),
//     }).then(async (res) => {
//       const result = await res.json();
//       // if success, call get api, this is to make sure that we have all the latest data and to get the _id from mongodb.
//       result.status === "success" ? getTodo() : alert("Error.");
//     });
//   }

//   // this is the function to update the todo completed status in database.
//   // the same can be used to edit the todo with some updates.
//   async function handleCompleteTodo(index, id) {
//     const newTodos = [...todos];
//     const data = await fetch(`http://localhost:3001/todo/update/${id}`, {
//       method: "PUT",
//       headers
//     }).then(async (res) => {
//       newTodos[index].isCompleted = true;
//       const result = await res.json();
//       // we can call the getTodo api or just update here in ui without calling the api.
//       // but calling the api will make sure that you get the latest data from database.
//       result.status === "success" ? getTodo() : alert("Error.");
//     });
//   }

//   // delete the todo api call.
//   async function handleDeleteTodo(index) {
//     const newTodos = [...todos];
//     const data = await fetch(`http://localhost:3001/todo/delete/${index}`, {
//       method: "DELETE",
//       headers
//     }).then(async (res) => {
//       const result = await res.json();
//       // we can call the getTodo api or just update here in ui without calling the api.
//       result.status === "success" ? getTodo() : alert("Error.");
//     });
//   }

//   // get api call
//   const getTodo = async () => {
//     const data = await fetch("http://localhost:3001/todo/get", {
//       method: "GET",
//       headers
//     });
//     const res = await data.json();
//     setTodos(res.data);
//   };

//   const getTodoByCategory = async (categoryId) => {
//     const data = await fetch(`http://localhost:3001/todo/get/${categoryId}`, {
//       method: "GET",
//       headers
//     });
//     const res = await data.json();
//     setTodos(res.data);
//   };

//   // get all categories
//   const getAllCategories = async () => {
//     const data = await fetch("http://localhost:3001/category/get", {
//       method: "GET",
//       headers
//     });
//     const res = await data.json();
//     setCategories(res.data);
//   };
