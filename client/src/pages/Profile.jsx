import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';

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

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>

      <Card>
        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">
              {user.full_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {user.full_name}
            </h2>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                user.role === 'driver'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {user.role === 'driver' ? 'Driver' : 'Rider'}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {profileFields.map((field) => (
            <div
              key={field.label}
              className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
            >
              <span className="text-gray-600">{field.label}</span>
              <span className="font-medium text-gray-900">{field.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center gap-2 text-green-600">
            <svg
              className="w-5 h-5"
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
            <span className="text-sm font-medium">Email Verified</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
