import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MyGen</h1>
          <p className="hero-subtitle">
            Your personal growth and productivity companion. Track your progress, 
            build habits, and achieve your goals.
          </p>
          
          <div className="cta-buttons">
            <Link to="/signup" className="cta-button primary">
              Get Started
            </Link>
            <Link to="/login" className="cta-button secondary">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your daily activities and see your improvement over time.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔥</div>
            <h3>Build Streaks</h3>
            <p>Maintain consistency with streak tracking and motivation.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Achieve Goals</h3>
            <p>Set and accomplish your personal and professional objectives.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
