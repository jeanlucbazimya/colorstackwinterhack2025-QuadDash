import Button from './Button';

interface DriverCardProps {
  name: string;
  rating: number;
  reviews: number;
  destination?: string;
  distance?: string;
  passengers?: string;
  transmission?: string;
  airConditioning?: boolean;
  doors?: number;
  price: number;
  priceUnit?: string;
}

export default function DriverCard({
  name,
  rating,
  reviews,
  destination,
  distance,
  passengers,
  transmission,
  airConditioning,
  doors,
  price,
  priceUnit = '/day',
}: DriverCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header with Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
            <circle cx="25" cy="25" r="15" opacity="0.3"/>
            <circle cx="75" cy="75" r="20" opacity="0.3"/>
          </svg>
        </div>
        <svg className="w-24 h-24 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7c1.657 0 3-1.343 3-3s-1.343-3-3-3S5 1.343 5 3s1.343 3 3 3zm0 0c1.657 0 3 1.343 3 3v7c0 1.657-1.343 3-3 3s-3-1.343-3-3V10c0-1.657 1.343-3 3-3zm9 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0c1.657 0 3 1.343 3 3v7c0 1.657-1.343 3-3 3s-3-1.343-3-3v-7c0-1.657 1.343-3 3-3z" />
        </svg>
      </div>

      <div className="p-6">
        {/* Name and Rating */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-xl text-gray-900">{name}</h3>
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="font-bold text-gray-900">{rating}</span>
            <span className="text-xs text-gray-600">({reviews})</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5 py-4 border-y border-gray-100">
          {passengers && (
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a6 6 0 006-6V4a6 6 0 00-6-6H6a6 6 0 00-6 6v10a6 6 0 006 6z" />
              </svg>
              <span className="text-gray-700 font-medium">{passengers} seats</span>
            </div>
          )}
          {transmission && (
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-gray-700 font-medium">{transmission}</span>
            </div>
          )}
          {airConditioning && (
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v-4m0 0H8m4 0h4" />
              </svg>
              <span className="text-gray-700 font-medium">A/C</span>
            </div>
          )}
          {doors && (
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-gray-700 font-medium">{doors} doors</span>
            </div>
          )}
        </div>

        {/* Footer with Price and Button */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
            <p className="text-2xl font-bold text-gray-900">
              ${price}<span className="text-sm text-gray-600 font-normal ml-1">{priceUnit}</span>
            </p>
          </div>
          <Button variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-700">
            Select
          </Button>
        </div>
      </div>
    </div>
  );
}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {distance}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-500">
          {passengers && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {passengers}
            </span>
          )}
          {transmission && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              {transmission}
            </span>
          )}
          {airConditioning && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Air Conditioning
            </span>
          )}
          {doors && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
              {doors} Doors
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-400 text-sm">Price</span>
            <p className="font-bold text-lg">
              ${price}
              <span className="text-gray-400 text-sm font-normal">{priceUnit}</span>
            </p>
          </div>
          <Button size="sm">
            Book Now →
          </Button>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-sm text-gray-500">Profile Photo</span>
        </div>
      </div>
    </div>
  );
}
