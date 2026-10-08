import { BrowserRouter, Routes, Route } from "react-router-dom";

import { StudyHubProvider } from "./context/StudyHubContext";
import Layout from "./layouts/Layout";

import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Timetable from "./pages/Timetable";
import Quizzes from "./pages/Quizzes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <StudyHubProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </StudyHubProvider>
    </BrowserRouter>
  );
}

export default App;