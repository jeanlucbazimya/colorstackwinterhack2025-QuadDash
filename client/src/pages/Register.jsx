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
       console.log("-----Here-------");
      navigate('/verify-email', { state: { email: formData.email } });
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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">
            Join QuadDash with your school email
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

            <Button type="submit" loading={loading} className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
