import React, { useState, useEffect, useRef } from 'react';
import { FaUsers, FaDownload, FaStar, FaSmile } from 'react-icons/fa';
import coverImage from '../assets/images/restaurant-cover1.jpg';
import '../index.css'

const Counter = () => {
  const [counters, setCounters] = useState({
    users: 0,
    downloads: 0,
    rating: 0,
    reviews: 0
  });

  const sectionRef = useRef(null);

  const counterData = [
    { id: 'users', icon: <FaUsers className="text-yellow-400" />, target: 15000, label: 'Active Users', suffix: '+' },
    { id: 'downloads', icon: <FaDownload className="text-yellow-400" />, target: 20000, label: 'Downloads', suffix: '+' },
    { id: 'rating', icon: <FaStar className="text-yellow-400" />, target: 4.8, label: 'Rating', suffix: '' },
    { id: 'reviews', icon: <FaSmile className="text-yellow-400" />, target: 1200, label: 'Reviews', suffix: '+' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounting();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const startCounting = () => {
    counterData.forEach(({ id, target }) => {
      const steps = 30;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        if (current >= target) {
          clearInterval(timer);
          return;
        }

        current += increment;
        setCounters(prev => ({
          ...prev,
          [id]: id === 'rating' ? Math.min(current, target).toFixed(1) : Math.floor(Math.min(current, target))
        }));
      }, 50);
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 relative bg-cover bg-center bg-fixed min-h-[400px] flex items-center"
      style={{ backgroundImage: `url(${coverImage})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {counterData.map(({ id, icon, label, suffix }) => (
            <div key={id} className="text-center group">
              <div className="text-4xl mb-4 flex justify-center">
                {icon}
              </div>
              <div className="text-3xl md:text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                {counters[id]}{suffix}
              </div>
              <div className="text-gray-300 text-lg uppercase tracking-wider font-medium">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;