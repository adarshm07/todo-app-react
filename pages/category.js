import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddCategory from "../components/Category/AddCategory";
import Categories from "../components/Category/Categories";
import Layout from "../components/Layout";

export default function Category() {
  const user = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const headers = {
    "Content-Type": "application/json",
    "x-token": user.user.token,
  };

  // get all categories
  const getAllCategories = async () => {
    const data = await fetch("http://localhost:3001/category/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-token": user.user.token,
      },
    });
    const res = await data.json();
    setCategories(res.data);
  };

  const handleDelete = async (categoryId) => {
    const data = await fetch(
      `http://localhost:3001/category/delete/${categoryId}`,
      {
        method: "DELETE",
        headers,
      }
    ).then(async (res) => {
      const result = await res.json();
      // we can call the getTodo api or just update here in ui without calling the api.
      result.status === "success" ? getAllCategories() : alert("Error.");
    });
  };

  const addCategory = async (values) => {
    try {
      const data = await fetch("http://localhost:3001/category/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": user.user.token,
        },
        body: JSON.stringify(values),
      });

      const res = await data.json();
      // if register success, redirect to login page
      res.status === "success" ? getAllCategories() : alert("Error");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCategory = async (updatedValue, categoryId) => {
    console.log(categoryId);
    try {
      const data = await fetch(
        `http://localhost:3001/category/update/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-token": user.user.token,
          },
          body: JSON.stringify({
            title: updatedValue,
          }),
        }
      );

      const res = await data.json();
      // if register success, redirect to login page
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
    <Layout>
      <div className="container">
        <h3 className="fs-4 mt-4">Categories</h3>
        <button className="add-category" onClick={handleShow}>
          Add category
        </button>

        <Link href={"/todo"}>Go to todo</Link>
        <AddCategory show={show} hide={handleClose} onSubmit={addCategory} />
        <Categories
          categories={categories}
          handleClick={handleClick}
          handleDelete={handleDelete}
          handleEditCategory={handleEditCategory}
        />
      </div>
    </Layout>
  );
}
