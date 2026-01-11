import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="text-xl font-semibold">
                Quad<span className="text-blue-500">Dash</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2"
                >
                  Profile
                </Link>
                <span className="text-sm text-gray-500">
                  {user?.full_name} ({user?.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
