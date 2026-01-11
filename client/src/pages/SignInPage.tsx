import { useState, ChangeEvent } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import logo from '../assets/images/logo.png';

export default function SignInPage() {
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeepLoggedIn(e.target.checked);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24">
        <div className="max-w-md w-full mx-auto">
          <img src={logo} alt="QuadDash" className="h-12 w-auto mb-8" />

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
          <p className="text-gray-500 mb-12">Please login to continue to your account.</p>

          <form className="space-y-6">
            <Input
              label="Email"
              type="email"
              name="email"
            />

            <Input
              label="Password"
              type="password"
              name="password"
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                id="keepLoggedIn"
                checked={keepLoggedIn}
                onChange={handleCheckboxChange}
                className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="keepLoggedIn" className="ml-2 text-sm text-gray-600">
                Keep me logged in
              </label>
            </div>

            <Button className="w-full" size="lg">
              Sign in
            </Button>
          </form>

          <p className="text-center text-gray-500 mt-8">
            Need an account?{' '}
            <a href="#" className="text-primary-600 font-medium hover:underline">
              Create Account
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Car Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50 p-12">
        <div className="max-w-lg w-full">
          <div className="bg-gradient-to-br from-primary-100 to-white rounded-3xl p-12 flex items-center justify-center h-96">
            <div className="text-gray-400 text-center">
              <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h8m-8 4h8m-8 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
              </svg>
              <p>Blue Sports Car Image</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
