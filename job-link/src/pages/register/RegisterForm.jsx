import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth.api';
import { Link }  from 'react-router-dom';
import './RegisterForm.css';

export default function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!form.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!form.userEmail) {
      newErrors.userEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.userEmail)) {
      newErrors.userEmail = "Invalid email address";
    }

    if (!form.userPassword) {
      newErrors.userPassword = "Password is required";
    } else if (form.userPassword.length < 6) {
      newErrors.userPassword = "Password must be at least 6 characters";
    }

    if (form.userPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { firstName, lastName, username, userEmail, userPassword } = form;

    if (!validate()) {
      console.log("Validation failed with errors:", errors);
      return;
    }

    setIsSubmitting(true);

    const data = {
      firstName,
      lastName,
      username,
      userEmail,
      userPassword
    };

    try {
      await authApi.register(data);
      setIsSubmitting(false);
      navigate("/register/success");
    } catch (error) {
      setIsSubmitting(false);
      console.error("Registration error:", error);
    }
  }

  return (
    <>
      <div className="container">
        <div className="register-container">
          <form onSubmit={handleSubmit} className="register-form">
            <h2>Sign Up</h2>

            {errors.username && <span className="error">{errors.username}</span>}
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />

            {errors.firstName && <span className="error">{errors.firstName}</span>}
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
            />

            {errors.lastName && <span className="error">{errors.lastName}</span>}
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
            />

            {errors.userEmail && <span className="error">{errors.userEmail}</span>}
            <input
              name="userEmail"
              placeholder="Email"
              value={form.userEmail}
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

            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <p className="info">Already have an account? <Link to="/login">Log in</Link></p>
            <br />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}