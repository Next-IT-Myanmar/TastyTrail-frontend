import React, { useState,useRef, useEffect } from 'react';
import { FaStar, FaTimes, FaChevronDown } from 'react-icons/fa';

const RestaurantCreateModal = ({ onClose }) => {
  const [errors, setErrors] = useState({
    categories: false,
    countries: false,
    cuisines: false
  });
  const [socialLinksCount, setSocialLinksCount] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [additionalImagesCount, setAdditionalImagesCount] = useState(1);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);

  const [isOpenCategories, setOpenCategories] = useState(false);
  const [isOpenCountries, setOpenCountries] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [operatingDays, setOperatingDays] = useState([]);
  const [isOpenCuisines, setOpenCuisines] = useState(false);
  const [cuisineSearchTerm, setCuisineSearchTerm] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [priceRate, setPriceRate] = useState(0);
  const [hoverPriceRate, setHoverPriceRate] = useState(0);
  const [promotion, setPromotion] = useState(0);
  const cuisinesRef = useRef(null);
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
  
  const optionCuisines = [
    { id: 1, name: 'Mala Xiang Guo' },
    { id: 2, name: 'Noodle Soup' },
    { id: 3, name: 'Hot Pot' },
    { id: 4, name: 'Dim Sum' },
    { id: 5, name: 'Sushi' },
    { id: 6, name: 'BBQ' },
  ];

  const optionCountries = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }, 
  ]

  const filteredCuisinesOptions = optionCuisines.filter(option =>
    option.name.toLowerCase().includes(cuisineSearchTerm.toLowerCase()) &&
    !selectedCuisines.some(item => item.id === option.id)
  );

  const handleCuisinesSelect = (option) => {
    setSelectedCuisines([...selectedCuisines, option]);
    setCuisineSearchTerm('');
  };

  const handleCuisinesRemove = (optionToRemove) => {
    setSelectedCuisines(selectedCuisines.filter(item => item.id !== optionToRemove.id));
  };

  // const handleDayChange = (day) => {
  //   setOperatingDays(prev => 
  //     prev.includes(day) 
  //       ? prev.filter(d => d !== day)
  //       : [...prev, day]
  //   );
  // };

  const handleDeleteImage = (index) => {
    // Remove image preview
    setAdditionalImagePreviews(prev => {
      const newPreviews = [...prev];
      newPreviews.splice(index, 1);
      return newPreviews;
    });

    // Decrease the image count
    setAdditionalImagesCount(prev => Math.max(0, prev - 1));

    // Remove the file input and its container
    const container = document.querySelector(`#image-container-${index}`);
    if (container) {
      container.remove();
    }
  };

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

  const handleAdditionalImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalImagePreviews(prev => {
          const newPreviews = [...prev];
          newPreviews[index] = reader.result;
          return newPreviews;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const PriceRating = ({ value, onChange }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((price) => (
          <span
            key={price}
            className={`text-2xl cursor-pointer ${
              (hoverPriceRate || value) >= price
                ? 'text-[#f99109]'
                : 'text-gray-300'
            } hover:text-[#f99109]`}
            onClick={() => onChange(price)}
            onMouseEnter={() => setHoverPriceRate(price)}
            onMouseLeave={() => setHoverPriceRate(0)}
          >
            $
          </span>
        ))}
        <span className="ml-2 text-gray-600">{value || hoverPriceRate || 0}</span>
      </div>
    );
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setOpenCategories(false);
      }
      if (countriesRef.current && !countriesRef.current.contains(event.target)) {
        setOpenCountries(false);
      }
      if (cuisinesRef.current && !cuisinesRef.current.contains(event.target)) {
        setOpenCuisines(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCategoriesOptions = optionsCategories.filter(option => 
    option.name.toLowerCase().includes(categorySearchTerm.toLowerCase()) &&
    !selectedCategories.some(item => item.id === option.id)
  );

  const filteredCountriesOptions = optionCountries.filter(option =>
    option.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) &&
    !selectedCountries.some(item => item.id === option.id)
  );

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
    setSelectedCountries(selectedCountries.filter(item => item.id!== optionToRemove.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({
      categories: false,
      countries: false,
      cuisines: false
    });

    // Validate required fields
    let hasErrors = false;
    if (selectedCategories.length === 0) {
      setErrors(prev => ({ ...prev, categories: true }));
      hasErrors = true;
    }
    if (selectedCountries.length === 0) {
      setErrors(prev => ({ ...prev, countries: true }));
      hasErrors = true;
    }
    if (selectedCuisines.length === 0) {
      setErrors(prev => ({ ...prev, cuisines: true }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    // Continue with form submission
    // ... rest of your submit logic
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Restaurant</h1>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800"
        >
          Back to List
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 pb-3">Rank</label>
              <StarRating value={rating} onChange={setRating} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description
              <span className="text-red-500">*</span>
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number
              <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              pattern="[0-9-]{1,20}"
              maxLength={20}
              onKeyDown={(e) => {
                // Allow: backspace, delete, tab, escape, enter
                if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(e.key)) {
                  return;
                }
                // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
                  return;
                }
                // Allow: numbers
                if (!/[0-9-]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              required
              placeholder="Enter phone number (numbers only)"
            />
          </div>
          {/* Operating Days */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Operating Days</label>
            <div className="flex flex-wrap gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <label key={day} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={operatingDays.includes(day)}
                    onChange={() => handleDayChange(day)}
                    className="form-checkbox h-5 w-5 text-[#f99109] rounded border-gray-300 focus:ring-[#f99109]"
                  />
                  <span className="ml-2 text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div> */}
          {/* Operating Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Opening Hour
                <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Closing Hour
                <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                required
              />
            </div>
          </div>

          <div>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Promotion (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                placeholder="Enter promotion percentage(0-100)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 pb-3">Price Range</label>
              <PriceRating value={priceRate} onChange={setPriceRate} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categories
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <div className={`relative ${errors.categories ? 'border-red-500 rounded-lg' : ''}`} ref={categoriesRef}>
                {/* Selected Items */}
                <div className="min-h-[42px] p-1 border-gray-300 border rounded-lg bg-white flex flex-wrap gap-1">
                  {selectedCategories.map(item => (
                    <span
                      key={item.id}
                      className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm"
                    >
                      {item.name}
                      <button
                        onClick={() => handleCategoriesRemove(item)}
                        className="ml-1 hover:text-yellow-900"
                      >
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
                    onClick={() => setOpenCategories(!isOpenCategories)}
                    className="self-center px-1"
                  >
                    <FaChevronDown className={`transition-transform ${isOpenCategories ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Dropdown */}
                {isOpenCategories && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredCategoriesOptions.length === 0 ? (
                      <div className="p-2 text-gray-500 text-center">No options found</div>
                    ) : (
                      filteredCategoriesOptions.map(option => (
                        <button
                          key={option.id}
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
              {errors.categories && (
                <p className="mt-1 text-sm text-red-500">Please select at least one category</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Countries
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <div className={`relative ${errors.countries ? 'border-red-500 rounded-lg' : ''}`} ref={countriesRef}>
                {/* Selected Items */}
                <div className="min-h-[42px] p-1 border-gray-300 border rounded-lg bg-white flex flex-wrap gap-1">
                  {selectedCountries.map(item => (
                    <span
                      key={item.id}
                      className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm"
                    >
                      {item.name}
                      <button
                        onClick={() => handleCountriesRemove(item)}
                        className="ml-1 hover:text-yellow-900"
                      >
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
                    onClick={() => setOpenCountries(!isOpenCountries)}
                    className="self-center px-1"
                  >
                    <FaChevronDown className={`transition-transform ${isOpenCountries ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Dropdown */}
                {isOpenCountries && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredCountriesOptions.length === 0 ? (
                      <div className="p-2 text-gray-500 text-center">No options found</div>
                    ) : (
                      filteredCountriesOptions.map(option => (
                        <button
                          key={option.id}
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
              {errors.countries && (
                <p className="mt-1 text-sm text-red-500">Please select at least one country</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cuisines
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <div className={`relative ${errors.cuisines ? 'border-red-500 rounded-lg' : ''}`} ref={cuisinesRef}>
                {/* Selected Items */}
                <div className="min-h-[42px] p-1 border-gray-300 border rounded-lg bg-white flex flex-wrap gap-1">
                  {selectedCuisines.map(item => (
                    <span
                      key={item.id}
                      className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm"
                    >
                      {item.name}
                      <button
                        onClick={() => handleCuisinesRemove(item)}
                        className="ml-1 hover:text-yellow-900"
                      >
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="w-full p-1 outline-none"
                      placeholder={selectedCuisines.length === 0 ? "Select cuisines..." : ""}
                      value={cuisineSearchTerm}
                      onChange={(e) => setCuisineSearchTerm(e.target.value)}
                      onFocus={() => setOpenCuisines(true)}
                    />
                  </div>
                  
                  <button
                    onClick={() => setOpenCuisines(!isOpenCuisines)}
                    className="self-center px-1"
                  >
                    <FaChevronDown className={`transition-transform ${isOpenCuisines ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Dropdown */}
                {isOpenCuisines && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredCuisinesOptions.length === 0 ? (
                      <div className="p-2 text-gray-500 text-center">No cuisines found</div>
                    ) : (
                      filteredCuisinesOptions.map(option => (
                        <button
                          key={option.id}
                          className="w-full px-4 py-2 text-left hover:bg-yellow-50 focus:bg-yellow-50 focus:outline-none"
                          onClick={() => handleCuisinesSelect(option)}
                        >
                          {option.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
              {errors.cuisines && (
                <p className="mt-1 text-sm text-red-500">Please select at least one cuisine</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address
              <span className="text-red-500">*</span>
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              rows="2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Map URL
              <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant Image
              <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              className="mt-1 block w-full"
              accept="image/*"
              onChange={handleImageChange}
              required
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
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Additional Images</label>
              <button
                type="button"
                onClick={() => setAdditionalImagesCount(prev => prev + 1)}
                className="text-sm text-[#f99109] hover:text-yellow-600"
              >
                + Add More Images
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
              {Array.from({ length: additionalImagesCount }).map((_, index) => (
                <div key={`image-${index}`} className="relative">
                  {additionalImagePreviews[index] ? (
                    <div className="relative">
                      <img
                        src={additionalImagePreviews[index]}
                        alt={`Preview ${index + 1}`}
                        className="mt-2 h-32 w-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-1 block w-48"
                      onChange={(e) => handleAdditionalImageChange(e, index)}
                    />
                  )}
                </div>
              ))}
            </div>
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
                />
                <input
                  type="url"
                  placeholder="URL"
                  className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantCreateModal;