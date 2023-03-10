const headers = {
  "Content-Type": "application/json",
  "x-token": localStorage.getItem("token"),
};

export async function getTodos(categoryId = "All") {
  const url =
    categoryId === "All"
      ? `${process.env.REACT_APP_PUBLIC_API_URL}/todo/get`
      : `${process.env.REACT_APP_PUBLIC_API_URL}/todo/get/${categoryId}`;

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  const data = await response.json();
  return data.data;
}

export const addTodo = async (todoData) => {
  const response = await fetch(
    `${process.env.REACT_APP_PUBLIC_API_URL}/todo/add`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(todoData),
    }
  );

  const data = await response.json();

  return data;
};

export async function updateTodo(id) {
  const requestOptions = {
    method: "PUT",
    headers,
    body: JSON.stringify({ isCompleted: true }),
  };
  const response = await fetch(
    `${process.env.REACT_APP_PUBLIC_API_URL}/todo/update/${id}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function deleteTodo(todoId) {
  const response = await fetch(
    `${process.env.REACT_APP_PUBLIC_API_URL}/todo/delete/${todoId}`,
    {
      method: "DELETE",
      headers,
    }
  );
  const data = await response.json();

  return { status: "success", data };
}