import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page not-found">
      <div className="not-found-card">
        <div className="not-found-icon">🔎</div>

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you're looking for doesn't exist or
          may have been moved.
        </p>

        <Link to="/" className="home-button">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
