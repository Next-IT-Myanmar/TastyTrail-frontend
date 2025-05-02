import React, { useState, useEffect} from 'react';
import { FaStar } from 'react-icons/fa';
import { getRestaurantDetail } from '../services/restaurantService';

const RestaurantViewModal = ({ restaurant, onClose }) => {

  const [restaurantDetail, setRestaurantDatail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRestaurantDetail = async () => {
    try {
      setLoading(true);
      // Ensure the ID is properly passed as a number or string
      const id = restaurant?.id;
      if (!id) return;

      const response = await getRestaurantDetail(id);

      if(response) {
        setRestaurantDatail({
          ...response.data,
          img: `${import.meta.env.VITE_API_BASE_URL}/${response.img}`,
          otherPhoto: response.otherPhoto?.map(photo => 
            `${import.meta.env.VITE_API_BASE_URL}/${photo}`
          ) || []
        });
      }
    } catch (error) {
      console.error('Error fetching restaurant detail:', error);
      setRestaurantDatail(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurant?.id) {
      fetchRestaurantDetail();
    }
  }, [restaurant?.id]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Restaurant Details</h1>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800"
        >
          Back to List
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 pr-8">Restaurant Details</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md">{restaurant?.name}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rank</label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-xl ${
                      index < (restaurant?.rank || 0)
                        ? 'text-[#f99109]'
                        : 'text-gray-300'
                    }`}
                  >
                  <FaStar />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">{restaurant?.description}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">{restaurant?.phoneNumber}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Opening Hour</label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md">
                {restaurant?.openHour && new Date(`2000/01/01 ${restaurant.openHour}`).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Closing Hour</label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md">
                {restaurant?.closeHour && new Date(`2000/01/01 ${restaurant.closeHour}`).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Promotion</label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md">
                {restaurant?.promotion ? `${restaurant.promotion}%` : 'No promotion'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-xl ${
                      index < (restaurant?.priceRange || 0)
                        ? 'text-[#f99109]'
                        : 'text-gray-300'
                    }`}
                  >
                    $
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md flex flex-wrap gap-2">
              {restaurant?.categories?.map((category, index) => (
                <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm">
                  {category.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Countries</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md flex flex-wrap gap-2">
              {restaurant?.countries?.map((country, index) => (
                <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm">
                  {country.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cuisines</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md flex flex-wrap gap-2">
              {restaurant?.cuisines?.map((cuisine, index) => (
                <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm">
                  {cuisine.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">{restaurant?.address}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Map URL</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">
              <a href={restaurant?.map} target="_blank" rel="noopener noreferrer" 
                 className="text-blue-500 hover:text-blue-600">{restaurant?.map}</a>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant Image</label>
            {restaurantDetail?.img && (
              <img
                src={restaurantDetail.img}
                alt="Restaurant"
                className="mt-2 h-32 w-48 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Additional Images section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Additional Images</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
              {restaurantDetail?.otherPhoto?.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Restaurant ${index + 1}`}
                  className="h-32 w-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
            {restaurant?.socialLink?.map((link, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <div className="p-2 bg-gray-50 rounded-md">{link.platform}</div>
                <div className="p-2 bg-gray-50 rounded-md">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-500 hover:text-blue-600">{link.url}</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
      </div>
  );
};

export default RestaurantViewModal;