import React, { useState, useRef, useEffect } from 'react';
import { FaStar, FaTimes, FaChevronDown } from 'react-icons/fa';

const RestaurantUpdateModal = ({ restaurant, onClose }) => {
  const [socialLinksCount, setSocialLinksCount] = useState(restaurant?.socialLinks?.length || 1);
  const [rating, setRating] = useState(restaurant?.rank || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [imagePreview, setImagePreview] = useState(restaurant?.image || null);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(restaurant?.categories || []);
  const [selectedCountries, setSelectedCountries] = useState(restaurant?.countries || []);
  const [isOpenCategories, setOpenCategories] = useState(false);
  const [isOpenCountries, setOpenCountries] = useState(false);
  const categoriesRef = useRef(null);
  const countriesRef = useRef(null);

  const optionsCategories = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Another Option' },
    { id: 5, name: 'Something Else' },
    { id: 6, name: 'Last Option' },
  ];

  const optionCountries = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }, 
  ];

  const handleCategoriesSelect = (option) => {
    setSelectedCategories([...selectedCategories, option]);
    setCategorySearchTerm('');
  };

  const handleCountriesSelect = (option) => {
    setSelectedCountries([...selectedCountries, option]);
    setCountrySearchTerm('');
  };

  const handleCategoriesRemove = (optionToRemove) => {
    setSelectedCategories(selectedCategories.filter(item => item.id !== optionToRemove.id));
  };

  const handleCountriesRemove = (optionToRemove) => {
    setSelectedCountries(selectedCountries.filter(item => item.id !== optionToRemove.id));
  };

  const filteredCategoriesOptions = optionsCategories.filter(option => 
    option.name.toLowerCase().includes(categorySearchTerm.toLowerCase()) &&
    !selectedCategories.some(item => item.id === option.id)
  );

  const filteredCountriesOptions = optionCountries.filter(option =>
    option.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) &&
    !selectedCountries.some(item => item.id === option.id)
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-2xl cursor-pointer ${
              (hoverRating || value) >= star
                ? 'text-[#f99109]'
                : 'text-gray-300'
            } hover:text-[#f99109]`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          />
        ))}
        <span className="ml-2 text-gray-600">{value || hoverRating || 0}</span>
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setOpenCategories(false);
      }
      if (countriesRef.current && !countriesRef.current.contains(event.target)) {
        setOpenCountries(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Update Restaurant</h1>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800"
        >
          Back to List
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                defaultValue={restaurant?.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rank</label>
              <StarRating value={rating} onChange={setRating} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              rows="3"
              defaultValue={restaurant?.description}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              defaultValue={restaurant?.phoneNumber}
            />
          </div>

          {/* Operating Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Opening Hour</label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                defaultValue={restaurant?.openHour}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Closing Hour</label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                defaultValue={restaurant?.closeHour}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            <div className="mt-1">
              <div className="relative" ref={categoriesRef}>
                <div className="min-h-[42px] p-1 border-gray-300 border rounded-lg bg-white flex flex-wrap gap-1">
                  {selectedCategories.map(item => (
                    <span key={item.id} className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm">
                      {item.name}
                      <button onClick={() => handleCategoriesRemove(item)} className="ml-1 hover:text-yellow-900">
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="w-full p-1 outline-none"
                      placeholder={selectedCategories.length === 0 ? "Select options..." : ""}
                      value={categorySearchTerm}
                      onChange={(e) => setCategorySearchTerm(e.target.value)}
                      onFocus={() => setOpenCategories(true)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenCategories(!isOpenCategories)}
                    className="self-center px-1"
                  >
                    <FaChevronDown className={`transition-transform ${isOpenCategories ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {isOpenCategories && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredCategoriesOptions.length === 0 ? (
                      <div className="p-2 text-gray-500 text-center">No options found</div>
                    ) : (
                      filteredCategoriesOptions.map(option => (
                        <button
                          key={option.id}
                          type="button"
                          className="w-full px-4 py-2 text-left hover:bg-yellow-50 focus:bg-yellow-50 focus:outline-none"
                          onClick={() => handleCategoriesSelect(option)}
                        >
                          {option.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Countries</label>
            <div className="mt-1">
              <div className="relative" ref={countriesRef}>
                <div className="min-h-[42px] p-1 border-gray-300 border rounded-lg bg-white flex flex-wrap gap-1">
                  {selectedCountries.map(item => (
                    <span key={item.id} className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm">
                      {item.name}
                      <button onClick={() => handleCountriesRemove(item)} className="ml-1 hover:text-yellow-900">
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="w-full p-1 outline-none"
                      placeholder={selectedCountries.length === 0 ? "Select options..." : ""}
                      value={countrySearchTerm}
                      onChange={(e) => setCountrySearchTerm(e.target.value)}
                      onFocus={() => setOpenCountries(true)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenCountries(!isOpenCountries)}
                    className="self-center px-1"
                  >
                    <FaChevronDown className={`transition-transform ${isOpenCountries ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {isOpenCountries && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredCountriesOptions.length === 0 ? (
                      <div className="p-2 text-gray-500 text-center">No options found</div>
                    ) : (
                      filteredCountriesOptions.map(option => (
                        <button
                          key={option.id}
                          type="button"
                          className="w-full px-4 py-2 text-left hover:bg-yellow-50 focus:bg-yellow-50 focus:outline-none"
                          onClick={() => handleCountriesSelect(option)}
                        >
                          {option.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              rows="2"
              defaultValue={restaurant?.address}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Map URL</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              defaultValue={restaurant?.map}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant Image</label>
            <input
              type="file"
              className="mt-1 block w-full"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-32 w-48 object-cover rounded-lg"
              />
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Social Links</label>
              <button
                type="button"
                onClick={() => setSocialLinksCount(prev => prev + 1)}
                className="text-sm text-[#f99109] hover:text-yellow-600"
              >
                + Add More
              </button>
            </div>
            {Array.from({ length: socialLinksCount }).map((_, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Platform Name"
                  className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={restaurant?.socialLinks[index]?.name}
                />
                <input
                  type="url"
                  placeholder="URL"
                  className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={restaurant?.socialLinks[index]?.url}
                />
                <input
                  type="url"
                  placeholder="Icon URL"
                  className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={restaurant?.socialLinks[index]?.image}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#f99109] rounded-md hover:bg-yellow-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantUpdateModal;
