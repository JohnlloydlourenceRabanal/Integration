import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import '../App.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation for required fields
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setMessage('Please enter both Student ID/Username and Password.');
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await loginUser({
        username: credentials.username.trim(),
        password: credentials.password,
      });

      // Secure session storage (store token, username, timestamp - no plaintext password)
      localStorage.setItem(
        'user',
        JSON.stringify({
          token: res.data?.token || 'dummy-jwt-token-xyz',
          username: credentials.username.trim(),
          loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        })
      );

      setMessage('Login successful! Redirecting to Campus Dashboard...');
      setIsError(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      const errorMsg =
        typeof err.response?.data === 'string'
          ? err.response.data
          : err.response?.data?.message || 'Invalid username or password. Please verify your credentials.';
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
        <p className="campus-subtitle">Sign in to manage your campus activities, services, and event passes</p>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h2>Portal Login</h2>
          <p>Access your student services dashboard</p>
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
              value={credentials.username}
              onChange={handleChange}
              required
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
              placeholder="Enter your account password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>

        <p className="auth-footer">
          New to CampusHub? <Link to="/register">Register student account</Link>
        </p>
      </div>
    </div>
  );
}
