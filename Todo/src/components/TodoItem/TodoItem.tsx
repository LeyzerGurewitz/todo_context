import React from "react";
import { Todo } from "../TodoContext/TodoContext";
import "./TodoItem.css";

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string) => Promise<void>;
  toggleCompletion: (id: string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  deleteTodo,
  toggleCompletion,
}) => {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div
        className="todo-status-and-text"
        onClick={() => toggleCompletion(todo.id)}
      >
        <span>{todo.completed ? "✔️" : "❌"}</span>
        <span>{todo.title}</span>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
