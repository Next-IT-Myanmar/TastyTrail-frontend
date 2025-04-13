import React from "react";
import featuresApp from "../assets/images/features_app.png";
import screenshot from "../assets/images/sereenshot.jpg";
import bgImage from "../assets/images/2148535462.jpg";
import { FaCoffee, FaHamburger, FaUtensils, FaShoppingBag, FaUserPlus, FaGlobe, FaRoute } from 'react-icons/fa';
import '../index.css'

const Feature = () => {
  return (
    <>
      <section id="feature" className="py-20 relative bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="absolute inset-0 bg-white/82"></div>
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Amazing App Features</h2>
            <p className="text-gray-800 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sediam nonumy eirmod tempor invidunt ut labore et dolore.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center relative z-10">
            {/* Left Column */}
            <div className="space-y-12 md:space-y-16">
              <div className="flex flex-col items-center md:items-end text-center md:text-right">
                <div className="p-4 mb-4 bg-[#faebd7] rounded-[20px] transform transition-all hover:scale-110">
                  <FaCoffee className="text-xl" style={{ color: 'oklch(0.67 0.22 37.1)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">Cafes</h3>
                <p className="text-gray-800 max-w-sm">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sediam nonumy eirmod tempor invidunt ut labore.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end text-center md:text-right">
                <div className="bg-[#faebd7] p-4 rounded-[20px] mb-4 transform transition-all hover:scale-110">
                  <FaHamburger className="text-xl" style={{ color: 'oklch(0.67 0.22 37.1)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">Fast Foods</h3>
                <p className="text-gray-800 max-w-sm">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sediam nonumy eirmod tempor invidunt ut labore.
                </p>
              </div>
            </div>

            {/* Center Column - App Image */}
            <div className="flex justify-center items-center h-full">
              <div className="relative w-full h-[600px] flex items-center justify-center">
                <img 
                  src={featuresApp} 
                  alt="Features App" 
                  className="absolute h-full w-auto object-contain transform transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-12 md:space-y-16">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="bg-[#faebd7] p-4 rounded-[20px] mb-4 transform transition-all hover:scale-110">
                  <FaUtensils className="text-xl" style={{ color: 'oklch(0.67 0.22 37.1)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">Restaurants</h3>
                <p className="text-gray-800 max-w-sm">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sediam nonumy eirmod tempor invidunt ut labore.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="bg-[#faebd7] p-4 rounded-[20px] mb-4 transform transition-all hover:scale-110">
                  <FaShoppingBag className="text-xl" style={{ color: 'oklch(0.67 0.22 37.1)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">Food Delivery</h3>
                <p className="text-gray-800 max-w-sm">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sediam nonumy eirmod tempor invidunt ut labore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;