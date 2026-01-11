import { useState, ChangeEvent, FormEvent } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import logo from '../assets/images/logo.png';

type Role = 'rider' | 'driver';

interface FormState {
  fullName: string;
  email: string;
  password: string;
  university: string;
  role: Role;
}

const HBCU_LIST = [
  'Grambling State University',
  'Howard University',
  'Spelman College',
  'Morehouse College',
  'Florida A&M University',
  'Hampton University',
  'Tuskegee University',
  'North Carolina A&T State University',
  'Jackson State University',
  'Xavier University of Louisiana',
  'Fisk University',
  'Clark Atlanta University',
  'Tennessee State University',
  'Southern University',
  'Prairie View A&M University',
];

export default function SignUpPage() {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    password: '',
    university: '',
    role: 'rider',
  });
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string): boolean => {
    if (!email) return true;
    const isEdu = email.toLowerCase().endsWith('.edu');
    if (!isEdu && email.includes('@')) {
      setEmailError('Please use a valid .edu email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      validateEmail(value);
    }
  };

  const handleRoleChange = (role: Role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      return;
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-8">
        <div className="max-w-md w-full mx-auto">
          <img src={logo} alt="QuadDash" className="h-12 w-auto mb-8" />

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create account</h1>
          <p className="text-gray-500 mb-8">Join QuadDash to share rides with your campus community.</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />

            <div>
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => validateEmail(formData.email)}
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-500">{emailError}</p>
              )}
              <p className="mt-1 text-xs text-gray-400">Must be a .edu email address</p>
            </div>

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />

            {/* University Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                University
              </label>
              <select
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white appearance-none cursor-pointer"
              >
                <option value="">Select your university</option>
                {HBCU_LIST.map((university) => (
                  <option key={university} value={university}>
                    {university}
                  </option>
                ))}
              </select>
              <svg
                className="w-5 h-5 text-gray-400 absolute right-3 top-[38px] pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I want to be a
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleChange('rider')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    formData.role === 'rider'
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Rider</span>
                  </div>
                  <p className="text-xs mt-1 text-gray-500">Find rides on campus</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('driver')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    formData.role === 'driver'
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 4h8m-8 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                    </svg>
                    <span className="font-medium">Driver</span>
                  </div>
                  <p className="text-xs mt-1 text-gray-500">Offer rides & earn</p>
                </button>
              </div>
            </div>

            <Button className="w-full" size="lg" type="submit">
              Create Account
            </Button>
          </form>

          <p className="text-center text-gray-500 mt-8">
            Already have an account?{' '}
            <a href="#" className="text-primary-600 font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50 p-12">
        <div className="max-w-lg w-full">
          <div className="bg-gradient-to-br from-primary-100 to-white rounded-3xl p-12 flex items-center justify-center h-[500px]">
            <div className="text-gray-400 text-center">
              <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg font-medium">Join the Campus Community</p>
              <p className="text-sm mt-2">Share rides with verified students</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
