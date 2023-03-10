const headers = {
  "Content-Type": "application/json",
  "x-token": localStorage.getItem("token"),
};

export const getCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/category/get`,
      {
        method: "GET",
        headers,
      }
    );

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const handleDelete = async (categoryId) => {
  try {
    const data = await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/category/delete/${categoryId}`,
      {
        method: "DELETE",
        headers,
      }
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleAddCategory = async (category) => {
  try {
    const data = await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/category/add`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ title: category }),
      }
    );

    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleEditCategory = async (updatedValue, categoryId) => {
  try {
    const data = await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/category/update/${categoryId}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({
          title: updatedValue,
        }),
      }
    );

    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
