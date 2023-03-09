import React, { useEffect, useState } from "react";
import AddCategory from "../components/Category/AddCategory";
import Categories from "../components/Category/Categories";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  // useEffect(() => {
  //   getAllCategories();
  // }, [show]);

  const handleClick = (e) => {
    console.log(e);
  };
  return (
    <Layout>
      <div className="container">
        <h3 className="fs-4 mt-4">Categories</h3>
        <button className="add-category" onClick={handleShow}>
          Add category
        </button>

        <Link to={"/todo"}>Go to todo</Link>
        <AddCategory show={show} hide={handleClose} onSubmit={addCategory} />
        {/* <Categories
          categories={categories}
          handleClick={handleClick}
          handleDelete={handleDelete}
          handleEditCategory={handleEditCategory}
        /> */}
      </div>
    </Layout>
  );
}
