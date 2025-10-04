import { useAuth } from '../contexts/AuthContext';
import SidebardComponent from '../components/sidebar-main';

const Calendar = () => {
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
    <SidebardComponent title="Calendar">
      <p>Calendar</p>
    </SidebardComponent>
  );
};

export default Calendar;
