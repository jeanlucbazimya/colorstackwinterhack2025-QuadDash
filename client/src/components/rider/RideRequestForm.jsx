import { useState } from 'react';
import { ridesApi } from '../../api/client';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

export default function RideRequestForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    pickup_location: '',
    destination: '',
    ride_date: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert datetime-local to ISO format
      const rideDate = new Date(formData.ride_date).toISOString();

      await ridesApi.createRequest({
        pickup_location: formData.pickup_location,
        destination: formData.destination,
        ride_date: rideDate,
      });

      onSuccess?.();
    } catch (err) {
      setError(
        err.response?.data?.detail || 'Failed to create ride request'
      );
    } finally {
      setLoading(false);
    }
  };

  // Set minimum date to now
  const now = new Date();
  const minDateTime = now.toISOString().slice(0, 16);

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Request a Ride
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Input
          label="Pickup Location"
          type="text"
          name="pickup_location"
          value={formData.pickup_location}
          onChange={handleChange}
          placeholder="e.g., Student Center"
          required
        />

        <Input
          label="Destination"
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="e.g., Airport"
          required
        />

        <Input
          label="Date & Time"
          type="datetime-local"
          name="ride_date"
          value={formData.ride_date}
          onChange={handleChange}
          min={minDateTime}
          required
        />

        <Button type="submit" loading={loading} className="w-full">
          Request Ride
        </Button>
      </form>
    </Card>
  );
}
