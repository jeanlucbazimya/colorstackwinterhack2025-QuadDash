import { useState, useEffect } from 'react';
import { ridesApi } from '../../api/client';
import Card from '../ui/Card';
import Button from '../ui/Button';

// Dummy driver reviews
const dummyDriverReviews = {
  1: [
    {
      id: 1,
      reviewer: 'Alex Johnson',
      rating: 5,
      date: '3 days ago',
      text: 'Excellent driver! Very professional and safe. Highly recommended!',
    },
    {
      id: 2,
      reviewer: 'Maria Garcia',
      rating: 5,
      date: '1 week ago',
      text: 'Great experience. Driver was friendly and arrived on time.',
    },
    {
      id: 3,
      reviewer: 'James Chen',
      rating: 4,
      date: '2 weeks ago',
      text: 'Good ride, very comfortable car. Would ride again!',
    },
  ],
  2: [
    {
      id: 1,
      reviewer: 'Sarah Wilson',
      rating: 5,
      date: '5 days ago',
      text: 'Amazing driver! The car was spotless and the ride was smooth.',
    },
    {
      id: 2,
      reviewer: 'David Lee',
      rating: 5,
      date: '1 week ago',
      text: 'Fantastic service. Driver went above and beyond!',
    },
  ],
  3: [
    {
      id: 1,
      reviewer: 'Emma Brown',
      rating: 5,
      date: '4 days ago',
      text: 'Best driver ever! Safe, courteous, and reliable.',
    },
  ],
};

export default function RideStatusCard({ ride, onUpdate }) {
  // Safety check - if no ride provided, return early
  if (!ride) {
    return (
      <Card className="text-center py-12">
        <p className="text-gray-600">No active ride request</p>
      </Card>
    );
  }

  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [error, setError] = useState('');
  const [userReview, setUserReview] = useState(null);
  const [currentRide, setCurrentRide] = useState(ride);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: '',
  });

  // Update currentRide when ride prop changes
  useEffect(() => {
    setCurrentRide(ride);
  }, [ride]);

  // Initialize from backend when component mounts
  useEffect(() => {
    loadReviewIfExists();
  }, [currentRide.id, currentRide.status]);

  const loadReviewIfExists = async () => {
    try {
      const res = await ridesApi.getReview(currentRide.id);
      if (res.data) {
        setUserReview(res.data);
      }
    } catch (err) {
      // No review exists yet, which is fine
    }
  };

  const statusStyles = {
    pending: {
      bg: 'bg-yellow-50 border border-yellow-200',
      text: 'text-yellow-700',
      badge: 'bg-yellow-100 text-yellow-700',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Waiting for driver...',
    },
    accepted: {
      bg: 'bg-green-50 border border-green-200',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-700',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: '✓ Ride Accepted!',
    },
    declined: {
      bg: 'bg-red-50 border border-red-200',
      text: 'text-red-700',
      badge: 'bg-red-100 text-red-700',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: '✕ Request Declined',
    },
    completed: {
      bg: 'bg-blue-50 border border-blue-200',
      text: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-700',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m2-1l-2-1m2 1v2.5" />
        </svg>
      ),
      label: '✓ Ride Completed!',
    },
    cancelled: {
      bg: 'bg-gray-50 border border-gray-200',
      text: 'text-gray-700',
      badge: 'bg-gray-100 text-gray-700',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      label: '✕ Ride Cancelled',
    },
  };

  const status = statusStyles[currentRide.status] || statusStyles.pending;
  const rideDate = new Date(currentRide.ride_date);
  const driverReviews = currentRide.driver ? dummyDriverReviews[currentRide.driver.id] || [] : [];
  const avgRating = driverReviews.length > 0
    ? (driverReviews.reduce((sum, r) => sum + r.rating, 0) / driverReviews.length).toFixed(1)
    : 0;

  const handleCancel = async () => {
    setLoading(true);
    setError('');
    try {
      await ridesApi.cancelRide(currentRide.id);
      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to cancel ride');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.comment.trim()) {
      setError('Please write a review comment');
      return;
    }
    
    setReviewLoading(true);
    setError('');
    
    try {
      const res = await ridesApi.submitReview(currentRide.id, {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      setUserReview(res.data);
      setReviewForm({ rating: 5, comment: '' });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  // Don't show form after cancelled or declined
  if (currentRide.status === 'cancelled' || currentRide.status === 'declined') {
    return (
      <Card className={`${status.bg} px-6 py-8 text-center`}>
        <div className={`${status.text} flex justify-center mb-4`}>{status.icon}</div>
        <h3 className={`text-2xl font-bold ${status.text} mb-2`}>{status.label}</h3>
        <p className="text-gray-600 mt-4">
          {currentRide.status === 'cancelled' 
            ? 'This ride has been cancelled. You can request a new ride anytime.'
            : 'This ride request was declined. Please try requesting another ride.'}
        </p>
      </Card>
    );
  }

  // Show completed state
  if (currentRide.status === 'completed') {
    const hasSubmitted = !!userReview;

    return (
      <Card className={`${status.bg} border-2 border-blue-300`}>
        <div className="text-center mb-6">
          <div className={`${status.text} flex justify-center mb-4 text-6xl`}>✓</div>
          <h3 className={`text-3xl font-bold ${status.text}`}>Ride Completed!</h3>
          <p className="text-gray-600 mt-2">Thank you for riding with QuadDash</p>
        </div>

        {currentRide.driver && (
          <div className="space-y-6 mt-6">
            <Card className="border-2 border-green-200 bg-green-50">
              <h4 className="text-sm uppercase tracking-wide text-gray-600 font-bold mb-4">
                Your Driver
              </h4>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white font-bold text-2xl">
                    {currentRide.driver.full_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-900">{currentRide.driver.full_name}</p>
                  <p className="text-sm text-gray-600 mt-1">{currentRide.driver.email}</p>
                </div>
              </div>
            </Card>

            {/* Review Section */}
            <div className="border-t-2 border-blue-300 pt-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">How was your ride?</h4>
              
              {hasSubmitted ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-green-600 text-2xl">✓</div>
                    <div>
                      <p className="font-semibold text-green-900">Thank you for your review!</p>
                      <p className="text-sm text-green-700 mt-1">Your feedback helps drivers improve their service</p>
                    </div>
                  </div>
                  {userReview && (
                    <Card className="mt-4 bg-white">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-semibold text-gray-900">{userReview.reviewer.full_name || 'You'}</h5>
                          <p className="text-xs text-gray-500">{new Date(userReview.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                          <span className="text-yellow-400">★</span>
                          <span className="font-bold text-sm text-gray-900">{userReview.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{userReview.comment}</p>
                    </Card>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Rating Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Rate your experience
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className={`text-3xl transition-transform hover:scale-110 ${
                            star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Share your feedback
                    </label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="Tell us about your experience with the driver..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows="4"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {reviewForm.comment.length} characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    loading={reviewLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all"
                  >
                    {reviewLoading ? 'Submitting...' : 'Submit Review'}
                  </Button>

                  <button
                    type="button"
                    onClick={() => {
                      setReviewForm({ rating: 5, comment: '' });
                    }}
                    className="w-full text-gray-600 hover:text-gray-900 py-2 text-sm font-medium transition-colors"
                  >
                    Skip for now
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      <Card className={`${status.bg} px-5 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={status.text}>{status.icon}</div>
          <span className={`${status.text} font-bold text-lg`}>{status.label}</span>
        </div>
        {(currentRide.status === 'pending' || currentRide.status === 'accepted') && (
          <Button
            onClick={handleCancel}
            loading={loading}
            variant="danger"
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Cancel Ride
          </Button>
        )}
      </Card>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Ride Details */}
      <Card>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Ride Details</h3>

        <div className="space-y-4">
          {/* Pickup Location */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">
                Pickup Location
              </p>
              <p className="text-lg font-semibold text-gray-900">{currentRide.pickup_location}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-0.5 h-8 bg-gray-300"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Destination */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">
                Destination
              </p>
              <p className="text-lg font-semibold text-gray-900">{currentRide.destination}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="py-4"></div>

          {/* Date & Time */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v2H4a2 2 0 00-2 2v2h16V7a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v2H7V3a1 1 0 00-1-1zm0 5a2 2 0 002 2h8a2 2 0 002-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">
                Date & Time
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {rideDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                <span className="text-gray-600">
                  at{' '}
                  {rideDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Driver Info & Reviews - Only when accepted */}
      {currentRide.status === 'accepted' && currentRide.driver && (
        <>
          {/* Driver Info Card */}
          <Card className="border-2 border-green-200 bg-green-50">
            <h4 className="text-sm uppercase tracking-wide text-gray-600 font-bold mb-4">
              Your Driver
            </h4>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white font-bold text-2xl">
                  {currentRide.driver.full_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                  <p className="text-lg font-bold text-gray-900">{currentRide.driver.full_name}</p>
                  <p className="text-sm text-gray-600 mt-1">{currentRide.driver.email}</p>
                  {currentRide.driver.license_plate && (
                    <p className="text-sm font-semibold text-green-700 mt-2 bg-green-100 px-3 py-1 rounded-full w-fit">
                      🚗 {currentRide.driver.license_plate}
                  </p>
                )}
              </div>
              {driverReviews.length > 0 && (
                <div className="text-right">
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-lg">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-bold text-gray-900">{avgRating}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{driverReviews.length} reviews</p>
                </div>
              )}
            </div>
          </Card>

          {/* Driver Reviews */}
          {driverReviews.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">What riders say about this driver</h3>
              <div className="space-y-3">
                {driverReviews.map((review) => (
                  <Card key={review.id} className="hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{review.reviewer}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg flex-shrink-0">
                        <span className="text-yellow-400">★</span>
                        <span className="font-bold text-sm text-gray-900">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
