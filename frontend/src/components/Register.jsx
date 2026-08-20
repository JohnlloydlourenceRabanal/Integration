import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import '../App.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation for required fields
    if (!formData.username.trim() || !formData.password.trim()) {
      setMessage('Student ID/Username and Password are required.');
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await registerUser({
        username: formData.username.trim(),
        password: formData.password,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
      });
      setMessage(typeof response.data === 'string' ? response.data : 'Student registered successfully! Redirecting to login...');
      setIsError(false);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      const errorMsg =
        typeof err.response?.data === 'string'
          ? err.response.data
          : err.response?.data?.message || 'Registration failed. Please check your details and try again.';
      setMessage(errorMsg);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="campus-brand">
        <div className="campus-logo-badge">
          🎓 Campus Services & Event Management
        </div>
        <h1 className="campus-title">CampusHub Portal</h1>
        <p className="campus-subtitle">Your central gateway for student services, activities, and campus events</p>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h2>Student Registration</h2>
          <p>Create an account to access student services and event registrations</p>
        </div>

        {message && (
          <div className={`alert ${isError ? 'alert-error' : 'alert-success'}`}>
            <span>{isError ? '⚠️' : '✅'}</span>
            <div>{message}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Student ID / Username <span className="required">*</span>
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="e.g. 23-1937-123 or rabanal"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="e.g. Juan Dela Cruz"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Campus / Institutional Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e.g. student@cit.edu"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a secure password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Processing Registration...' : 'Register Student Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have a campus account? <Link to="/login">Sign In here</Link>
        </p>
      </div>
    </div>
  );
}
