import React, { useState, useEffect } from 'react';
import { FaDownload, FaStar, FaSmile } from 'react-icons/fa';
import coverImage from '../assets/images/counter-cover.jpg';
import '../index.css'

const CounterTwo = () => {
  const [counters, setCounters] = useState({
    downloads: 0,
    rating: 0,
    reviews: 0
  });

  useEffect(() => {
    const targets = {
      downloads: 25000,
      rating: 4.8,
      reviews: 1200
    };

    Object.entries(targets).forEach(([key, target]) => {
      const steps = 50;
      const increment = key === 'rating' ? target / steps : Math.floor(target / steps);
      let current = 0;

      const timer = setInterval(() => {
        if (current >= target) {
          clearInterval(timer);
          return;
        }

        current += increment;
        setCounters(prev => ({
          ...prev,
          [key]: key === 'rating'
            ? Number(Math.min(current, target).toFixed(1))
            : Math.floor(Math.min(current, target))
        }));
      }, 40);

      return () => clearInterval(timer);
    });
  }, []);

  return (
    <div className="relative mt-12 md:mt-20 py-20 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${coverImage})` }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 py-8 px-4">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="text-center">
            <div className="text-xl sm:text-xl mb-4 flex justify-center">
              <FaDownload className="text-white text-xl sm:text-2xl hover:scale-110 transition-transform" /> 
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              {counters.downloads}+
            </div>
            <div className="text-white font-medium text-xs sm:text-sm md:text-base">
              Downloads
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl sm:text-xl mb-4 flex justify-center">
              <FaStar className="text-white text-xl sm:text-2xl hover:scale-110 transition-transform" /> 
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              {counters.rating}
            </div>
            <div className="text-white font-medium text-xs sm:text-sm md:text-base">
              Rating
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl sm:text-xl mb-4 flex justify-center">
              <FaSmile className="text-white text-xl sm:text-2xl hover:scale-110 transition-transform" /> 
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              {counters.reviews}+
            </div>
            <div className="text-white font-medium text-xs sm:text-sm md:text-base">
              Reviews
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterTwo;