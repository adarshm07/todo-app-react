import { axiosClient } from "../apiClient";

export function addTodo() {
  return axiosClient.post("/todo/add");
}

export function getTodos() {
  return axiosClient.get("/todo/get");
}

(async () => {
  console.log("data", await getTodos());
})();
