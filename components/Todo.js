export default function Todo({ text, isCompleted, onComplete, onDelete }) {
  return (
    <li className="todo">
      <span
        className={isCompleted ? "completed" : ""}
      >
        {text}
      </span>
      {/* <button className={isCompleted ? "completed" : ""} onClick={onComplete}>
        Complete
      </button> */}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}
