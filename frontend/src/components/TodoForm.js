import React, { useState } from "react";
import axios from "axios";

function TodoForm() {
  const [text, setText] = useState("");
  const API = process.env.REACT_APP_API_URL;

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text) return;
    await axios.post(`${API}/api/todos`, { text });
    setText("");
    window.location.reload();
  };

  return (
    <form onSubmit={addTodo}>
      <input
        type="text"
        placeholder="Enter todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
