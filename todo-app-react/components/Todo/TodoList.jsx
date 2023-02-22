import Todo from "./Todo";

export default function TodoList({ todos, onComplete, onDelete }) {
  return (
    <ul className="todo-list">
      {/* this will check if todo is empty or not, if not, this will map the data. */}
      {todos &&
        todos.map((todo, index) => (
          <Todo
            key={index}
            text={todo.name}
            isCompleted={todo.isCompleted}
            onComplete={() => onComplete(index, todo._id)}
            onDelete={() => onDelete(todo._id)}
          />
        ))}
    </ul>
  );
}
