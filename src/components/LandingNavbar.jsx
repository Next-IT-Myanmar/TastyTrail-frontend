import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/origin_logo.png";
import '../index.css'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
    if(!isHomePage){
      window.location.href = `/#${targetId}`;
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-white ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4 py-2">
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to={'/'} className="flex items-center">
            <img src={logo} alt="Logo" className="w-14 pr-2"/>
            <span className="text-xl font-semibold text-red-700 ">MM Tasty Trail</span>
          </Link>

        {/* // Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8">
            <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="text-gray-700 hover:text-[#f99109] font-[600] text-[16px] transition-colors duration-300">Home</a>
            <a href="#feature" onClick={(e) => handleScroll(e, 'feature')} className="text-gray-700 hover:text-[#f99109] font-[600] text-[16px] transition-colors duration-300">Feature</a>
            <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-gray-700 hover:text-[#f99109] font-[600] text-[16px] transition-colors duration-300">About</a>
            <a href="#howwork" onClick={(e) => handleScroll(e, 'howwork')} className="text-gray-700 hover:text-[#f99109] font-[600] text-[16px] transition-colors duration-300">How It Work</a>
            <a href="#testimonial" onClick={(e) => handleScroll(e, 'testimonial')} className="text-gray-700 hover:text-[#f99109] font-[600] text-[16px] transition-colors duration-300">Testimonials</a>
            <a href="#download" onClick={(e) => handleScroll(e, 'download')} className="text-gray-700 hover:text-[#f99109] font-[600] text-[16px] transition-colors duration-300">Download</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden">
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
          <div className="xl:hidden mt-4 bg-white absolute top-11 left-0 right-0 p-6 shadow-lg">
            <div className="flex flex-col space-y-4">
              <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="hover:text-gray-700 text-[#f99109] font-[600] text-[16px] transition-colors duration-300">Home</a>
              <a href="#feature" onClick={(e) => handleScroll(e, 'feature')} className="hover:text-gray-700 text-[#f99109] font-[600] text-[16px] transition-colors duration-300">Feature</a>
              <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="hover:text-gray-700 text-[#f99109] font-[600] text-[16px] transition-colors duration-300">About</a>
              <a href="#howwork" onClick={(e) => handleScroll(e, 'howwork')} className="hover:text-gray-700 text-[#f99109] font-[600] text-[16px] transition-colors duration-300">How It Work</a>
              <a href="#testimonial" onClick={(e) => handleScroll(e, 'testimonial')} className="hover:text-gray-700 text-[#f99109] font-[600] text-[16px] transition-colors duration-300">Testimonials</a>
              <a href="#download" onClick={(e) => handleScroll(e, 'download')} className="hover:text-gray-700 text-[#f99109] font-[600] text-[16px] transition-colors duration-300">Download</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
