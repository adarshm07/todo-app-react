import React from "react";
import Modal from "react-bootstrap/Modal";

export default function AddCategory({ show, hide, onSubmit }) {
  return (
    <React.Fragment>
      <Modal show={show} onHide={hide} centered>
        <div className="container">
          <div className="add-category-modal">
            <h2 className="fs-4">Add Category</h2>
            <form
              className="todo-form"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e.target.elements.category.value);
              }}
            >
              <input type="text" name="category" placeholder="Category Name" />
              <button type="submit" onClick={hide}>
                Add Category
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
