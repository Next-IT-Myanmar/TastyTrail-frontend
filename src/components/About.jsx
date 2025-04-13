import React from 'react';
import aboutImage from '../assets/images/about_nobg.png';
import bgImage from '../assets/images/2148908769.jpg';
import { FaCheck } from 'react-icons/fa';
import '../index.css';

const About = () => {
  const features = [
    "Discover local food gems and hidden restaurants",
    "Get personalized food recommendations",
    "Connect with fellow food enthusiasts",
    "Exclusive deals and special offers"
  ];

  return (
    <section id='about' className="py-20 relative bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black/9"></div>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-r to-transparent rounded-3xl"></div>
            <div className="absolute -inset-4 rounded-[40px] blur-2xl"></div>
            <img 
              src={aboutImage} 
              alt="About MM Tasty" 
              className="relative z-10 w-[45%] max-w-lg h-auto rounded-3xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 md:space-y-8 text-center md:text-left relative p-10 bg-[#ba2d00b0] rounded-[19px] backdrop-blur-md">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
              Discover Amazing Food <br />
              Experiences with MM Tasty
            </h2>
            
            <p className="text-white text-lg">
              We're passionate about connecting food lovers with the best culinary experiences. 
              Our platform makes it easy to discover, share, and enjoy amazing food adventures.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <FaCheck className="text-white text-sm" />
                  </div>
                  <p className="text-white">{feature}</p>
                </div>
              ))}
            </div>

            <button className="mt-8 bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-600 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;