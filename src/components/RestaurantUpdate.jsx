import React, { useState, useRef, useEffect } from 'react';
import { useNavigate }  from 'react-router-dom';
import { sendMessage } from '../redux/slices/messageSlice';
import { useDispatch } from 'react-redux';
import { FaStar, FaTimes, FaChevronDown } from 'react-icons/fa';
import { updateRestaurant, getRestaurantLists } from '../services/restaurantService';
import { getCategories } from '../services/categoryService';
import { getCountries } from '../services/countryService';
import { getCuisines } from '../services/cuisineService';
 
const RestaurantUpdateModal = ({ restaurant, onClose }) => {
  const [socialLinksCount, setSocialLinksCount] = useState(restaurant?.socialLinks?.length || 1);
  const [phoneCount, setPhoneCount] = useState(restaurant?.phones?.length || 1);
  const [rating, setRating] = useState(restaurant?.rank || 0);
  const [starHoverRating, setStarHoverRating] = useState(0);
  const [priceHoverRating, setPriceHoverRating] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(restaurant?.categories || []);
  const [selectedCountries, setSelectedCountries] = useState(restaurant?.countries || []);
  const [isOpenCategories, setOpenCategories] = useState(false);
  const [isOpenCountries, setOpenCountries] = useState(false);
  const [isOpenCuisines, setOpenCuisines] = useState(false);
  const [cuisineSearchTerm, setCuisineSearchTerm] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState(restaurant?.cuisines || []);
  const [priceRate, setPriceRate] = useState(restaurant?.priceRange| 0);
  const [promotion, setPromotion] = useState(restaurant?.promoRate || 0);
  const [additionalImagesCount, setAdditionalImagesCount] = useState(restaurant?.otherPhoto?.length || 1);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState(restaurant?.otherPhoto || []);
  const [errors, setErrors] = useState({
    categories: false,
    countries: false,
    cuisines: false
  });
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const cuisinesRef = useRef(null);
  const categoriesRef = useRef(null);
  const countriesRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleCuisinesSelect = (option) => {
    setSelectedCuisines([...selectedCuisines, option]);
    setCuisineSearchTerm('');
  };

  const handleCuisinesRemove = (optionToRemove) => {
    setSelectedCuisines(selectedCuisines.filter(item => item.id !== optionToRemove.id));
  };

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

  // Update the click handlers for dropdowns
  const handleCategoriesClick = () => {
    setOpenCategories(!isOpenCategories);
    setOpenCountries(false);
    setOpenCuisines(false);
  };

  const handleCountriesClick = () => {
    setOpenCountries(!isOpenCountries);
    setOpenCategories(false);
    setOpenCuisines(false);
  };

  const handleCuisinesClick = () => {
    setOpenCuisines(!isOpenCuisines);
    setOpenCategories(false);
    setOpenCountries(false);
  };

  // Update the input focus handlers
  const handleCategoriesFocus = () => {
    setOpenCategories(true);
    setOpenCountries(false);
    setOpenCuisines(false);
  };

  const handleCountriesFocus = () => {
    setOpenCountries(true);
    setOpenCategories(false);
    setOpenCuisines(false);
  };

  const handleCuisinesFocus = () => {
    setOpenCuisines(true);
    setOpenCategories(false);
    setOpenCountries(false);
  };

    // Update the filtered options to use the fetched data
    const filteredCategoriesOptions = categories.filter(option => 
      option.name.toLowerCase().includes(categorySearchTerm.toLowerCase()) &&
      !selectedCategories.some(item => item.id === option.id)
    );
  
    const filteredCountriesOptions = countries.filter(option =>
      option.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) &&
      !selectedCountries.some(item => item.id === option.id)
    );
  
    const filteredCuisinesOptions = cuisines.filter(option =>
      option.name.toLowerCase().includes(cuisineSearchTerm.toLowerCase()) &&
      !selectedCuisines.some(item => item.id === option.id)
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

  const handleDeleteAdditionalImage = (index) => {
    setAdditionalImagePreviews(prev => {
      const newPreviews = [...prev];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
    setAdditionalImagesCount(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ categories: false, countries: false, cuisines: false });

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

    if (hasErrors) return;

    try {
      const formData = new FormData();
      
      // Basic information
      formData.append('id', restaurant?.id);
      formData.append('name', e.target.elements.name.value);
      formData.append('description', e.target.elements.description.value);
      formData.append('address', e.target.elements.address.value);
      formData.append('map', e.target.elements.map.value);
      formData.append('rank', rating);
      formData.append('priceRange', priceRate);
      formData.append('promoRate', promotion);
      formData.append('isPromotion', promotion > 0 ? 'true' : 'false');
      formData.append('openHour', e.target.elements.openHour.value);
      formData.append('closeHour', e.target.elements.closeHour.value);

      // Handle phone numbers
      const phoneNumbers = Array.from(e.target.elements)
        .filter(element => element.name.startsWith('phones['))
        .map(element => element.value)
        .filter(value => value);
      formData.append('phones', phoneNumbers.join(','));

      // Handle main image
      const mainImageInput = e.target.elements.img;
      if (mainImageInput?.files[0]) {
        formData.append('img', mainImageInput.files[0]);
      }

      // Handle IDs as arrays
      formData.append('categoryIds', selectedCategories.map(cat => cat.id).join(','));
      formData.append('countryIds', selectedCountries.map(country => country.id).join(','));
      formData.append('cuisineIds', selectedCuisines.map(cuisine => cuisine.id).join(','));

      // Handle additional images
      const additionalImageInputs = Array.from(e.target.elements)
        .filter(element => element.name.startsWith('additionalImages-'))
        .map(element => element.files[0])
        .filter(file => file);

      additionalImageInputs.forEach(file => {
        formData.append('otherPhoto', file);
      });

      // Handle social links in the exact format required
      const socialLinks = [];
      Array.from({ length: socialLinksCount }).forEach((_, index) => {
        const platform = e.target.elements[`socialLinks-${index}-name`]?.value.toLowerCase();
        const url = e.target.elements[`socialUrl${index}`]?.value;
        if (platform && url) {
          socialLinks.push({ platform, url });
        }
      });
      formData.append('socialLink', JSON.stringify(socialLinks));

      // Send the form data to the backend
      const response = await updateRestaurant(restaurant.id, formData);
      
      // Check if response exists and has data
      if (response && response.data) {
        dispatch(sendMessage({ type: 'success', text: 'Restaurant updated successfully!' }));
        // Fetch updated restaurant list and pass the updated data
        const updatedList = await getRestaurantLists();
        if (updatedList) {
          // Pass the updated data to parent component
          onClose(updatedList);
        }
        // Clear message after 5 seconds
        setTimeout(() => {
          dispatch(sendMessage(null));
        }, 5000);
      } else {
        console.error('Update failed:', response?.error || 'Unknown error');
        dispatch(sendMessage({ 
          type: 'error', 
          text: response?.error || 'Failed to update restaurant. Please try again.' 
        }));
      }
    } catch (error) {
      console.error('Error updating restaurant:', error);
      dispatch(sendMessage({ 
        type: 'error', 
        text: error?.message || 'An error occurred while updating the restaurant.' 
      }));
    }
  };

  // Update the PriceRating component
  const PriceRating = ({ value, onChange }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((price) => (
          <span
            key={price}
            className={`text-2xl cursor-pointer ${
              (priceHoverRating || value) >= price
                ? 'text-[#f99109]'
                : 'text-gray-300'
            } hover:text-[#f99109]`}
            onClick={() => onChange(price)}
            onMouseEnter={() => setPriceHoverRating(price)}
            onMouseLeave={() => setPriceHoverRating(0)}
          >
            $
          </span>
        ))}
        <span className="ml-2 text-gray-600">{value || priceHoverRating || 0}</span>
      </div>
    );
  }; 

  // Update the StarRating component
  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-2xl cursor-pointer ${
              (starHoverRating || value) >= star
                ? 'text-[#f99109]'
                : 'text-gray-300'
            } hover:text-[#f99109]`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setStarHoverRating(star)}
            onMouseLeave={() => setStarHoverRating(0)}
          />
        ))}
        <span className="ml-2 text-gray-600">{value || starHoverRating || 0}</span>
      </div>
    );
  };

  // Add this useEffect for fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, countriesRes, cuisinesRes] = await Promise.all([
          getCategories(),
          getCountries(),
          getCuisines()
        ]);

        setCategories(categoriesRes.data || []);
        setCountries(countriesRes.data || []);
        setCuisines(cuisinesRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside of all dropdown containers
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

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add this useEffect to handle the initial image
  useEffect(() => {
    if (restaurant?.img) {
      // Check if the image path already includes the base URL
      const imagePath = restaurant.img.startsWith('http') 
        ? restaurant.img 
        : `${import.meta.env.VITE_API_BASE_URL}/${restaurant.img}`;
      setImagePreview(imagePath);
    }
  }, [restaurant]);

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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                defaultValue={restaurant?.name}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rank</label>
              <StarRating value={rating} onChange={setRating} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              rows="3"
              defaultValue={restaurant?.description}
              required
            />
          </div>

          {/* Phone Numbers */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Phone Numbers
                <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setPhoneCount(prev => prev + 1)}
                className="text-sm text-[#f99109] hover:text-yellow-600"
              >
                + Add More
              </button>
            </div>
            {Array.from({ length: phoneCount }).map((_, index) => (
              <div key={index} className="mb-2">
                <input
                  type="tel"
                  name={`phones[${index}]`}
                  pattern="[0-9\-\+]{1,20}"
                  maxLength={20}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={restaurant?.phones?.[index]}
                  required={index === 0}
                  placeholder="Enter phone number (e.g., +1234567890)"
                  onKeyDown={(e) => {
                    if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(e.key)) return;
                    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) return;
                    if (!/[0-9\-\+]/.test(e.key)) e.preventDefault();
                  }}
                />
              </div>
            ))}
          </div>

          {/* Operating Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Opening Hour
                <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="openHour"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                defaultValue={restaurant?.openHour}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Closing Hour
                <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="closeHour"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                defaultValue={restaurant?.closeHour}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Promotion (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                placeholder="Enter promotion percentage (0-100)"
                value={promotion}
                onChange={(e) => setPromotion(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <PriceRating value={priceRate} onChange={setPriceRate} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categories
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <div className={`relative ${errors.categories ? 'border-red-500 rounded-lg' : ''}`} ref={categoriesRef}>
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
                      onFocus={handleCategoriesFocus}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCategoriesClick}
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
                      onFocus={handleCountriesFocus}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCountriesClick}
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
                <div className="min-h-[42px] p-1 border-gray-300 border rounded-lg bg-white flex flex-wrap gap-1">
                  {selectedCuisines.map(item => (
                    <span key={item.id} className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm">
                      {item.name}
                      <button onClick={() => handleCuisinesRemove(item)} className="ml-1 hover:text-yellow-900">
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
                      onFocus={handleCuisinesFocus}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCuisinesClick}
                    className="self-center px-1"
                  >
                    <FaChevronDown className={`transition-transform ${isOpenCuisines ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {isOpenCuisines && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredCuisinesOptions.length === 0 ? (
                      <div className="p-2 text-gray-500 text-center">No cuisines found</div>
                    ) : (
                      filteredCuisinesOptions.map(option => (
                        <button
                          key={option.id}
                          type="button"
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
              name="address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              rows="2"
              defaultValue={restaurant?.address}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Map URL
              <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="map"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              defaultValue={restaurant?.map}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant Image
              <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="img"
              className="mt-1 block w-full"
              accept="image/*"
              onChange={handleImageChange}
              required={!imagePreview}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-32 w-48 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Additional Images Section */}
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
                        onClick={() => handleDeleteAdditionalImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      name={`additionalImages-${index}`}
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
                  name={`socialLinks-${index}-name`}
                  placeholder="Platform Name"
                  className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={restaurant?.socialLinks[index]?.platform}
                />
                <input
                  type="url"
                  name={`socialUrl${index}`}
                  placeholder="URL"
                  className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={restaurant?.socialLinks[index]?.url}
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
