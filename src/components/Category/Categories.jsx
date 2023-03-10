import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCategories,
  handleAddCategory,
  handleDelete,
  handleEditCategory,
} from "../../pages/api/categories";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

export default function Categories() {
  // state to show/hide modal
  const [show, setShow] = useState(false);
  // keeping default value as null as there is no selected item by default.
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  // get all categories
  const getAllCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const deleteCategory = async (categoryId) => {
    await handleDelete(categoryId).then((res) => {
      const response = res.json();
      response.status === "success" ? getAllCategories() : alert("Error.");
    });
  };

  const addCategory = async (category) => {
    try {
      await handleAddCategory(category).then((res) => {
        res.status === "success" ? getAllCategories() : alert("Error");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = async (updatedValue, categoryId) => {
    try {
      await handleEditCategory(updatedValue, categoryId).then((res) => {
        res.status === "success" ? getAllCategories() : alert("Error");
      });
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

        <Link to={"/todo"}>Go to todo</Link>
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
                  <button onClick={() => deleteCategory(item._id)}>
                    Delete
                  </button>

                  <EditCategory
                    show={show}
                    hide={handleClose}
                    onSubmit={editCategory}
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
