import React from "react";
import featuresApp from "../assets/images/features_app.png";
import screenshot from "../assets/images/sereenshot.jpg";
import { FaCoffee, FaHamburger, FaUtensils, FaShoppingBag, FaUserPlus, FaGlobe, FaRoute } from 'react-icons/fa';
import '../index.css'

const Feature = () => {
  return (
    <>
      <section id="feature" className="flex py-20 items-center bg-gray-100">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Amazing App Features</h2>
            <p className="text-black/80 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sediam nonumy eirmod tempor invidunt ut labore et dolore.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-12 md:space-y-16">
              <div className="flex flex-col items-center md:items-end text-center md:text-right">
                <div className="p-4 mb-4 bg-[#faebd7] rounded-[20px] transform transition-all hover:scale-110">
                  <FaCoffee className="text-xl text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cafes</h3>
                <p className="text-gray-600 max-w-sm">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sediam nonumy eirmod tempor invidunt ut labore.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end text-center md:text-right">
                <div className="bg-[#faebd7] p-4 rounded-[20px] mb-4 transform transition-all hover:scale-110">
                  <FaHamburger className="text-xl text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Foods</h3>
                <p className="text-gray-600 max-w-sm">
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
                  <FaUtensils className="text-xl text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Restaurants</h3>
                <p className="text-gray-600 max-w-sm">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sediam nonumy eirmod tempor invidunt ut labore.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="bg-[#faebd7] p-4 rounded-[20px] mb-4 transform transition-all hover:scale-110">
                  <FaShoppingBag className="text-xl text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Food Delivery</h3>
                <p className="text-gray-600 max-w-sm">
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