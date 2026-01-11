import Card from '../ui/Card';

export default function RideStatusCard({ ride }) {
  const statusStyles = {
    pending: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Waiting for driver...',
    },
    accepted: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Ride Accepted!',
    },
    declined: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Request Declined',
    },
  };

  const status = statusStyles[ride.status] || statusStyles.pending;
  const rideDate = new Date(ride.ride_date);

  return (
    <Card>
      <div className={`${status.bg} ${status.text} px-4 py-3 rounded-lg mb-4 flex items-center gap-2`}>
        {status.icon}
        <span className="font-medium">{status.label}</span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Ride Request</h3>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pickup</p>
            <p className="font-medium text-gray-900">{ride.pickup_location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Destination</p>
            <p className="font-medium text-gray-900">{ride.destination}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="font-medium text-gray-900">
              {rideDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}{' '}
              at{' '}
              {rideDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </div>

      {ride.status === 'accepted' && ride.driver && (
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-medium text-gray-500 mb-3">Your Driver</h4>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {ride.driver.full_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{ride.driver.full_name}</p>
              <p className="text-sm text-gray-500">{ride.driver.email}</p>
              {ride.driver.license_plate && (
                <p className="text-sm font-medium text-blue-600 mt-1">
                  License Plate: {ride.driver.license_plate}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
