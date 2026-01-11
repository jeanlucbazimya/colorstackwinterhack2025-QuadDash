import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ridesApi } from '../api/client';
import RideRequestForm from '../components/rider/RideRequestForm';
import RideStatusCard from '../components/rider/RideStatusCard';
import PendingRequestsList from '../components/driver/PendingRequestsList';
import Card from '../components/ui/Card';

function RiderDashboard() {
  const [activeRequest, setActiveRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyRequest = useCallback(async () => {
    try {
      const response = await ridesApi.getMyRequest();
      setActiveRequest(response.data);
    } catch (err) {
      console.error('Failed to fetch request:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyRequest();
  }, [fetchMyRequest]);

  // Auto-refresh every 10 seconds when pending
  useEffect(() => {
    if (activeRequest?.status === 'pending') {
      const interval = setInterval(fetchMyRequest, 10000);
      return () => clearInterval(interval);
    }
  }, [activeRequest?.status, fetchMyRequest]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Rider Dashboard</h2>

      {activeRequest ? (
        <RideStatusCard ride={activeRequest} />
      ) : (
        <RideRequestForm onSuccess={fetchMyRequest} />
      )}
    </div>
  );
}

function DriverDashboard() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRides, setAcceptedRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [pendingRes, acceptedRes] = await Promise.all([
        ridesApi.getPendingRequests(),
        ridesApi.getMyAcceptedRides(),
      ]);
      setPendingRequests(pendingRes.data.rides);
      setAcceptedRides(acceptedRes.data.rides);
    } catch (err) {
      console.error('Failed to fetch rides:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 15 seconds
  useEffect(() => {
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Pending Ride Requests
          {pendingRequests.length > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({pendingRequests.length} available)
            </span>
          )}
        </h2>
        <PendingRequestsList rides={pendingRequests} onUpdate={fetchData} />
      </div>

      {acceptedRides.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Accepted Rides
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({acceptedRides.length})
            </span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {acceptedRides.map((ride) => (
              <Card key={ride.id}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {ride.rider.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {ride.rider.full_name}
                    </p>
                    <p className="text-sm text-gray-500">{ride.rider.email}</p>
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-gray-500">From:</span>{' '}
                    <span className="font-medium">{ride.pickup_location}</span>
                  </p>
                  <p>
                    <span className="text-gray-500">To:</span>{' '}
                    <span className="font-medium">{ride.destination}</span>
                  </p>
                  <p>
                    <span className="text-gray-500">When:</span>{' '}
                    <span className="font-medium">
                      {new Date(ride.ride_date).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user.full_name.split(' ')[0]}!
          </h1>
          <p className="text-gray-500 mt-1">
            {user.role === 'driver'
              ? 'Help fellow students get where they need to go'
              : 'Request a ride from your campus community'}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            user.role === 'driver'
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {user.role === 'driver' ? 'Driver' : 'Rider'}
        </span>
      </div>

      {user.role === 'rider' ? <RiderDashboard /> : <DriverDashboard />}
    </div>
  );
}
