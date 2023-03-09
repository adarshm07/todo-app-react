import React, { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

export default function Categories() {
  // state to show/hide modal
  const [show, setShow] = useState(false);
  // keeping default value as null as there is no selected item by default.
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  const [categories, setCategories] = useState([]);
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const headers = {
    "Content-Type": "application/json",
    "x-token": localStorage.getItem("token"),
  };

  // get all categories
  const getAllCategories = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/category/get`,
      {
        method: "GET",
        headers,
      }
    );
    const res = await data.json();
    setCategories(res.data);
  };

  const handleDelete = async (categoryId) => {
    await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/category/delete/${categoryId}`,
      {
        method: "DELETE",
        headers,
      }
    ).then(async (res) => {
      const result = await res.json();
      result.status === "success" ? getAllCategories() : alert("Error.");
    });
  };

  const addCategory = async (value) => {
    console.log(value);
    try {
      const data = await fetch(
        `${process.env.REACT_APP_PUBLIC_API_URL}/category/add`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ title: value }),
        }
      );

      const res = await data.json();
      res.status === "success" ? getAllCategories() : alert("Error");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCategory = async (updatedValue, categoryId) => {
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

      const res = await data.json();
      res.status === "success" ? getAllCategories() : alert("Error");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [show]);

  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <React.Fragment>
      {/* <Layout> */}
      <div className="container">
        <h3 className="fs-4 mt-4">Categories</h3>
        <button className="add-category" onClick={handleShow}>
          Add category
        </button>

        {/* <Link to={"/todo"}>Go to todo</Link> */}
        <AddCategory show={show} hide={handleClose} onSubmit={addCategory} />
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          {categories &&
            categories.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60% 10% 10%",
                    gap: "20px",
                    margin: "10px",
                  }}
                >
                  <li
                    className="category"
                    onClick={() => handleClick(item._id)}
                    value={item._id}
                    name={item._id}
                  >
                    {item.title}
                  </li>

                  <button onClick={() => handleShow(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>

                  <EditCategory
                    show={show}
                    hide={handleClose}
                    onSubmit={handleEditCategory}
                    selectedItem={selectedItem}
                  />
                </div>
              );
            })}
        </ul>
      </div>
    </React.Fragment>
  );
}
