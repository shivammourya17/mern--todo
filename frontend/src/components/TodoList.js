import React, { useEffect, useState } from "react";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // ✅ use env variable
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API}/api/todos`).then((res) => setTodos(res.data));
  }, [API]);

  const toggleTodo = async (id) => {
    await axios.put(`${API}/api/todos/${id}`);
    window.location.reload();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/api/todos/${id}`);
    window.location.reload();
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = async (id) => {
    await axios.put(`${API}/api/todos/edit/${id}`, { text: editText });
    setEditingId(null);
    setEditText("");
    window.location.reload();
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          {editingId === todo._id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => saveEdit(todo._id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo._id)}
              />
              <span>{todo.text}</span>
              <button onClick={() => startEditing(todo._id, todo.text)}>Edit</button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
