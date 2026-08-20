import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
    } else {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!currentUser) return null;

  return (
    <div className="dashboard-layout">
      {/* Top Campus Navigation Bar */}
      <header className="top-navbar">
        <div className="navbar-brand">
          <span className="icon">🎓</span>
          <div>
            <div className="title">CampusHub</div>
            <div className="sub">Student Services & Event Management System</div>
          </div>
        </div>

        <div className="navbar-user">
          <div className="user-badge">
            <div className="user-avatar-sm">
              {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'S'}
            </div>
            <span>{currentUser.username}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout-nav">
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div>
            <h1>Welcome, {currentUser.username}! 👋</h1>
            <p>
              Your central student portal for campus service requests, clearances, and student activity management.
            </p>
          </div>
          <div>
            <span className="status-pill">
              ● Active Student Session
            </span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Left Column: Student Profile & Auth Status */}
          <div className="dash-card">
            <h3>👤 Student Profile & Session</h3>
            <div className="student-profile-info">
              <div className="info-row">
                <span className="info-label">Student ID / User:</span>
                <span className="info-value">{currentUser.username}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Account Status:</span>
                <span className="info-value" style={{ color: '#16a34a' }}>
                  ✓ Authenticated (Active)
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Session Token:</span>
                <span className="info-value">
                  <span className="token-code">{currentUser.token || 'dummy-jwt-token-xyz'}</span>
                </span>
              </div>
              {currentUser.loginTime && (
                <div className="info-row">
                  <span className="info-label">Logged In At:</span>
                  <span className="info-value">{currentUser.loginTime}</span>
                </div>
              )}
            </div>

            {/* Quick Campus Stats */}
            <h3 style={{ marginTop: '24px' }}>📊 Activity Summary</h3>
            <div className="student-profile-info">
              <div className="info-row">
                <span className="info-label">Facility Reservations:</span>
                <span className="info-value">1 Scheduled</span>
              </div>
              <div className="info-row">
                <span className="info-label">Clearance Status:</span>
                <span className="info-value" style={{ color: '#16a34a' }}>Cleared</span>
              </div>
              <div className="info-row">
                <span className="info-label">Service Inquiries:</span>
                <span className="info-value">0 Pending</span>
              </div>
            </div>
          </div>

          {/* Right Column: Events & Campus Services */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Upcoming Campus Events (Header Retained) */}
            <div className="dash-card">
              <h3>🎪 Upcoming Campus Events</h3>
              <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>
                View and manage your participation in university conferences, hackathons, and activities.
              </p>

              {/* Clean Empty State */}
              <div
                style={{
                  textAlign: 'center',
                  padding: '36px 20px',
                  background: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px dashed #cbd5e1',
                }}
              >
                <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>📅</span>
                <p style={{ fontWeight: 600, color: '#334155', fontSize: '14px', margin: 0 }}>
                  No campus events scheduled at this moment.
                </p>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                  Check back later for newly announced student activities and seminars.
                </p>
              </div>
            </div>

            {/* Student Services Quick Hub */}
            <div className="dash-card">
              <h3>🏛️ Student Services Hub</h3>
              <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>
                Quick access to campus student support desks, facility bookings, and documentation requests.
              </p>

              <div className="services-grid">
                <div className="service-item">
                  <div className="service-icon">🏢</div>
                  <div className="service-name">Facility & Room Booking</div>
                  <div className="service-desc">Reserve study rooms & computer labs</div>
                </div>

                <div className="service-item">
                  <div className="service-icon">📜</div>
                  <div className="service-name">Clearance & Certifications</div>
                  <div className="service-desc">Request academic forms & clearances</div>
                </div>

                <div className="service-item">
                  <div className="service-icon">💬</div>
                  <div className="service-name">Student Affairs Help Desk</div>
                  <div className="service-desc">Inquiries, counseling & support</div>
                </div>

                <div className="service-item">
                  <div className="service-icon">📑</div>
                  <div className="service-name">Document Verification</div>
                  <div className="service-desc">Track submitted student documents</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
