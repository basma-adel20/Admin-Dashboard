import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, HomeModernIcon, BookOpenIcon, CheckBadgeIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

type Property = {
  id: number;
  title: string;
  description: string;
  type: string;
  pricePerNight: number;
  location: string;
  imageUrl: string;
  available: boolean;
};

type Booking = {
  id: number;
  propertyId: number;
  status: string;
  checkIn: string; 
  checkOut: string; 
};

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from JSON Server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertiesRes, bookingsRes] = await Promise.all([
          fetch('http://localhost:3001/properties'),
          fetch('http://localhost:3001/bookings')
        ]);

        if (!propertiesRes.ok || !bookingsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const propertiesData = await propertiesRes.json();
        const bookingsData = await bookingsRes.json();

        setProperties(propertiesData);
        setBookings(bookingsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalProperties = properties.length;
  const bookedProperties = bookings.filter(booking => booking.status === 'confirmed').length;
  const availableProperties = properties.filter(property => property.available).length;
  const unavailableProperties = totalProperties - availableProperties;

  const sampleProperties = properties.slice(0, 3);

  const totalSales = bookings.filter(booking => booking.status === 'confirmed').reduce((total, booking) => {
    const property = properties.find(p => p.id == booking.propertyId);
    
    if (!property) return total;
  
    // Calculate number of nights
    const nights = Math.ceil(
      (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) 
      / (1000 * 60 * 60 * 24)
    );
    
    return total + (property.pricePerNight * nights);
  }, 0);

// Format as currency for display
const formattedTotalSales = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(totalSales);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-6 ">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Properties */}
        <div className="bg-white dark:bg-[#000] rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#FFF7ED]">
              <HomeModernIcon className="h-6 w-6 text-[#B0A69A]" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Total Properties</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">{totalProperties}</p>
            </div>
          </div>
        </div>

        {/* Booked Properties */}
        <div className="bg-white dark:bg-[#000] rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#F8EFE4]">
              <BookOpenIcon className="h-6 w-6 text-[#938B82]" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Booked Properties</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">{bookedProperties}</p>
            </div>
          </div>
        </div>

        {/* Available Properties */}
        <div className="bg-white dark:bg-[#000] rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#F1E4D9]">
              <CheckBadgeIcon className="h-6 w-6 text-[#967251]" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Available</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">{availableProperties}</p>
            </div>
          </div>
        </div>

        {/* Add this to your stats cards section */}
        <div className="bg-white dark:bg-[#000] rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#C4B9AF]">
              <CurrencyDollarIcon className="h-6 w-6 text-[#6E6761]" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">Total Sales</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">{formattedTotalSales}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Properties */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8 dark:bg-[#000]">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-300">Recent Properties</h2>
          <Link 
            to="/properties" 
            className="flex items-center text-[#443120] hover:text-[#443120]/80 text-sm font-medium dark:text-gray-300"
          >
            View All <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Night</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleProperties.length > 0 ? (
                sampleProperties.slice(-3).map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{property.title}</div>
                      <div className="text-sm text-gray-500">{property.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {property.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${property.pricePerNight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          property.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {property.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No properties found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/properties/add"
          className="bg-white dark:bg-[#000] p-6 rounded-lg shadow hover:shadow-md transition-shadow flex items-center"
        >
          <div className="p-3 rounded-full bg-[#443120]/10 mr-4 dark:bg-[#ECEAE8]">
            <HomeModernIcon className="h-6 w-6 text-[#443120]" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-300">Add New Property</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">List a new rental property</p>
          </div>
        </Link>

        <Link
          to="/properties"
          className="bg-white dark:bg-[#000] p-6 rounded-lg shadow hover:shadow-md transition-shadow flex items-center"
        >
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <CheckBadgeIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-300">View All Properties</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">See complete property list</p>
          </div>
        </Link>
      </div>
    </div>
  );
}