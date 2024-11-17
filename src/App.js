import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTodo = (e) => {
    if (newTodo !== "" && e.key === "Enter") {
      const newTask = { text: newTodo, pending: false };
      setTodos((prev) => [...prev, newTask]);
      setNewTodo("");
    }
  };

  const togglePending = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].pending = !updatedTodos[index].pending;
    setTodos(updatedTodos);
  };

  const startEditing = (index, todo) => {
    setEditingIndex(index);
    setEditingText(todo);
  };

  const handleEditSave = (e, index) => {
    if (editingText !== "" && e.key === "Enter") {
      const updatedTodos = [...todos];
      updatedTodos[index] = { text: editingText, pending: false };
      setTodos(updatedTodos);
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>TODO List</h1>
      <input
        type="text"
        placeholder="Add new task ..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleAddTodo}
      />
      <ul>
        {todos.map((todo, index) => (
          <>
            <li key={index}>
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editingText?.text}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => handleEditSave(e, index)}
                  />
                </>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: todo?.pending ? "line-through" : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => togglePending(index)}
                  >
                    {todo.text}
                  </span>
                  <button onClick={() => handleDeleteTodo(index)}>
                    delete
                  </button>
                  <button onClick={() => startEditing(index, todo)}>
                    edit
                  </button>
                </>
              )}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default App;
