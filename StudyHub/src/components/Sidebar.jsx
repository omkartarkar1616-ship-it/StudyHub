import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  StickyNote,
  CalendarDays,
  Brain,
  Moon,
  Sun,
} from "lucide-react";

function Sidebar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("studyhub-theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem(
      "studyhub-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Subjects",
      path: "/subjects",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <CheckSquare size={20} />,
    },
    {
      name: "Notes",
      path: "/notes",
      icon: <StickyNote size={20} />,
    },
    {
      name: "Timetable",
      path: "/timetable",
      icon: <CalendarDays size={20} />,
    },
    {
      name: "Quizzes",
      path: "/quizzes",
      icon: <Brain size={20} />,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">StudyHub</div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}

          <span>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;