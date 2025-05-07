import React from "react";
import featuresApp from "../assets/images/features_app.png";
import bgImage from "../assets/images/feature_bg.jpg";
import { FaCoffee, FaHamburger, FaUtensils, FaShoppingBag } from 'react-icons/fa';
import '../index.css'

const Feature = () => {
  return (
    <>
      <section 
            id="feature" 
            className="py-20 relative bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(${bgImage})`,
              backgroundColor: 'rgba(255, 255, 255, 0.78)',
              backgroundBlendMode: 'overlay'}}>
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Amazing App Features</h2>
              <p className="text-black/80 max-w-2xl mx-auto">
                Discover the best features of MM Tasty app that help you explore Myanmar's diverse culinary scene, from local restaurants to street food favorites.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
              {/* Left Column */}
              <div className="space-y-12 md:space-y-16">
                <div className="flex flex-col items-center md:items-end text-center md:text-right">
                  <div className="p-4 mb-4 bg-[#faebd7] rounded-[20px] transform transition-all hover:scale-110">
                    <FaCoffee className="text-xl text-[#f99109]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Cafes</h3>
                  <p className="text-gray-600 max-w-sm">
                  Discover trendy cafes and tea houses serving authentic Myanmar tea, traditional snacks, and modern beverages
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end text-center md:text-right">
                  <div className="bg-[#faebd7] p-4 rounded-[20px] mb-4 transform transition-all hover:scale-110">
                    <FaHamburger className="text-xl text-[#f99109]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fast Foods</h3>
                  <p className="text-gray-600 max-w-sm">
                  Find quick and delicious Myanmar street food, local fast food chains, and convenient dining options for busy food lovers.
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
                    <FaUtensils className="text-xl text-[#f99109]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Restaurants</h3>
                  <p className="text-gray-600 max-w-sm">
                  Explore the finest Myanmar restaurants, from traditional cuisine to modern dining. Find authentic local flavors and regional specialties.
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="bg-[#faebd7] p-4 rounded-[20px] mb-4 transform transition-all hover:scale-110">
                    <FaShoppingBag className="text-xl text-[#f99109]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Food Delivery</h3>
                  <p className="text-gray-600 max-w-sm">
                  Get your favorite Myanmar dishes delivered right to your doorstep. Fast, reliable delivery service for both traditional and modern cuisine.
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