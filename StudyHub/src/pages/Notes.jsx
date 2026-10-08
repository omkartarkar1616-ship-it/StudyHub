import { useEffect, useState } from "react";

function Notes() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("studyhub-notes");

    return savedNotes
      ? JSON.parse(savedNotes)
      : [
          {
            id: 1,
            title: "React Hooks",
            content:
              "useState manages component state. useEffect handles side effects.",
          },
          {
            id: 2,
            title: "DBMS Important Topics",
            content:
              "Revise normalization, SQL joins, transactions and indexing.",
          },
        ];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Lecture");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("studyhub-notes", JSON.stringify(notes));
  }, [notes]);

  function resetForm() {
    setTitle("");
    setContent("");
    setCategory("Lecture");
    setEditingId(null);
    setError("");
  }

  function saveNote(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a note title.");
      return;
    }

    if (!content.trim()) {
      setError("Please write some note content.");
      return;
    }

    setError("");

    if (editingId !== null) {
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title.trim(),
                content: content.trim(),
                category,
              }
            : note
        )
      );
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        category,
      };

      setNotes((currentNotes) => [newNote, ...currentNotes]);
    }

    resetForm();
  }

  function editNote(note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category || "Lecture");
  }

  function deleteNote(id) {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }
  }

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());

    const noteCategory = note.category || "Lecture";

    const matchesCategory =
      categoryFilter === "All" ||
      noteCategory === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Notes</h1>
          <p>Create and organize your study notes.</p>
        </div>
      </div>

      <div className="notes-toolbar">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Lecture">Lecture</option>
          <option value="Assignment">Assignment</option>
          <option value="Revision">Revision</option>
          <option value="Important">Important</option>
        </select>
      </div>

      <form className="note-form" onSubmit={saveNote}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="Lecture">📚 Lecture</option>
          <option value="Assignment">📝 Assignment</option>
          <option value="Revision">💡 Revision</option>
          <option value="Important">📌 Important</option>
        </select>

        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows="5"
        />

        {error && <p className="form-error">{error}</p>}

        <div className="note-form-actions">
          <button type="submit">
            {editingId === null ? "Add Note" : "Save Changes"}
          </button>

          {editingId !== null && (
            <button
              className="cancel-edit-button"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="notes-grid">
        {filteredNotes.map((note) => (
          <div className="note-card" key={note.id}>
            <div className="note-card-header">
              <h3>{note.title}</h3>

              <div className="note-actions">
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => editNote(note)}
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            <span className="note-category">
              {note.category || "Lecture"}
            </span>

            <p>{note.content}</p>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="empty-state">
          <h3>No notes found</h3>
          <p>Try a different search or create a new note.</p>
        </div>
      )}
    </div>
  );
}

export default Notes;