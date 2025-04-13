import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import '../index.css'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  // Add this function after the useEffect hook
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to={'/'} className="flex items-center">
            <img src={logo} alt="Logo" className="w-12 pr-2"/>
            <span className="text-xl font-semibold text-yellow-400 ">My Tasty</span>
          </Link>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-500 font-[600] text-[16px]">Home</a>
            <a href="#feature" className="text-gray-700 hover:text-blue-500 font-[600] text-[16px]">Feature</a>
            <a href="#about" className="text-gray-700 hover:text-blue-500 font-[600] text-[16px]">About</a>
            <a href="#howwork" className="text-gray-700 hover:text-blue-500 font-[600] text-[16px]">How It Work</a>
            <a href="#testimonial" className="text-gray-700 hover:text-blue-500 font-[600] text-[16px]">Testimonials</a>
          </div> */}

        {/* // Update Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">Home</a>
            <a href="#feature" onClick={(e) => handleScroll(e, 'feature')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">Feature</a>
            <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">About</a>
            <a href="#howwork" onClick={(e) => handleScroll(e, 'howwork')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">How It Work</a>
            <a href="#testimonial" onClick={(e) => handleScroll(e, 'testimonial')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">Testimonials</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">Home</a>
              <a href="#feature" onClick={(e) => handleScroll(e, 'feature')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">Feature</a>
              <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">About</a>
              <a href="#howwork" onClick={(e) => handleScroll(e, 'howwork')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">How It Work</a>
              <a href="#testimonial" onClick={(e) => handleScroll(e, 'testimonial')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">Testimonials</a>
            </div>
          </div>
        )}

      {/* // Update Mobile Navigation */}
        {/* <div className="flex flex-col space-y-4">
          <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">Home</a>
          <a href="#feature" onClick={(e) => handleScroll(e, 'feature')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">Feature</a>
          <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">About</a>
          <a href="#howwork" onClick={(e) => handleScroll(e, 'howwork')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">How It Work</a>
          <a href="#testimonial" onClick={(e) => handleScroll(e, 'testimonial')} className="text-gray-700 hover:text-yellow-500 font-[600] text-[16px] transition-colors duration-300">Testimonials</a>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
