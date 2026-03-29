import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import "./App.css";

function App() {
  const [newTaskText, setNewTaskText] = useState("");

  const tasks = useQuery(api.tasks.getTasks);

  const addTask = useMutation(api.tasks.addTask);
  const toggleTask = useMutation(api.tasks.toggleTask);

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    await addTask({ text: newTaskText.trim() });
    setNewTaskText("");
  }

  return (
    <>
      <section id="center">
        <h1>To-Do List</h1>

        <form
          onSubmit={handleAddTask}
          style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
        >
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button type="submit">Add</button>
        </form>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks?.map((task) => (
            <li
              key={task._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleTask({ id: task._id })}
              />
              <span
                style={{
                  textDecoration: task.isCompleted ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
