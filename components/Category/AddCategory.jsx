import React from "react";
import { Field, Form, Formik } from "formik";
import Modal from "react-bootstrap/Modal";

export default function AddCategory({ show, hide, onSubmit }) {
  return (
    <React.Fragment>
      <Modal show={show} onHide={hide} centered>
        <div className="container">
          <div className="add-category-modal">
            <h2 className="fs-4">Add Category</h2>
            <Formik
              initialValues={{
                title: "",
              }}
              onSubmit={onSubmit}
            >
              <Form className="login-input">
                <label htmlFor="title">Category Name</label>
                <Field
                  id="title"
                  name="title"
                  placeholder="Category Name"
                  type="text"
                />
                <button type="submit" onClick={hide}>
                  Add Category
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
