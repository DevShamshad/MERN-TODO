const TodoItem = ({ todo, onDelete }) => {
  return (
    <div style={{ margin: "10px 0", border: "1px solid #ddd", padding: "10px" }}>
      <span>{todo.title}</span>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => onDelete(todo.id)}  // ✅ Make sure it's todo.id, not todo._id or something else
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
