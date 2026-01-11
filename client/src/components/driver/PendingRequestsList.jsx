import RequestCard from './RequestCard';

export default function PendingRequestsList({ rides, onUpdate }) {
  if (rides.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
        <svg
          className="w-16 h-16 mx-auto text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Pending Requests
        </h3>
        <p className="text-gray-500">
          There are no ride requests from your university at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {rides.map((ride) => (
        <RequestCard key={ride.id} ride={ride} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
