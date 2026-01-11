import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../api/client';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.login(formData);
      login(response.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.detail || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-400 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
            <p className="mt-2 text-gray-600">
              Please login to continue to your account.
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@university.edu"
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                Sign in
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Need an account?{' '}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Create Account
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-50 to-green-50 items-center justify-center">
        <div className="text-center">
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl transform rotate-6 shadow-2xl flex items-center justify-center">
            <svg
              className="w-32 h-32 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
          <p className="mt-8 text-gray-600 font-medium text-lg">
            Campus Rides, Connected Lives
          </p>
        </div>
      </div>
    </div>
  );
}
