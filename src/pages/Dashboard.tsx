import { useAuth } from '../contexts/AuthContext';
import SidebardComponent from '../components/sidebar-main';
import '../styles/Dashboard.css';
import OverviewStatsDashboard from '../components/overview-stats-dashboard';
import ActivityLog from '../components/acitivity-log';
import SmartRecs from '@/components/smart-recs';
import { WeeklyProgress } from '@/components/weekly-progress';
import MyGennieDashboard from '@/components/mygennie-dashboard';
import WeeklyReview from '@/components/weekly-review';


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
      <div className="flex flex-col"> 
        <h1 className="text-2xl font-medium">Hi, {user.firstName} {user.lastName.charAt(0).toUpperCase()}!</h1>
        <h3 className="text-lg font-light text-muted-foreground">Ready to continue your wellness journey?</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 items-stretch">
            <div className="h-full min-w-0">
              <SmartRecs />
            </div>
            <div className="h-full min-w-0">
              <OverviewStatsDashboard/>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 items-stretc">
            <div className="h-full min-w-0">
                <ActivityLog />
                <WeeklyProgress />
            </div>
            <div className="h-full min-w-0">
              <WeeklyReview />
              <MyGennieDashboard />
            </div>
          </div>
      </div>
    </SidebardComponent>
  );
};

export default Dashboard;
