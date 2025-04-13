import React from 'react';

const RestaurantViewModal = ({ restaurant, onClose }) => {
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
              <div className="mt-1 p-2 bg-gray-50 rounded-md">{restaurant?.rank}</div>
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
            {restaurant?.image && (
              <img
                src={restaurant.image}
                alt="Restaurant"
                className="mt-2 h-32 w-48 object-cover rounded-lg"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
            {restaurant?.socialLinks?.map((link, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <div className="p-2 bg-gray-50 rounded-md">{link.name}</div>
                <div className="p-2 bg-gray-50 rounded-md">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-500 hover:text-blue-600">{link.url}</a>
                </div>
                <div className="p-2 bg-gray-50 rounded-md">{link.image}</div>
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