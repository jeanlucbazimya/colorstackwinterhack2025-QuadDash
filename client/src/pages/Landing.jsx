import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Find, book a car ride at your{' '}
              <span className="text-blue-500 underline decoration-wavy decoration-green-400">
                HBCU
              </span>{' '}
              Easily
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Get a peer ride wherever you need it with your iOS and Android
              device. Connect with fellow students for safe, affordable campus
              transportation.
            </p>
            <div className="mt-8 flex gap-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="bg-gradient-to-br from-blue-100 to-green-50 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Campus Rides, Connected Lives</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              HOW IT WORKS
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Book with 3 working steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                1. Create Account
              </h3>
              <p className="mt-2 text-gray-600">
                Sign up with your .edu email and verify your student status
              </p>
            </div>

            <div className="text-center">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                2. Request a Ride
              </h3>
              <p className="mt-2 text-gray-600">
                Enter your pickup location, destination, and preferred time
              </p>
            </div>

            <div className="text-center">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                3. Get Connected
              </h3>
              <p className="mt-2 text-gray-600">
                A driver from your campus accepts and you&apos;re on your way
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Universities */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Supported Universities
            </h2>
            <p className="mt-4 text-gray-600">
              Available at these HBCUs and growing
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              'Grambling State',
              'Howard',
              'Spelman',
              'Morehouse',
              'FAMU',
              'Hampton',
            ].map((university) => (
              <div
                key={university}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition"
              >
                <p className="font-medium text-gray-900">{university}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="text-xl font-semibold">QuadDash</span>
            </div>
            <p className="text-gray-400 text-sm">
              Campus Rides, Connected Lives
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            &copy; 2025 QuadDash.
          </div>
        </div>
      </footer>
    </div>
  );
}
