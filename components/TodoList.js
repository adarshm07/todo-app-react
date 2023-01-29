import Todo from "./Todo";

export default function TodoList({ todos, onComplete, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
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
