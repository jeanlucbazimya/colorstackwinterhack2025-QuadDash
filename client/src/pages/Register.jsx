import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/client';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Card from '../components/ui/Card';

export default function Register() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    role: '',
    university_key: '',
    license_plate: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await authApi.getUniversities();
        setUniversities(response.data.universities);
      } catch (err) {
        console.error('Failed to fetch universities:', err);
      }
    };
    fetchUniversities();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.email.endsWith('.edu')) {
      setError('Please use a valid .edu email address');
      setLoading(false);
      return;
    }

    if (formData.role === 'driver' && !formData.license_plate) {
      setError('License plate is required for drivers');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        role: formData.role,
        university_key: formData.university_key,
      };

      if (formData.role === 'driver') {
        payload.license_plate = formData.license_plate;
      }
      await authApi.register(payload);
      navigate('/login', { state: { email: formData.email } });
    } catch (err) {
      console.log(err);
      console.log(err.message);
      console.log(err.response);
      setError(
        err.response?.data?.detail || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const universityOptions = universities.map((u) => ({
    value: u.key,
    label: u.name,
  }));

  const roleOptions = [
    { value: 'rider', label: 'Rider - I need rides' },
    { value: 'driver', label: 'Driver - I can give rides' },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-green-600 to-blue-600 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-green-600 font-black text-3xl">Q</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Join QuadDash</h1>
          <p className="text-green-100 text-lg leading-relaxed mb-8">
            Be part of a safe, trusted community of campus riders and drivers.
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3 text-white">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Sign up with .edu email</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant account verification</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Choose to ride or drive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <div className="lg:hidden flex w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="mt-2 text-gray-600 text-sm">
              Join QuadDash with your university email
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <Input
                label="Full Name"
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />

              <Input
                label="School Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@university.edu"
                required
              />

              <Select
                label="University"
                name="university_key"
                value={formData.university_key}
                onChange={handleChange}
                options={universityOptions}
                placeholder="Select your university"
                required
              />

              <Select
                label="I am a..."
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roleOptions}
                placeholder="Select your role"
                required
              />

              {formData.role === 'driver' && (
                <Input
                  label="License Plate"
                  type="text"
                  name="license_plate"
                  value={formData.license_plate}
                  onChange={handleChange}
                  placeholder="ABC-1234"
                  required
                />
              )}

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />

              <Button type="submit" loading={loading} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2.5 rounded-lg transition-all">
                Create Account
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Sign in
              </Link>
            </div>
          </Card>

          <p className="mt-6 text-center text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
