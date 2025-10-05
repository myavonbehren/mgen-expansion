import { useAuth } from '../contexts/AuthContext';
import SidebardComponent from '../components/sidebar-main';
import '../styles/Dashboard.css';
import OverviewStatsDashboard from '../components/overview-stats-dashboard';

const Dashboard = () => {
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
    <SidebardComponent title="Dashboard">
      <h1 className="text-2xl font-medium">Hi, {user.firstName} {user.lastName.charAt(0).toUpperCase()}!</h1>
      <h3 className="text-lg font-light text-muted-foreground mb-6">Ready to continue your wellness journey?</h3>

      <OverviewStatsDashboard />

    </SidebardComponent>
  );
};

export default Dashboard;
