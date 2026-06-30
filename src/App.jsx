import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getProductivityAdvice } from "./gemini";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

function App() {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim() || !deadline) return;

    const newTask = {
      id: Date.now(),
      task,
      deadline,
      priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTask("");
    setDeadline("");
    setPriority("Medium");
    toast.success("Task added successfully!");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted!");
  };

  const clearAllTasks = () => {
    setTasks([]);
    toast.success("All tasks cleared!");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const analyzeTasks = async () => {
    if (tasks.length === 0) return;

    setLoading(true);

    try {
      const result = await getProductivityAdvice(tasks);
      setAdvice(result);
    } catch (error) {
      console.error(error);
      setAdvice(error.message);
    }

    setLoading(false);
  };

  const totalTasks = tasks.length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const dueSoonTasks = tasks.filter(
    (task) =>
      new Date(task.deadline) - new Date() <
        3 * 24 * 60 * 60 * 1000 &&
      new Date(task.deadline) - new Date() > 0
  ).length;

  const productivityScore = Math.max(
    0,
    100 - highPriorityTasks * 15 - dueSoonTasks * 10
  );

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

   return (
  <div
   style={{
  minHeight: "100vh",
  background: "linear-gradient(135deg, #020617, #0f172a, #1e293b)",
  color: "white",
  fontFamily: "Arial",
  padding: "30px",
  maxWidth: "1200px",
  margin: "0 auto",
}}
  >
  
    <Header />

    <Dashboard
      totalTasks={totalTasks}
      highPriorityTasks={highPriorityTasks}
      dueSoonTasks={dueSoonTasks}
      productivityScore={productivityScore}
      completedTasks={completedTasks}
      pendingTasks={pendingTasks}
    />

<h2 style={{ marginBottom: "15px", marginTop: "30px" }}>
  🔍 Search Tasks
</h2>

<input
  type="text"
  placeholder="Search by task name..."
   value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    borderRadius: "12px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    fontSize: "16px",
  }}
/>

<div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap",
  }}
>
  {["All", "Pending", "Completed", "High"].map((type) => (
    <button
      key={type}
      onClick={() => setFilter(type)}
      style={{
        padding: "8px 16px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        background: filter === type ? "#3b82f6" : "#334155",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {type}
    </button>
  ))}
</div>

    {/* Input Section */}

    <div
  style={{
    background: "#0f172a",
    padding: "25px",
    borderRadius: "18px",
    border: "1px solid #334155",
    marginBottom: "40px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    alignItems: "center", 
    transition: "0.3s",
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
  }}
>
    
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{
          padding: "12px",
          width: "220px",
          borderRadius: "10px",
          border: "1px solid #334155",
          background: "#1e293b",
          transition: "0.3s",
          color: "white",
        }}
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #334155",
          background: "#1e293b", 
          transition: "0.3s",
          color: "white",
        }}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #334155",
          background: "#1e293b", 
          transition: "0.3s",
          color: "white",
        }}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button
        onClick={addTask}
        style={{
          padding: "12px 22px",
          border: "none",
          borderRadius: "10px",
          background: "#3b82f6",
          color: "white",
          cursor: "pointer", 
          transition: "0.3s",
          fontWeight: "bold",
        }}
      >
        Add Task
      </button>

      <button
        onClick={clearAllTasks}
        style={{
          padding: "12px 22px",
          border: "none",
          borderRadius: "10px",
          background: "#ef4444",
          color: "white",
          cursor: "pointer", 
          transition: "0.3s",
          fontWeight: "bold",
        }}
      >
        Clear All
      </button>

      <button
        onClick={analyzeTasks}
        style={{
          padding: "12px 22px",
          border: "none",
          borderRadius: "10px",
          background: "#22c55e",
          color: "white",
          cursor: "pointer", 
          transition: "0.3s",
          fontWeight: "bold",
        }}
      >
        Analyze Tasks with AI
      </button>
    </div>

    {/* Tasks */}

    <div style={{ marginTop: "40px" }}>
     <h2 style={{ marginBottom: "20px" }}>
    📋 Your Tasks
     </h2>
 

      {tasks.length === 0 && (
  <p
    style={{
      color: "#94a3b8",
      marginTop: "20px",
    }}
  >
    No tasks yet. Add your first task 🚀
  </p>
)}

      {[...tasks]
      .filter((item) => {
  const matchesSearch = item.task
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesFilter =
    filter === "All"
      ? true
      : filter === "Pending"
      ? !item.completed
      : filter === "Completed"
      ? item.completed
      : item.priority === "High";

  return matchesSearch && matchesFilter;
})

        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#0f172a",
              border: "1px solid #3b82f6",
              padding: "20px",
              borderRadius: "16px",
              marginTop: "15px", 
              transition: "0.3s",
              boxShadow: "0 10px 30px rgba(0,0,0,.45)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px", 
                transition: "0.3s",
                marginBottom: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleComplete(item.id)}
              />

              <h3
                style={{
                  color: item.completed ? "#94a3b8" : "#38bdf8",
                  textDecoration: item.completed
                    ? "line-through"
                    : "none",
                  margin: 0,
                }}
              >
                {item.task}
              </h3>
            </div>

            <p>📅 Deadline: {item.deadline}</p>

            <p>
              ⏳{" "}
              {(() => {
                const daysLeft = Math.ceil(
                  (new Date(item.deadline) - new Date()) /
                    (1000 * 60 * 60 * 24)
                );

                if (daysLeft < 0) return "Overdue 🚨";
                if (daysLeft === 0) return "Due Today";

                return `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`;
              })()}
            </p>

            <p
              style={{
                color:
                  item.priority === "High"
                    ? "#ef4444"
                    : item.priority === "Medium"
                    ? "#facc15"
                    : "#22c55e",
                fontWeight: "bold",
              }}
            >
              ⭐ Priority: {item.priority}
            </p>

            {new Date(item.deadline) - new Date() <
              3 * 24 * 60 * 60 * 1000 &&
              new Date(item.deadline) - new Date() > 0 && (
                <p
                  style={{
                    color: "#facc15",
                    fontWeight: "bold",
                  }}
                >
                  ⚠️ Due Soon
                </p>
              )}

            <button
              onClick={() => deleteTask(item.id)}
              style={{
                marginTop: "10px",
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                background: "#ef4444",
                color: "white", 
                transition: "0.3s",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
    </div>

    {/* AI Advice */}

    <div style={{ marginTop: "40px" }}>
      <h2
  style={{
    fontSize: "28px",
    marginBottom: "20px",
  }}
>
🤖 AI Productivity Assistant
</h2>

      {loading && <p>Analyzing tasks...</p>}

      {advice && (
        <div
        style={{
        whiteSpace: "pre-wrap",
        border: "1px solid #3b82f6",
        padding: "20px",
        borderRadius: "16px",
        marginTop: "10px", 
        transition: "0.3s",
        backgroundColor: "#0f172a",
        }}
        >
          {advice}
        </div>
      )}
    </div>
  </div>
);
}

export default App;