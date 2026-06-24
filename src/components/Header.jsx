import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getUserRole } from '../utils/auth';

export default function Header({ setToken }) {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    if (setToken) setToken(null)
    navigate('/login', { replace: true})
  }

  const role = getUserRole();
  const token = localStorage.getItem('token');

  return (
    <header className="sma-header">
      <div className="sma-header-brand">
        <span className="sma-header-logo">🏢</span>
        <Link to="/" className="sma-header-title-link">
          Job Portal 
        </Link>
      </div>
      <nav className="sma-header-nav">
        {token ? (
          <>
            <NavLink 
              to="/jobs"
              className={({ isActive }) => 
                isActive ? 'sma-header-nav-item sma-nav-active' : 'sma-header-nav-item'
              }
            >
              Jobs 
            </NavLink>
            <NavLink 
              to="/applications"
              className={({ isActive }) => 
                isActive ? 'sma-header-nav-item sma-nav-active' : 'sma-header-nav-item'
              }
            >
              Applications 
            </NavLink>
            {role === 'admin' && (
              <NavLink 
                to="/admin"
                className={({ isActive }) => 
                  isActive ? 'sma-header-nav-item sma-nav-active' : 'sma-header-nav-item'
                }
              >
                Admin Panel
              </NavLink>
            )}
            <button className="sma-btn-logout" style={{ marginLeft: '12px' }} onClick={handleLogout}>
              Sign Out 
            </button>
          </>
        ) : (
          <>
            <NavLink 
              to="/login"
              className={({ isActive }) => 
                isActive ? 'sma-header-nav-item sma-nav-active' : 'sma-header-nav-item'
              }
            >
              Login
            </NavLink>
            <NavLink 
              to="/register"
              className="sma-btn sma-btn-primary"
              style={{ textDecoration: 'none', marginLeft: '12px', padding: '8px 16px', fontSize: '14px' }}
            >
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  )
}