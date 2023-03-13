import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCategories,
  handleAddCategory,
  handleDelete,
  handleEditCategory,
} from "./api/categories";
import AddCategory from "../components/Category/AddCategory";
import EditCategory from "../components/Category/EditCategory";
import Layout from "../components/Layout";

export default function Categories() {
  // state to show/hide modal
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  // keeping default value as null as there is no selected item by default.
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleClose = (modal) => {
    modal === "addCat" ? setShowAdd(false) : setShowEdit(false);
  };

  const handleShowEditCategory = (item) => {
    setSelectedItem(item);
    setShowEdit(true);
  };
  const handleShowAddCategory = () => {
    setShowAdd(true);
  };

  // get all categories
  const getAllCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const deleteCategory = async (categoryId) => {
    await handleDelete(categoryId).then((response) => {
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
  }, [showAdd, showEdit]);

  return (
    <React.Fragment>
      <Layout>
        <div className="container">
          <h3 className="fs-4 mt-4">Categories</h3>
          <button className="add-category me-2" onClick={handleShowAddCategory}>
            Add category
          </button>

          <Link to={"/todo"}>Go to todo</Link>
          <AddCategory
            show={showAdd}
            hide={() => handleClose("addCat")}
            onSubmit={addCategory}
          />
          <ul style={{ listStyle: "none", padding: 0 }}>
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
                    <li className="category" value={item._id} name={item._id}>
                      {item.title}
                    </li>

                    <button
                      className="btn btn-primary"
                      onClick={() => handleShowEditCategory(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => deleteCategory(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
          </ul>
          <EditCategory
            show={showEdit}
            hide={handleClose}
            onSubmit={editCategory}
            selectedItem={selectedItem}
          />
        </div>
      </Layout>
    </React.Fragment>
  );
}
