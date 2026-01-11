import { useState } from 'react';
import { ridesApi } from '../../api/client';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function RequestCard({ ride, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState(null);

  const handleAction = async (action) => {
    setLoading(true);
    setActionType(action);

    try {
      await ridesApi.respondToRequest(ride.id, action);
      onUpdate?.();
    } catch (err) {
      console.error('Failed to respond to request:', err);
      alert(err.response?.data?.detail || 'Failed to respond to request');
    } finally {
      setLoading(false);
      setActionType(null);
    }
  };

  const rideDate = new Date(ride.ride_date);

  return (
    <Card className="hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{ride.rider.full_name}</h3>
          <p className="text-sm text-gray-500">{ride.rider.email}</p>
        </div>
        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
          Pending
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-gray-600">From:</span>
          <span className="font-medium text-gray-900">{ride.pickup_location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-gray-600">To:</span>
          <span className="font-medium text-gray-900">{ride.destination}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-gray-600">When:</span>
          <span className="font-medium text-gray-900">
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
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="success"
          onClick={() => handleAction('accept')}
          loading={loading && actionType === 'accept'}
          disabled={loading}
          className="flex-1"
        >
          Accept
        </Button>
        <Button
          variant="danger"
          onClick={() => handleAction('decline')}
          loading={loading && actionType === 'decline'}
          disabled={loading}
          className="flex-1"
        >
          Decline
        </Button>
      </div>
    </Card>
  );
}
