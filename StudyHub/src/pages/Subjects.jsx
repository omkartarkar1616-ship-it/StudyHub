import { useState } from "react";
import { useStudyHub } from "../context/StudyHubContext";

function Subjects() {
  const {
  subjects,
  addSubject,
  deleteSubject,
  updateSubjectProgress,
} = useStudyHub();
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [search, setSearch] = useState("");
const [progressFilter, setProgressFilter] = useState("All");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter a subject name.");
      return;
    }

    setError("");

    addSubject(name, teacher);

    setName("");
    setTeacher("");
  }

  const filteredSubjects = subjects.filter((subject) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      subject.name.toLowerCase().includes(searchText) ||
      subject.teacher.toLowerCase().includes(searchText);

    const matchesProgress =
      progressFilter === "All" ||
      (progressFilter === "Not Started" &&
        subject.progress === 0) ||
      (progressFilter === "In Progress" &&
        subject.progress > 0 &&
        subject.progress < 100) ||
      (progressFilter === "Completed" &&
        subject.progress === 100);

    return matchesSearch && matchesProgress;
  });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Subjects</h1>
          <p>
            Manage your subjects and track your learning progress.
          </p>
        </div>
      </div>

      <form className="subject-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Subject name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="text"
          placeholder="Teacher name"
          value={teacher}
          onChange={(event) => setTeacher(event.target.value)}
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit">Add Subject</button>
      </form>

      <div className="subject-filters">
        <input
          type="text"
          placeholder="Search subjects or teachers..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={progressFilter}
          onChange={(event) => setProgressFilter(event.target.value)}
        >
          <option value="All">All Progress</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="subjects-grid">
        {filteredSubjects.map((subject) => (
          <div className="subject-card" key={subject.id}>
            <div className="subject-card-top">
              <div>
                <h3>{subject.name}</h3>
                <p>{subject.teacher}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => deleteSubject(subject.id)}
              >
                Delete
              </button>
            </div>

            <div className="progress-info">
              <span>Progress</span>
              <span>{subject.progress}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={subject.progress}
              aria-label={`${subject.name} progress`}
              onChange={(event) =>
                updateSubjectProgress(subject.id, event.target.value)
              }
            />

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {subjects.length === 0 ? (
        <div className="empty-state">
          <h3>No subjects yet</h3>
          <p>Add your first subject using the form above.</p>
        </div>
      ) : filteredSubjects.length === 0 ? (
        <div className="empty-state">
          <h3>No matching subjects</h3>
          <p>Try changing your search or progress filter.</p>
        </div>
      ) : null}
    </div>
  );
}

export default Subjects;