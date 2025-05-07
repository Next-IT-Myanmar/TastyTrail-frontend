import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes, FaChevronDown } from 'react-icons/fa';

const Setting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const dropdownRef = useRef(null);

  const options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Another Option' },
    { id: 5, name: 'Something Else' },
    { id: 6, name: 'Last Option' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option => 
    option.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedItems.some(item => item.id === option.id)  // Changed this line
  );

  const handleSelect = (option) => {
    setSelectedItems([...selectedItems, option]);
    setSearchTerm('');
  };

  const handleRemove = (optionToRemove) => {
    setSelectedItems(selectedItems.filter(item => item.id !== optionToRemove.id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Multi Select with Search
        </label>
        
        <div className="relative" ref={dropdownRef}>
          {/* Selected Items */}
          <div className="min-h-[42px] p-1 border rounded-lg bg-white flex flex-wrap gap-1">
            {selectedItems.map(item => (
              <span
                key={item.id}
                className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm"
              >
                {item.name}
                <button
                  onClick={() => handleRemove(item)}
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
                placeholder={selectedItems.length === 0 ? "Select options..." : ""}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsOpen(true)}
              />
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="self-center px-1"
            >
              <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="p-2 text-gray-500 text-center">No options found</div>
              ) : (
                filteredOptions.map(option => (
                  <button
                    key={option.id}
                    className="w-full px-4 py-2 text-left hover:bg-yellow-50 focus:bg-yellow-50 focus:outline-none"
                    onClick={() => handleSelect(option)}
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
  );
};

export default Setting;