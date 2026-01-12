import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span>✨ Campus Rides Reimagined</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Safe rides from your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                campus community
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Connect with fellow students for affordable, safe transportation. Whether you need a ride to class or want to earn money as a driver, QuadDash makes it easy.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Go to Dashboard
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    Get Started
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-all"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
            <p className="mt-6 text-sm text-gray-500">
              ✓ Free for all students  ✓ .edu email required  ✓ Real-time tracking
            </p>
          </div>

          {/* Hero Image */}
          <div className="mt-12 lg:mt-0 relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-12 border border-blue-100 shadow-2xl">
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Pick-up Point</p>
                        <p className="text-xs text-gray-500">Library, Campus Drive</p>
                      </div>
                    </div>
                    <div className="border-t-2 border-dashed border-blue-200 my-3 mx-3"></div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Destination</p>
                        <p className="text-xs text-gray-500">Science Building</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-md">
                    <p className="text-xs text-gray-600 mb-2 font-semibold">ETA</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-gray-900">4 min</p>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">On the way</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              How it Works
            </span>
            <h2 className="mt-6 text-4xl font-bold text-gray-900">
              Get a ride in 3 simple steps
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Seamless campus transportation at your fingertips
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Create Account</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sign up with your university .edu email and get verified instantly.
                </p>
              </div>
              <div className="hidden md:block absolute -right-4 top-12 text-4xl text-gray-300">→</div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Request a Ride</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tell us where you're going and when. Get matched with a nearby driver.
                </p>
              </div>
              <div className="hidden md:block absolute -right-4 top-12 text-4xl text-gray-300">→</div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enjoy Your Ride</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track your driver in real-time and enjoy a safe, comfortable ride.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Why choose QuadDash?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Built specifically for campus communities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '🔒',
              title: 'Safe & Secure',
              description: 'Verified university members only. Real-time tracking and support.',
            },
            {
              icon: '💰',
              title: 'Affordable',
              description: 'Fair prices set by the community. Transparent, no hidden fees.',
            },
            {
              icon: '⚡',
              title: 'Quick Pickup',
              description: 'Average pickup time under 5 minutes. Real-time driver tracking.',
            },
            {
              icon: '🎓',
              title: 'Student Community',
              description: 'Connect with fellow students. Build lasting relationships.',
            },
            {
              icon: '💵',
              title: 'Earn Money',
              description: 'Drivers earn money on their own schedule. Flexible hours.',
            },
            {
              icon: '📱',
              title: 'Easy to Use',
              description: 'Intuitive app design. Works on iOS and Android.',
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-4 text-lg text-blue-100">
            Join thousands of students already using QuadDash for safer, affordable rides.
          </p>
          {!isAuthenticated && (
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
