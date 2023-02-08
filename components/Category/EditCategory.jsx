import React from "react";
import Modal from "react-bootstrap/Modal";

export default function EditCategory({ show, hide, onSubmit, selectedItem }) {
  return (
    <React.Fragment>
      <Modal show={show} onHide={hide} centered>
        <div className="container">
          <div className="add-category-modal">
            <h2 className="fs-4">Edit Category</h2>
            <form
              className="todo-form"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e.target.elements.category.value, selectedItem._id);
              }}
            >
              <input
                type="text"
                name="category"
                defaultValue={selectedItem?.title}
              />
              <button type="submit" onClick={hide}>
                Update Category
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
