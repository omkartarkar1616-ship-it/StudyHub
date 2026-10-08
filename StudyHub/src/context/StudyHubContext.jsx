import { createContext, useContext, useEffect, useState } from "react";

const StudyHubContext = createContext();

function getStoredData(key, fallback) {
  const savedData = localStorage.getItem(key);

  return savedData ? JSON.parse(savedData) : fallback;
}

export function StudyHubProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const [quizResults, setQuizResults] = useState(() =>
    getStoredData("studyhub-quiz-results", [])
  );

  const [subjects, setSubjects] = useState(() =>
    getStoredData("studyhub-subjects", [
      {
        id: 1,
        name: "Web Development",
        teacher: "Prof. Sharma",
        progress: 75,
      },
      {
        id: 2,
        name: "Database Management",
        teacher: "Prof. Patil",
        progress: 50,
      },
    ])
  );

  const [tasks, setTasks] = useState(() =>
    getStoredData("studyhub-tasks", [
      {
        id: 1,
        title: "Complete React assignment",
        dueDate: "2026-10-08",
        priority: "High",
        completed: false,
      },
      {
        id: 2,
        title: "Study DBMS chapter 4",
        dueDate: "2026-10-10",
        priority: "Medium",
        completed: true,
      },
    ])
  );



  useEffect(() => {
    localStorage.setItem(
      "studyhub-subjects",
      JSON.stringify(subjects)
    );
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem(
      "studyhub-tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

useEffect(() => {
  localStorage.setItem(
    "studyhub-quiz-results",
    JSON.stringify(quizResults)
  );
}, [quizResults]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  function addSubject(name, teacher) {
    const newSubject = {
      id: Date.now(),
      name: name.trim(),
      teacher: teacher.trim() || "Not specified",
      progress: 0,
    };

    setSubjects((currentSubjects) => [
      ...currentSubjects,
      newSubject,
    ]);
  }

  function deleteSubject(id) {
    setSubjects((currentSubjects) =>
      currentSubjects.filter((subject) => subject.id !== id)
    );
  }

  function addTask(title, dueDate, priority) {
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      dueDate,
      priority,
      completed: false,
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  function updateSubjectProgress(id, progress) {
  setSubjects((currentSubjects) =>
    currentSubjects.map((subject) =>
      subject.id === id
        ? { ...subject, progress: Number(progress) }
        : subject
    )
  );
}

  function saveQuizResult(score, totalQuestions) {
  const result = {
    id: Date.now(),
    score,
    totalQuestions,
    percentage: Math.round(
      (score / totalQuestions) * 100
    ),
    date: new Date().toLocaleDateString(),
  };

  setQuizResults((currentResults) => [
    ...currentResults,
    result,
  ]);
}

  return (
    <StudyHubContext.Provider
     value={{
  subjects,
  tasks,
  quizResults,
  isLoading,
  addSubject,
  deleteSubject,
  updateSubjectProgress,
  addTask,
  toggleTask,
  deleteTask,
  saveQuizResult,
}}
    >
      {children}
    </StudyHubContext.Provider>
  );
}

export function useStudyHub() {
  return useContext(StudyHubContext);
}