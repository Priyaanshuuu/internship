import { useEffect, useState } from "react";
import { fetchUsers } from "../api/authAPI";
import { removeToken } from "../services/tokens";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);
  const logout = () => {
    removeToken();
    navigate("/login");
  };
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={loadUsers}>
            Retry
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <h1 className="dashboard-title">
            <span className="title-icon">🚀</span>
            Dashboard
          </h1>
          <button className="logout-button" onClick={logout}>
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </nav>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100%</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">⭐</div>
          <div className="stat-label">Premium</div>
        </div>
      </div>
      <div className="users-section">
        <h2 className="section-title">Team Members</h2>
        <div className="users-grid">
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`user-card ${
                hoveredCard !== null && hoveredCard !== index ? "shrink" : ""
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="user-card-inner">
                <div className="user-avatar-container">
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="user-avatar"
                  />
                  <div className="avatar-glow"></div>
                </div>
                <div className="user-info">
                  <h3 className="user-name">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="user-email">{user.email}</p>
                  <div className="user-badge">ID: {user.id}</div>
                </div>
                <div className="card-shine"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
