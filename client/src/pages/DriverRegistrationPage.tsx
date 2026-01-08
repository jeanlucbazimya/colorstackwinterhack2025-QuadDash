import { useState, ChangeEvent } from 'react';
import Button from '../components/Button';

export default function DriverRegistrationPage() {
  const [agreeToComms, setAgreeToComms] = useState(false);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgreeToComms(e.target.checked);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 text-primary-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium">Selection & Driver Details</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white rounded-full">
              <span className="text-sm font-medium">02. Add-ons</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Step 2. Driver Details</h1>

            <form className="space-y-8">
              {/* Name Section */}
              <div>
                <h2 className="font-semibold text-gray-900 mb-4">First name & Last name</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  />
                </div>
                <div className="mt-3 p-3 bg-gray-100 rounded-lg flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">
                    The cardholder's name must match the driver's name. The payment cards need to be presented at the counter.
                  </p>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <h2 className="font-semibold text-gray-900 mb-4">Date of birth</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Additional charges may apply for underage drivers</span>
                  </div>
                </div>
              </div>

              {/* Phone & Email */}
              <div>
                <h2 className="font-semibold text-gray-900 mb-4">Phone number & Email</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="agreeComms"
                    checked={agreeToComms}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 mt-0.5 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="agreeComms" className="text-sm text-gray-600">
                    I agree to receive communications, including marketing and promotional materials, via SMS and emails
                  </label>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h2 className="font-semibold text-gray-900 mb-4">Personal information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Country"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Zipcode"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Booking Comments */}
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">Booking comments</h2>
                <p className="text-sm text-gray-500 mb-4">
                  We will take into account all your wishes, what are your wishes for renting a car?
                </p>
                <textarea
                  placeholder="This field is optional"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none"
                />
              </div>
            </form>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Total:</span>
                <span className="text-2xl font-bold text-gray-900">$ 302.34</span>
              </div>

              <Button className="w-full mb-6" size="lg">
                Book Now
              </Button>

              {/* Car Info */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h8m-8 4h8m-8 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fiat Panda</h3>
                  <p className="text-sm text-gray-500">Small Car</p>
                  <p className="text-sm">
                    <span className="font-semibold">29.75 €</span>
                    <span className="text-gray-400"> / per day</span>
                  </p>
                </div>
              </div>

              {/* Pickup & Return */}
              <div className="py-6 border-b border-gray-100">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary-600" />
                    <div className="w-px h-12 bg-gray-200" />
                    <div className="w-3 h-3 rounded-full border-2 border-primary-600" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Pickup</p>
                      <p className="font-medium text-gray-900">Malta International Airport</p>
                      <p className="text-sm text-gray-500">Sun, 27 Jul 10:00 AM</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Return</p>
                      <p className="font-medium text-gray-900">Malta International Airport</p>
                      <p className="text-sm text-gray-500">Tue, 29 Jul 10:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Details */}
              <div className="py-6 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Price details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price for 2 day(s)</span>
                    <span className="font-medium">29.75 €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hourly for 0 hour(s)</span>
                    <span className="font-medium">$ 0.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fees & taxes</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">29.75 €</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discount Code */}
              <div className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Discount Code</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                  />
                  <Button variant="secondary" size="sm">
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
