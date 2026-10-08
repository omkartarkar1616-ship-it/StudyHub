import Sidebar from "../components/Sidebar";

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;