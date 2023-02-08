import React, { useState } from "react";
import EditCategory from "./EditCategory";

export default function Categories({
  categories,
  handleClick,
  handleDelete,
  handleEditCategory,
}) {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  return (
    <React.Fragment>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        {categories &&
          categories.map((item) => {
            return (
              <div
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
    </React.Fragment>
  );
}
