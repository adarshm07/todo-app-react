export default function Todo({ text, isCompleted, onComplete, onDelete }) {
  return (
    <li className="todo">
      {/* check if the todo is completed or not, this is a prop here and will receive data from parent component. */}
      {/* if completed, it will add the classname 'completed' else ''. */}
      <span className={isCompleted ? "completed" : ""}>{text}</span>
      <button className={isCompleted ? "completed" : ""} onClick={onComplete}>
        Complete
      </button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}
