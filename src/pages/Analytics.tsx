import { useAuth } from '../contexts/AuthContext';
import SidebardComponent from '../components/sidebar-main';
import '../styles/Dashboard.css';

const Analytics = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login via ProtectedRoute
  }

  return (
    <SidebardComponent title="Analytics">
      <p>Analytics</p>
    </SidebardComponent>
  );
};

export default Analytics;
