export default function TodoForm({ onSubmit, categories }) {
  return (
    <form
      className="todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.target.elements.todoText.value, e.target.elements.category.value);
        e.target.elements.todoText.value = "";
      }}
    >
      <input type="text" name="todoText" placeholder="Add Todo" />
      <select name="category">
        {categories &&
          categories.map((item, index) => {
            return <option key={index} value={item._id} name={index}>{item.title}</option>;
          })}
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
}
