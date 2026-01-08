import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import DriverCard from '../components/DriverCard';

export default function LandingPage() {
  const drivers = [
    {
      name: 'Dharambir Agrawal',
      rating: 4.8,
      reviews: 200,
      destination: 'Walmart',
      distance: 'Dollar General',
      passengers: '4 Passengers',
      transmission: 'Auto',
      airConditioning: true,
      doors: 4,
      price: 25,
    },
    {
      name: 'Tammy Abraham',
      rating: 4.6,
      reviews: 124,
      passengers: '2 Passengers',
      transmission: 'Auto',
      airConditioning: true,
      doors: 2,
      price: 45,
    },
    {
      name: 'Prevailer N',
      rating: 4.5,
      reviews: 89,
      passengers: '4 Passengers',
      transmission: 'Auto',
      airConditioning: true,
      doors: 4,
      price: 20,
      priceUnit: '/trip',
    },
    {
      name: 'Jean Luc',
      rating: 4.9,
      reviews: 156,
      passengers: '2 Passengers',
      transmission: 'Auto',
      airConditioning: true,
      doors: 2,
      price: 15,
    },
  ];

  const testimonials = [
    {
      rating: 5,
      text: '"Ubers are super expensive, and QuadDash has been my life-saver in moments of urgency."',
      name: 'Grace Ngoma',
      location: 'From New York, US',
    },
    {
      rating: 5,
      text: '"I feel very secure when using caretall\'s services. Your customer care team is very enthusiastic and the driver is always on time."',
      name: 'Wisdom Chiekwene',
      location: 'From Houston, Texas',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="px-6 lg:px-12 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Find, book a car ride at your HBCU{' '}
                <span className="text-primary-600 underline decoration-wavy decoration-primary-400">
                  Easily
                </span>
              </h1>
              <div className="flex gap-3 mb-6">
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  App Store
                </button>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  Google Play
                </button>
              </div>
              <p className="text-gray-500">
                Get a peer ride wherever you need it with your iOS and Android device.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-3xl p-8 h-80 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <svg className="w-24 h-24 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h8m-8 4h8m-8 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                  </svg>
                  <p>Car Image Placeholder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-400 mb-1">School</label>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search your school"
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden md:block" />
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-400 mb-1">Pickup date</label>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="text"
                  placeholder="Tue 15 Feb, 09:00"
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden md:block" />
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-400 mb-1">Return time</label>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="text"
                  placeholder="Thu 18 Feb, 11:00"
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>
            <Button size="lg">Search</Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Book with 3 working steps</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Choose location',
                description: 'Choose your and find your best car',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Pick-up date',
                description: 'Select your pick up date and time to book your car',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                ),
                title: 'Book a car ride',
                description: "Book a ride with a student and you're connected",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Rides Section */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              CAR AVAILABLE
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Available rides in Grambling, LA</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {drivers.map((driver, index) => (
              <DriverCard key={index} {...driver} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl font-bold text-gray-900">What student say about us?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{testimonial.rating}.0</span>
                  <span className="text-gray-500 ml-1">stars</span>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">{testimonial.text}</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="px-6 lg:px-12 py-16 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-primary-600 text-white rounded-full text-sm font-medium mb-4">
                DOWNLOAD
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Download QuadDash App for{' '}
                <span className="text-primary-400">FREE</span>
              </h2>
              <p className="text-gray-300 mb-6">
                For faster, easier booking and exclusive deals.
              </p>
              <div className="flex gap-3">
                <button className="bg-white text-black px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  Google Play
                </button>
                <button className="bg-white text-black px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  App Store
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-800 rounded-3xl p-4 w-64">
                <div className="bg-gray-700 rounded-2xl h-96 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Phone Mockup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
