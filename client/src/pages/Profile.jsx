import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';

// Dummy reviews data
const dummyReviews = [
  {
    id: 1,
    reviewer: 'Sarah Johnson',
    rating: 5,
    date: '2 days ago',
    text: 'Great driver! Very safe and courteous. Arrived on time and the car was clean.',
  },
  {
    id: 2,
    reviewer: 'Alex Chen',
    rating: 5,
    date: '1 week ago',
    text: 'Excellent experience! Smooth ride and friendly conversation. Would definitely ride again!',
  },
  {
    id: 3,
    reviewer: 'Emma Williams',
    rating: 4,
    date: '2 weeks ago',
    text: 'Good driver, a bit of traffic but got to destination safely.',
  },
];

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const profileFields = [
    { label: 'Full Name', value: user.full_name },
    { label: 'Email', value: user.email },
    { label: 'University', value: user.university_key },
    { label: 'Role', value: user.role === 'driver' ? 'Driver' : 'Rider' },
    ...(user.role === 'driver' && user.license_plate
      ? [{ label: 'License Plate', value: user.license_plate }]
      : []),
    {
      label: 'Member Since',
      value: new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
  ];

  const avgRating = user.role === 'driver' ? 4.7 : null;
  const totalRides = user.role === 'driver' ? 24 : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-600 mt-2">Manage your account information and reviews</p>
      </div>

      {/* Profile Header Card */}
      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white text-4xl font-bold">
              {user.full_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900">
              {user.full_name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  user.role === 'driver'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {user.role === 'driver' ? '🚗 Driver' : '👤 Rider'}
              </span>
              {user.role === 'driver' && (
                <>
                  <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-semibold text-gray-900">{avgRating}</span>
                    <span className="text-sm text-gray-600">({totalRides} rides)</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {profileFields.map((field) => (
            <div key={field.label} className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {field.label}
              </span>
              <span className="text-lg font-semibold text-gray-900 mt-1">
                {field.value}
              </span>
            </div>
          ))}
        </div>

        {/* Verification Status */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-lg w-fit">
            <svg
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold text-green-700">Email Verified</span>
          </div>
        </div>
      </Card>

      {/* Reviews Section - Only for Drivers */}
      {user.role === 'driver' && (
        <div>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Recent Reviews</h3>
            <p className="text-gray-600 mt-1">What riders are saying about your service</p>
          </div>

          <div className="space-y-4">
            {dummyReviews.map((review) => (
              <Card key={review.id} className="hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{review.reviewer}</h4>
                    <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold text-sm text-gray-900">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
