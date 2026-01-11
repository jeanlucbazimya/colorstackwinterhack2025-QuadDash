import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../api/client';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const email = location.state?.email || '';

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (code.length !== 6) {
      setError('Please enter the 6-digit code');
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.verifyEmail({ email, code });
      login(response.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.detail || 'Verification failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            No email to verify
          </h2>
          <p className="text-gray-600 mb-6">
            Please register first to receive a verification code.
          </p>
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Go to Registration
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="mt-2 text-gray-600">
            We sent a 6-digit code to{' '}
            <span className="font-medium text-gray-900">{email}</span>
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
              label="Verification Code"
              type="text"
              value={code}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setCode(value);
                setError('');
              }}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="text-center text-2xl tracking-widest"
              required
            />

            <p className="text-sm text-gray-500 text-center">
              Check the server&apos;s <code className="bg-gray-100 px-1 rounded">outbox/emails.log</code> file for
              the code (development only)
            </p>

            <Button type="submit" loading={loading} className="w-full">
              Verify Email
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Didn&apos;t receive the code?{' '}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Try again
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
