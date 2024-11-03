import React from "react";
import "./TodoList.css";
import TodoForm from "../TodoForm/TodoForm";
import BasicSpinner from "../BasicSpinner/BasicSpinner";
import TodoItem from "../TodoItem/TodoItem";
import { useTodoContext } from "../TodoContext/TodoContext";

const TodoList: React.FC = () => {
  const { todos, isLoading, addTodo, deleteTodo, toggleCompletion } =
    useTodoContext();

  return (
    <div className="todo-list">
      <h1>ToDo List</h1>
      <TodoForm addTodo={addTodo} />
      <ul>
        {isLoading ? (
          <BasicSpinner />
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleCompletion={toggleCompletion}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
