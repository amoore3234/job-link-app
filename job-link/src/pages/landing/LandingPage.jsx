import { Link } from "react-router-dom";
import officeImage from "../../assets/office-coworking-business.png";
import officeCelebrationImage from "../../assets/office-celebration.png";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="header-left">
          <h1 className="logo">JobLink</h1>
        </div>

        <nav className="header-right">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link">
            Signup
          </Link>
        </nav>
      </header>

      <div className="features">
        <h1 className="landing-title">
          <span>Build Your Career</span>
          <span>Journey Today</span>
        </h1>

        <div className="office-celebration">
          <img
            src={officeCelebrationImage}
            alt="office-celebration"
            className="office-celebration-image"
          />
        </div>
      </div>
      <div className="content-container">
        <div className="feature">
          <h3>Create a Profile</h3>
          <p>Sign up and build your professional profile in minutes.</p>
        </div>
        <div className="feature">
          <h3>Find Jobs</h3>
          <p>Browse and apply for jobs that match your skills.</p>
        </div>
        <div className="feature">
          <h3>Track Applications</h3>
          <p>Stay up to date on your application status.</p>
        </div>
      </div>

      <div className="page-bottom-image">
        <img
          src={officeImage}
          alt="office-coworkers"
          className="office-coworkers-image"
        />
      </div>
    </div>
  );
}