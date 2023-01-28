export default function TodoForm({ onSubmit }) {
  return (
    <form
      className="todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.target.elements.todoText.value);
        e.target.elements.todoText.value = "";
      }}
    >
      <input type="text" name="todoText" placeholder="Add Todo" />
      <button type="submit">Add Todo</button>
    </form>
  );
}
