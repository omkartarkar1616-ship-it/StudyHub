import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useStudyHub } from "../context/StudyHubContext";

function Dashboard() {
  const {
    subjects,
    tasks,
    quizResults,
    isLoading,
  } = useStudyHub();

  if (isLoading) {
    return (
      <div className="page">
        <div className="empty-state">
          <h3>Loading StudyHub...</h3>
          <p>Preparing your study dashboard.</p>
        </div>
      </div>
    );
  }

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const completionPercentage =
    tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

  const recentTasks = [...tasks].slice(-5).reverse();
  const quizzesTaken = quizResults.length;

const bestQuizScore =
  quizzesTaken > 0
    ? Math.max(
        ...quizResults.map((result) => result.percentage)
      )
    : 0;

const averageQuizScore =
  quizzesTaken > 0
    ? Math.round(
        quizResults.reduce(
          (total, result) => total + result.percentage,
          0
        ) / quizzesTaken
      )
    : 0;

  const taskChartData = [
    {
      name: "Tasks",
      Completed: completedTasks,
      Pending: pendingTasks,
    },
  ];

  const overallSubjectProgress =
    subjects.length > 0
      ? Math.round(
          subjects.reduce(
            (total, subject) => total + subject.progress,
            0
          ) / subjects.length
        )
      : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your study overview. 👋</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
  <div className="stat-card-top">
    <span>Quizzes Taken</span>
    <span className="stat-icon">🧠</span>
  </div>
  <p>{quizzesTaken}</p>
</div>

<div className="stat-card">
  <div className="stat-card-top">
    <span>Best Quiz Score</span>
    <span className="stat-icon">🏆</span>
  </div>
  <p>{bestQuizScore}%</p>
</div>
        <div className="stat-card">
          <div className="stat-card-top">
            <span>Total Subjects</span>
            <span className="stat-icon">📚</span>
          </div>
          <p>{subjects.length}</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Study Progress</span>
            <span className="stat-icon">📈</span>
          </div>
          <p>{overallSubjectProgress}%</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Total Tasks</span>
            <span className="stat-icon">📝</span>
          </div>
          <p>{tasks.length}</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Completed</span>
            <span className="stat-icon">✅</span>
          </div>
          <p>{completedTasks}</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Pending</span>
            <span className="stat-icon">⏳</span>
          </div>
          <p>{pendingTasks}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Task Completion</h2>
              <p>Your overall task progress</p>
            </div>

            <strong>{completionPercentage}%</strong>
          </div>

          <div className="dashboard-progress">
            <div
              className="dashboard-progress-fill"
              style={{
                width: `${completionPercentage}%`,
              }}
            ></div>
          </div>

          <p className="progress-text">
            {completedTasks} of {tasks.length} tasks completed
          </p>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Subject Progress</h2>
              <p>Your learning progress</p>
            </div>
          </div>

          <div className="subject-progress-list">
            {subjects.length === 0 ? (
              <p className="dashboard-empty">
                No subjects added yet.
              </p>
            ) : (
              subjects.slice(0, 4).map((subject) => (
                <div
                  className="subject-progress-item"
                  key={subject.id}
                >
                  <div className="subject-progress-info">
                    <span>{subject.name}</span>
                    <span>{subject.progress}%</span>
                  </div>

                  <div className="small-progress-bar">
                    <div
                      className="small-progress-fill"
                      style={{
                        width: `${subject.progress}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-card chart-card">
        <div className="card-header">
          <div>
            <h2>Task Completion Chart</h2>
            <p>Completed vs pending tasks</p>
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="Completed" />
              <Bar dataKey="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-card quiz-performance-card">
        <div className="card-header">
          <div>
            <h2>Quiz Performance</h2>
            <p>Your overall quiz performance</p>
          </div>

          <strong>{averageQuizScore}%</strong>
        </div>

        {quizResults.length === 0 ? (
          <p className="dashboard-empty">
            Complete your first quiz to see your performance.
          </p>
        ) : (
          <div className="quiz-performance">
            <div className="quiz-performance-item">
              <span>Quizzes Taken</span>
              <strong>{quizzesTaken}</strong>
            </div>

            <div className="quiz-performance-item">
              <span>Best Score</span>
              <strong>{bestQuizScore}%</strong>
            </div>

            <div className="quiz-performance-item">
              <span>Average Score</span>
              <strong>{averageQuizScore}%</strong>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-card recent-tasks-card">
        <div className="card-header">
          <div>
            <h2>Recent Tasks</h2>
            <p>Your latest assignments</p>
          </div>
        </div>

        {recentTasks.length === 0 ? (
          <p className="dashboard-empty">
            No tasks added yet.
          </p>
        ) : (
          <div className="recent-tasks">
            {recentTasks.map((task) => (
              <div className="recent-task" key={task.id}>
                <div className="recent-task-info">
                  <span
                    className={`task-status ${
                      task.completed ? "completed" : ""
                    }`}
                  >
                    {task.completed ? "✓" : ""}
                  </span>

                  <div>
                    <h3>{task.title}</h3>
                    <p>Due: {task.dueDate}</p>
                  </div>
                </div>

                <span
                  className={`priority ${
                    task.priority.toLowerCase()
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;