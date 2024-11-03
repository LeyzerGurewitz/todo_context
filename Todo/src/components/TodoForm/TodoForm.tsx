import React, { useState } from "react";
import "./TodoForm.css";

interface TodoFormProps {
  addTodo: (title: string) => Promise<void>;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newTodo.trim()) {
      return;
    }
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new Todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
