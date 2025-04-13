import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import '../index.css'
import Login from "../pages/login";

const LoginHeader = () => {
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
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="group flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-yellow-500 transition-all duration-300"
            >
              <svg 
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Landing Page</span>
            </Link>
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
            <Link 
              to="/" 
              className="group flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-yellow-500 transition-all duration-300"
            >
              <svg 
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Landing Page</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default LoginHeader;
