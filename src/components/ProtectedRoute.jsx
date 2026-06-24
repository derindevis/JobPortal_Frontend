import { Navigate } from 'react-router-dom';

// Wraps routes that need login. Optionally checks for admin role.
export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to='/login' />;

  if (role === 'admin') {
    // Decode payload from JWT to check role
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role !== 'admin') return <Navigate to='/jobs' />;
  }

  return children;
}
