import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <h1>MERN Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
