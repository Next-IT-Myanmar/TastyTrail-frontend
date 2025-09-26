import React, { useState, useRef, useEffect } from 'react';
import { FaStar, FaTimes, FaChevronDown } from 'react-icons/fa';
import { createRestaurant , getRestaurantLists } from '../services/restaurantService';
import { getCategories } from '../services/categoryService';
import { getCountries } from '../services/countryService';
import { getCuisines } from '../services/cuisineService';
import { TimePicker } from 'react-accessible-time-picker';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';


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
  const [phoneNumbers, setPhoneNumbers] = useState(['']);
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

  // Add new states for API data
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState({
    categories: false,
    countries: false,
    cuisines: false
  });
  const [openTime, setOpenTime] = useState({ hour: '', minute: '', period: 'AM' });
  const [closeTime, setCloseTime] = useState({ hour: '', minute: '', period: 'AM' });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    img: null,
    otherPhoto: [],
    map: '',
    address: '',
    openHour: '',
    closeHour: '',
    rank: 0,
    priceRate: 0,
    isPromotion: false,
    promoRate: 0,
    categoryIds: '',
    countryIds: '',
    cuisineIds: '',
    socialLink: '',
  })

  const handleCuisinesSelect = (option) => {
    setSelectedCuisines([...selectedCuisines, option]);
    setCuisineSearchTerm('');
  };

  const handleCuisinesRemove = (optionToRemove) => {
    setSelectedCuisines(selectedCuisines.filter(item => item.id !== optionToRemove.id));
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, '']);
  };

  const handlePhoneNumberChange = (index, value) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleDeletePhone = (index) => {
    if (index !== 0) { // Prevent deleting the first phone number input
      const newPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
      setPhoneNumbers(newPhoneNumbers);
    }
  };

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
      // Update formData state with the new file
      setFormData(prev => {
        const newOtherPhoto = [...prev.otherPhoto];
        newOtherPhoto[index] = file;
        return { ...prev, otherPhoto: newOtherPhoto };
      });

      // Update preview
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

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, categories: true }));
        const categoriesResponse = await getCategories();
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(prev => ({ ...prev, categories: false }));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, countries: true }));
        const countriesResponse = await getCountries();
        setCountries(countriesResponse.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(prev => ({ ...prev, countries: false }));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, cuisines: true }));
        const cuisinesResponse = await getCuisines();
        setCuisines(cuisinesResponse.data);
      } catch (error) {
        console.error('Error fetching cuisines:', error);
      } finally {
        setLoading(prev => ({ ...prev, cuisines: false }));
      }
    };
    fetchData();
  }, []);

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

  // Update the filtered options to use API data
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

  const formatTimeTo24Hour = ({ hour, minute, period }) => {
  if (!hour || !minute || !period) return '';

  let h = parseInt(hour, 10);
  const m = minute.padStart(2, '0');

  if (period === 'PM' && h !== 12) {
    h += 12;
  } else if (period === 'AM' && h === 12) {
    h = 0;
  }

  return `${h.toString().padStart(2, '0')}:${m}`;
};


  const handleSubmit = async (e) => {
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
      setErrors(prev => ({...prev, categories: true }));
      hasErrors = true;
    }
    if (selectedCountries.length === 0) {
      setErrors(prev => ({...prev, countries: true }));
      hasErrors = true;
    }
    if (selectedCuisines.length === 0) {
      setErrors(prev => ({...prev, cuisines: true }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Update formData state with form values
      const updatedFormData = {
        name: e.target.name.value,
        description: e.target.description.value,
        phones: phoneNumbers.filter(phone => phone.trim() !== ''), // Changed from phoneNumber
        address: e.target.address.value,
        map: e.target.map.value,
        openHour: formatTimeTo24Hour(openTime),
        closeHour: formatTimeTo24Hour(closeTime),
        rank: rating,
        priceRange: priceRate,
        isPromotion: e.target.promotion?.value > 0,
        promoRate: e.target.promotion?.value || 0,
        categoryIds: selectedCategories.map(cat => cat.id).join(','),
        countryIds: selectedCountries.map(country => country.id).join(','),
        cuisineIds: selectedCuisines.map(cuisine => cuisine.id).join(','),
      };

      // Update the formData state
      setFormData(prevData => ({
        ...prevData,
        ...updatedFormData
      }));

      // Append all form data
      Object.keys(updatedFormData).forEach(key => {
        formDataToSend.append(key, updatedFormData[key]);
      });

      // Handle main image
      const mainImageInput = e.target.querySelector('input[type="file"]');
      if (mainImageInput?.files[0]) {
        formDataToSend.append('img', mainImageInput.files[0]);
      }

      // // Handle additional images
      // const additionalImageInputs = Array.from(e.target.querySelectorAll('input[type="file"]')).slice(1);
      // additionalImageInputs.forEach((input) => {
      //   if (input.files[0]) {
      //     formDataToSend.append('otherPhoto', input.files[0]);
      //   }
      // });

      // Handle additional images
      formData.otherPhoto.forEach((file) => {
        if (file) {
          formDataToSend.append('otherPhoto', file);
        }
      });

      // Handle social links
      const socialLinks = Array.from({ length: socialLinksCount }).map((_, index) => ({
        platform: e.target[`platform${index}`]?.value,
        url: e.target[`url${index}`]?.value,
      })).filter(link => link.platform && link.url);
      formDataToSend.append('socialLink', JSON.stringify(socialLinks));

      // Call the API
      const response = await createRestaurant(formDataToSend);
      if (response) {
        // Fetch updated restaurant list
        const updatedList = await getRestaurantLists();
        if (updatedList) {
          onClose(updatedList);
        } else {
          onClose();
        }
      }  
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Restaurant</h1>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          Back to List
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 pb-3">
                Rank
              </label>
              <StarRating value={rating} onChange={setRating} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              rows="3"
              required
            />
          </div>

          {/*  Update the phone number section in the form */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
                <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleAddPhoneNumber}
                className="text-sm text-[#f99109] hover:text-yellow-600"
              >
                + Add More
              </button>
            </div>
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  name={`phoneNumber${index}`}
                  value={phone}
                  onChange={(e) =>
                    handlePhoneNumberChange(index, e.target.value)
                  }
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  required={index === 0}
                  placeholder="Enter phone number"
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleDeletePhone(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
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
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Opening Hour
                <span className="text-red-500">*</span>
              </label>
              <div
                className="mt-2"
                style={{
                  "--time-focus-border": "#f99109",
                  "--time-focus-ring": "0 0 0 5px rgba(249,145,9,0.4)",
                  "--time-border": "#d1d5db", // optional: gray-300
                }}
              >
                <TimePicker
                  value={openTime}
                  onChange={setOpenTime}
                  is24Hour={false}
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Closing Hour
                <span className="text-red-500">*</span>
              </label>
              <div
                className="mt-2"
                style={{
                  "--time-focus-border": "#f99109",
                  "--time-focus-ring": "0 0 0 3px rgba(249,145,9,0.4)",
                  "--time-border": "#d1d5db", // optional: gray-300
                }}
              >
                <TimePicker
                  value={closeTime}
                  onChange={setCloseTime}
                  is24Hour={false}
                  required
                />
              </div>
            </div>
          </div>

          <div></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Promotion (%)
              </label>
              <input
                type="number"
                name="promotion"
                min="0"
                max="100"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                placeholder="Enter promotion percentage(0-100)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 pb-3">
                Price Range
              </label>
              <PriceRating value={priceRate} onChange={setPriceRate} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categories
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <div
                className={`relative ${
                  errors.categories ? "border-red-500 rounded-lg" : ""
                }`}
                ref={categoriesRef}
              >
                {/* Selected Items */}
                <div className="min-h-[42px] p-1 border-gray-300 border rounded-lg bg-white flex flex-wrap gap-1">
                  {selectedCategories.map((item) => (
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
                      placeholder={
                        selectedCategories.length === 0
                          ? "Select options..."
                          : ""
                      }
                      value={categorySearchTerm}
                      onChange={(e) => setCategorySearchTerm(e.target.value)}
                      onFocus={() => setOpenCategories(true)}
                    />
                  </div>

                  <button
                    onClick={() => setOpenCategories(!isOpenCategories)}
                    className="self-center px-1"
                  >
                    <FaChevronDown
                      className={`transition-transform ${
                        isOpenCategories ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Dropdown */}
                {isOpenCategories && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredCategoriesOptions.length === 0 ? (
                      <div className="p-2 text-gray-500 text-center">
                        No options found
                      </div>
                    ) : (
                      filteredCategoriesOptions.map((option) => (
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
                <p className="mt-1 text-sm text-red-500">
                  Please select at least one category
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Countries
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <div
                className={`relative ${
                  errors.countries ? "border-red-500 rounded-lg" : ""
                }`}
                ref={countriesRef}
              >
                {/* Selected Items */}
                <div className="min-h-[42px] p-1 border-gray-300 border rounded-lg bg-white flex flex-wrap gap-1">
                  {selectedCountries.map((item) => (
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
                      placeholder={
                        selectedCountries.length === 0
                          ? "Select options..."
                          : ""
                      }
                      value={countrySearchTerm}
                      onChange={(e) => setCountrySearchTerm(e.target.value)}
                      onFocus={() => setOpenCountries(true)}
                    />
                  </div>

                  <button
                    onClick={() => setOpenCountries(!isOpenCountries)}
                    className="self-center px-1"
                  >
                    <FaChevronDown
                      className={`transition-transform ${
                        isOpenCountries ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Dropdown */}
                {isOpenCountries && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredCountriesOptions.length === 0 ? (
                      <div className="p-2 text-gray-500 text-center">
                        No options found
                      </div>
                    ) : (
                      filteredCountriesOptions.map((option) => (
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
                <p className="mt-1 text-sm text-red-500">
                  Please select at least one country
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cuisines
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <div
                className={`relative ${
                  errors.cuisines ? "border-red-500 rounded-lg" : ""
                }`}
                ref={cuisinesRef}
              >
                {/* Selected Items */}
                <div className="min-h-[42px] p-1 border-gray-300 border rounded-lg bg-white flex flex-wrap gap-1">
                  {selectedCuisines.map((item) => (
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
                      placeholder={
                        selectedCuisines.length === 0
                          ? "Select cuisines..."
                          : ""
                      }
                      value={cuisineSearchTerm}
                      onChange={(e) => setCuisineSearchTerm(e.target.value)}
                      onFocus={() => setOpenCuisines(true)}
                    />
                  </div>

                  <button
                    onClick={() => setOpenCuisines(!isOpenCuisines)}
                    className="self-center px-1"
                  >
                    <FaChevronDown
                      className={`transition-transform ${
                        isOpenCuisines ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Dropdown */}
                {isOpenCuisines && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredCuisinesOptions.length === 0 ? (
                      <div className="p-2 text-gray-500 text-center">
                        No cuisines found
                      </div>
                    ) : (
                      filteredCuisinesOptions.map((option) => (
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
                <p className="mt-1 text-sm text-red-500">
                  Please select at least one cuisine
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              rows="2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Map URL
              <span className="text-red-500">*</span>
            </label>
            <input
              name="map"
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Restaurant Image
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
              <label className="block text-sm font-medium text-gray-700">
                Additional Images
              </label>
              <ToastContainer position="top-right" autoClose={3000} />
              <button
                type="button"
                onClick={() => {
                  setAdditionalImagesCount((prev) => {
                    if (prev >= 10) {
                      toast.error("You can upload a maximum of 10 images.");
                      return prev; // don’t increase count
                    }
                    return prev + 1;
                  });
                }}
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
              <label className="block text-sm font-medium text-gray-700">
                Social Links
              </label>
              <button
                type="button"
                onClick={() => setSocialLinksCount((prev) => prev + 1)}
                className="text-sm text-[#f99109] hover:text-yellow-600"
              >
                + Add More
              </button>
            </div>
            {Array.from({ length: socialLinksCount }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2"
              >
                <input
                  name={`platform${index}`}
                  type="text"
                  placeholder="Platform Name"
                  className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                />
                <input
                  name={`url${index}`}
                  type="url"
                  placeholder="URL"
                  className="rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => setSocialLinksCount((prev) => prev - 1)}
                    className="self-center text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                )}
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