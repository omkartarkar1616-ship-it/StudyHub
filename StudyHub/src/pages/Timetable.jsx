import { useEffect, useState } from "react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
});

function Timetable() {
  const [schedule, setSchedule] = useState(() => {
    const savedSchedule = localStorage.getItem("studyhub-timetable");

    return savedSchedule
      ? JSON.parse(savedSchedule)
      : [
          {
            id: 1,
            day: "Monday",
            subject: "Web Development",
            startTime: "10:00",
            endTime: "11:00",
          },
          {
            id: 2,
            day: "Wednesday",
            subject: "Database Management",
            startTime: "14:00",
            endTime: "15:00",
          },
        ];
  });

  const [day, setDay] = useState("Monday");
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("studyhub-timetable", JSON.stringify(schedule));
  }, [schedule]);

  function addSchedule(event) {
    event.preventDefault();

    if (!subject.trim() || !startTime || !endTime) {
      return;
    }

    const newSchedule = {
      id: Date.now(),
      day,
      subject: subject.trim(),
      startTime,
      endTime,
    };

    setSchedule([...schedule, newSchedule]);

    setSubject("");
    setStartTime("");
    setEndTime("");
  }

  function deleteSchedule(id) {
    setSchedule(schedule.filter((item) => item.id !== id));
  }

  function getDaySchedule(currentDay) {
    return schedule
      .filter(
        (item) =>
          item.day === currentDay &&
          item.subject
            .toLowerCase()
            .includes(search.toLowerCase())
      )
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Timetable</h1>
          <p>Plan your weekly study schedule.</p>
        </div>
      </div>

      <form className="timetable-form" onSubmit={addSchedule}>
        <select value={day} onChange={(event) => setDay(event.target.value)}>
          {days.map((currentDay) => (
            <option key={currentDay} value={currentDay}>
              {currentDay}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />

        <div className="time-inputs">
          <input
            type="time"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
          />

          <span>to</span>

          <input
            type="time"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
          />
        </div>

        <button type="submit">Add Schedule</button>
      </form>

      <div className="timetable-search">
        <input
          type="text"
          placeholder="Search timetable by subject..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="timetable-grid">
        {days.map((currentDay) => {
          const daySchedule = getDaySchedule(currentDay);

          return (
            <div
              className={`day-column ${
                currentDay === today ? "today-column" : ""
              }`}
              key={currentDay}
            >
              <div className="day-header">
                <div>
                  <h3>{currentDay}</h3>

                  {currentDay === today && <small>Today</small>}
                </div>

                <span>{daySchedule.length}</span>
              </div>

              <div className="day-schedule">
                {daySchedule.length === 0 ? (
                  <p className="no-schedule">
                    {search
                      ? "No matching sessions"
                      : "No study sessions"}
                  </p>
                ) : (
                  daySchedule.map((item) => (
                    <div className="schedule-card" key={item.id}>
                      <div>
                        <h4>{item.subject}</h4>
                        <p>
                          {item.startTime} - {item.endTime}
                        </p>
                      </div>

                      <button
                        className="delete-button"
                        onClick={() => deleteSchedule(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timetable;