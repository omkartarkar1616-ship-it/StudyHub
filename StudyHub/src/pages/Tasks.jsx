import { useState } from "react";
import { useStudyHub } from "../context/StudyHubContext";

function Tasks() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  } = useStudyHub();

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [priorityFilter, setPriorityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
    const [today] = useState(
      () => new Date().toISOString().split("T")[0]
    );
    const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    if (!dueDate) {
      setError("Please select a due date.");
      return;
    }

    setError("");

    addTask(title, dueDate, priority);

    setTitle("");
    setDueDate("");
    setPriority("Medium");
  }

  function clearCompletedTasks() {
    tasks
      .filter((task) => task.completed)
      .forEach((task) => deleteTask(task.id));
  }

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;
  const filteredTasks = tasks.filter((task) => {
  const matchesSearch = task.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    (statusFilter === "Completed" && task.completed) ||
    (statusFilter === "Pending" && !task.completed);

  const matchesPriority =
    priorityFilter === "All" ||
    task.priority === priorityFilter;

  const matchesDate =
    dateFilter === "All" ||
    (dateFilter === "Today" && task.dueDate === today);

  return (
    matchesSearch &&
    matchesStatus &&
    matchesPriority &&
    matchesDate
  );
});

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Tasks</h1>
          <p>
            Track your assignments and stay on top of deadlines.
          </p>
        </div>
      </div>

      <div className="task-summary">
        <div className="task-summary-card">
          <span>Total Tasks</span>
          <strong>{tasks.length}</strong>
        </div>

        <div className="task-summary-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="task-summary-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task or assignment"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        {error && <p className="form-error">{error}</p>}

        <button type="submit">Add Task</button>
      </form>

      <div className="task-filters">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={dateFilter}
          onChange={(event) => setDateFilter(event.target.value)}
        >
          <option value="All">All Dates</option>
          <option value="Today">Due Today</option>
        </select>
      </div>

      {completedCount > 0 && (
        <button
          className="clear-completed-button"
          type="button"
          onClick={clearCompletedTasks}
        >
          Clear Completed Tasks
        </button>
      )}

      <div className="tasks-list">
        {filteredTasks.map((task) => (
          <div
            className={`task-card ${
              task.completed ? "completed" : ""
            }`}
            key={task.id}
          >
            <div className="task-checkbox">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
            </div>

            <div className="task-content">
              <h3>{task.title}</h3>

              <div className="task-details">
                <span>Due: {task.dueDate}</span>

                <span
                  className={`priority ${
                    task.priority.toLowerCase()
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            </div>

            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks yet</h3>
          <p>Add an assignment or task to get started.</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          <h3>No matching tasks</h3>
          <p>Try changing your search or filters.</p>
        </div>
      ) : null}
    </div>
  );
}

export default Tasks;