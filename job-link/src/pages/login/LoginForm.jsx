import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth.api';
import './LoginForm.css';

export default function LoginForm() {
  const [form, setForm] = useState({
    username: "",
    userPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "A username is required.";
    }

    if (!form.userPassword) {
      newErrors.userPassword = "A password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { username, userPassword } = form;

    if (!validate()) {
      console.log("Validation failed with errors:", errors);
      return;
    }

    setIsSubmitting(true);

    const data = {
      username,
      userPassword
    };

    try {
      localStorage.setItem("loggedInUser", username);
      const response = await authApi.login(data);
      console.log(`Login response: ${JSON.stringify(response, null, 2)}`);
      const isFirstTime = response?.isFirstTimeUser
      setIsSubmitting(false);
      if (isFirstTime) {
        navigate("/upload");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Login error:", error);
      setErrors({ ...errors, errorMessage: "Invalid username or password. Please try again." });
    }
  }

  return (
    <>
      <div className="container">
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            {errors.errorMessage && <span className="error">{errors.errorMessage}</span>}
            {errors.username && <span className="error">{errors.username}</span>}
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />

            {errors.userPassword && <span className="error">{errors.userPassword}</span>}
            <input
              type="password"
              name="userPassword"
              placeholder="Password"
              value={form.userPassword}
              onChange={handleChange}
            />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};