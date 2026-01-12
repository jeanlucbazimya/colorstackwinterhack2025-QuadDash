import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ridesApi } from '../api/client';
import RideRequestForm from '../components/rider/RideRequestForm';
import RideStatusCard from '../components/rider/RideStatusCard';
import PendingRequestsList from '../components/driver/PendingRequestsList';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

function RiderDashboard() {
  const [activeRequest, setActiveRequest] = useState(null);
  const [lastCompletedRide, setLastCompletedRide] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyRequest = useCallback(async () => {
    try {
      const response = await ridesApi.getMyRequest();
      if (response.data) {
        setActiveRequest(response.data);
        setLastCompletedRide(null);
      } else {
        setActiveRequest(null);
      }
    } catch (err) {
      console.error('Failed to fetch request:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyRequest();
  }, [fetchMyRequest]);

  // Auto-refresh every 10 seconds if there is any active request
  useEffect(() => {
    if (activeRequest) {
      const interval = setInterval(fetchMyRequest, 10000);
      return () => clearInterval(interval);
    }
  }, [activeRequest, fetchMyRequest]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show review UI for just-completed ride if not yet reviewed
  return (
    <div className="space-y-6">
      {activeRequest ? (
        <RideStatusCard ride={activeRequest} onUpdate={fetchMyRequest} />
      ) : lastCompletedRide ? (
        <RideStatusCard ride={lastCompletedRide} onUpdate={() => { setLastCompletedRide(null); fetchMyRequest(); }} />
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Request a Ride</h2>
          <RideRequestForm onSuccess={fetchMyRequest} />
        </div>
      )}
    </div>
  );
}

function DriverDashboard() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRides, setAcceptedRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completingRideId, setCompletingRideId] = useState(null);

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

  const handleCompleteRide = async (rideId) => {
    setCompletingRideId(rideId);
    try {
      await ridesApi.completeRide(rideId);
      fetchData();
    } catch (err) {
      console.error('Failed to complete ride:', err);
    } finally {
      setCompletingRideId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Pending Requests Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Available Rides</h2>
            <p className="text-gray-600 mt-1">
              {pendingRequests.length > 0
                ? `${pendingRequests.length} ride request${pendingRequests.length !== 1 ? 's' : ''} waiting for you`
                : 'No pending requests right now'}
            </p>
          </div>
          {pendingRequests.length > 0 && (
            <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold text-sm">
              {pendingRequests.length} New
            </div>
          )}
        </div>

        {pendingRequests.length > 0 ? (
          <PendingRequestsList rides={pendingRequests} onUpdate={fetchData} />
        ) : (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-600 text-lg">No pending ride requests</p>
            <p className="text-gray-500 mt-1">Check back later for new requests</p>
          </Card>
        )}
      </div>

      {/* Accepted Rides Section */}
      {acceptedRides.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Accepted Rides</h2>
            <p className="text-gray-600 mt-1">
              {acceptedRides.length} ride{acceptedRides.length !== 1 ? 's' : ''} scheduled
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {acceptedRides.map((ride) => (
              <Card key={ride.id} className="hover:shadow-lg transition-shadow flex flex-col">
                {/* Rider Info */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {ride.rider.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {ride.rider.full_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{ride.rider.email}</p>
                  </div>
                </div>

                {/* Location & Time Details */}
                <div className="space-y-3 mb-4 flex-1">
                  {/* Pickup */}
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Pickup</p>
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {ride.pickup_location}
                      </p>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Destination</p>
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {ride.destination}
                      </p>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v2H4a2 2 0 00-2 2v2h16V7a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v2H7V3a1 1 0 00-1-1zm0 5a2 2 0 002 2h8a2 2 0 002-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date & Time</p>
                      <p className="font-medium text-gray-900 text-sm">
                        {new Date(ride.ride_date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        {new Date(ride.ride_date).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status and Action */}
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Accepted
                    </span>
                  </div>
                  <Button
                    onClick={() => handleCompleteRide(ride.id)}
                    loading={completingRideId === ride.id}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all"
                  >
                    {completingRideId === ride.id ? 'Completing...' : '✓ Complete Ride'}
                  </Button>
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back, {user.full_name.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              {user.role === 'driver'
                ? 'Help fellow students get where they need to go'
                : 'Request a ride from your campus community'}
            </p>
          </div>
          <div
            className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
              user.role === 'driver'
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {user.role === 'driver' ? '🚗' : '👤'}
            {user.role === 'driver' ? 'Driver' : 'Rider'}
          </div>
        </div>
      </div>

      {/* Main Content */}
      {user.role === 'rider' ? <RiderDashboard /> : <DriverDashboard />}
    </div>
  );
}
