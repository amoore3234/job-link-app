import { Link }  from 'react-router-dom';
import './RegisterSuccess.css';

export default function RegisterSuccess() {
  return (
    <div className="success-container">
      <h2>Registration Successful 🎉</h2>
      <p>Your account has been created successfully.</p>

      <Link to="/login" className="link">
        Go to Login
      </Link>
    </div>
  );
}