import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Welcome to Dashboard</h1>
      <p>You have successfully logged in!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}