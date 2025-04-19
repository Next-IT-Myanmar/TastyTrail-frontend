// import React, { useState, useEffect } from "react";
import headerApp from "../assets/images/header_app.png";
import appStore from "../assets/images/app_store_black01.png";
import playStore from "../assets/images/play_store_black01.png";
// import backgroundImage from "../assets/images/background_image.png";
import backgroundImage from "../assets/images/home_bg.jpg";
import { FaUsers, FaDownload, FaStar, FaSmile } from 'react-icons/fa';
import '../index.css'

const Home = () => {
  // const [counters, setCounters] = useState({
  //   downloads: 0,
  //   rating: 0,
  //   reviews: 0
  // });

  // useEffect(() => {
  //   const targets = {
  //     downloads: 25000,
  //     rating: 4.8,
  //     reviews: 1200
  //   };

  //   Object.entries(targets).forEach(([key, target]) => {
  //     const steps = 50;
  //     const increment = key === 'rating' ? target / steps : Math.floor(target / steps);
  //     let current = 0;

  //     const timer = setInterval(() => {
  //       if (current >= target) {
  //         clearInterval(timer);
  //         return;
  //       }

  //       current += increment;
  //       setCounters(prev => ({
  //         ...prev,
  //         [key]: key === 'rating'
  //           ? Number(Math.min(current, target).toFixed(1))
  //           : Math.floor(Math.min(current, target))
  //       }));
  //     }, 40);

  //     return () => clearInterval(timer);
  //   });
  // }, []);

  return (
    <section 
          id="home" 
          className="py-20 md:py-20 bg-cover bg-center bg-no-repeat min-h-screen"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            // backgroundBlendMode: 'overlay',
            // backgroundColor: 'rgba(255, 255, 255, 0.9)'
            backgroundColor: 'rgba(255, 255, 255, 0.78)'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center relative">
              {/* Left Column */}
              {/* <div className="space-y-6 md:space-y-8 text-center md:text-left relative p-10 rounded-[10px]" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}> */}
              <div className="space-y-6 md:space-y-8 text-center md:text-left relative">
              {/* <div className="space-y-6 md:space-y-8 text-center md:text-left relative p-8 rounded-3xl bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-sm shadow-lg border border-white/20"> */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
                  Discover<br />Myanmar's Best Food Experience
                </h1>
                <p className="text-base sm:text-lg text-black font-semibold text-2xl max-w-xl mx-auto md:mx-0">
                  Explore authentic Myanmar restaurants, cafes, and street food. Your ultimate guide to local flavors.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-7 mt-[70px]">
                  {/* <button className="transition-transform hover:scale-105">
                    <img src={appStore} alt="Download on App Store" className="h-28 sm:h-30 md:h-34" />
                  </button>
                  <button className="transition-transform hover:scale-105">
                    <img src={playStore} alt="Get it on Play Store" className="h-28 sm:h-30 md:h-34" />
                  </button> */}
                  <div>
                    <img src={appStore} alt="Download on App Store" className="h-10 sm:h-12 md:h-14" />
                  </div>
                  <div>
                    <img src={playStore} alt="Get it on Play Store" className="h-10 sm:h-12 md:h-14" />
                  </div>
                </div>

                {/* Counter Section with Custom Shape */}
                {/* <div className="relative mt-12 md:mt-20">
                  <div className="absolute inset-0 bg-yellow-400"
                    style={{
                      clipPath: 'rect(50px 70px 80% 20%)'
                    }}
                  ></div>
                  <div className="relative z-10 py-8 px-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {counters.downloads}+
                        </div>
                        <div className="text-white font-medium text-sm">
                          Downloads
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {counters.rating}
                        </div>
                        <div className="text-white font-medium text-sm">
                          Rating
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {counters.reviews}+
                        </div>
                        <div className="text-white font-medium text-sm">
                          Reviews
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <div className="relative mt-12 md:mt-20">
                  <div className="relative z-10 py-8 px-4">
                    <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                      <div className="text-center">
                        <div className="text-xl sm:text-xl mb-4 flex justify-center">
                          <FaDownload className="text-yellow-500 text-xl sm:text-2xl hover:scale-110 transition-transform" /> 
                        </div>
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-500 mb-2">
                          {counters.downloads}+
                        </div>
                        <div className="text-yellow-500 font-medium text-xs sm:text-sm md:text-base">
                          Downloads
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xl sm:text-xl mb-4 flex justify-center">
                          <FaStar className="text-yellow-500 text-xl sm:text-2xl hover:scale-110 transition-transform" /> 
                        </div>
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-500 mb-2">
                          {counters.rating}
                        </div>
                        <div className="text-yellow-500 font-medium text-xs sm:text-sm md:text-base">
                          Rating
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xl sm:text-xl mb-4 flex justify-center">
                          <FaSmile className="text-yellow-500 text-xl sm:text-2xl hover:scale-110 transition-transform" /> 
                        </div>
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-500 mb-2">
                          {counters.reviews}+
                        </div>
                        <div className="text-yellow-500 font-medium text-xs sm:text-sm md:text-base">
                          Reviews
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Right Column - App Image */}
              <div className="flex justify-center mt-8 md:mt-0 relative">
                {/* Confetti effect */}
                {/* <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 bg-gradient-radial from-yellow-200/30 to-transparent"></div>
                  <span className="absolute top-10 left-20 w-4 h-4 bg-[#f99109] rounded-full animate-ping"></span>
                  <span className="absolute bottom-30 left-14 w-3 h-3 bg-[#f99109] rounded-full animate-bounce"></span>
                  <span className="absolute bottom-30 right-20 w-5 h-5 bg-[#f99109] rounded-full animate-pulse"></span>
                  <span className="absolute top-30 right-10 w-4 h-4 bg-[#f99109] rounded-full animate-ping"></span>
                  <span className="absolute top-50 right-20 w-3 h-3 bg-[#f99109] rounded-full animate-bounce"></span>
                  <span className="absolute top-20 left-10 w-5 h-5 bg-[#f99109] rounded-full animate-pulse"></span>
                  <span className="absolute bottom-10 right-14 w-4 h-4 bg-[#f99109] rounded-full animate-ping"></span>
                  <span className="absolute bottom-20 left-20 w-3 h-3 bg-[#f99109] rounded-full animate-bounce"></span>
                </div> */}
                
                <img
                  src={headerApp}
                  alt="App Interface"
                  className="pt-20 max-w-[70%] sm:max-w-[60%] md:max-w-[80%] h-auto drop-shadow-2xl hover:scale-105 transition-all duration-500 relative z-10"
                />
              </div>
            </div>
          </div>
        </section>
  );
};

export default Home;