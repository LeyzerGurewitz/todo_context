import React from 'react'
import TodoList from './components/TodoList/TodoList'
import { TodoProvider } from "./components/TodoContext/TodoContext";
import "./App.css"

const App:React.FC = () => {
  return (
    <TodoProvider>
    <TodoList />
  </TodoProvider>
  )
}

export default App