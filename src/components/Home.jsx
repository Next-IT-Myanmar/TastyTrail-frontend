// import React, { useState, useEffect } from "react";
import headerApp from "../assets/images/mock_home01.png";
import appStore from "../assets/images/app_store_black01.png";
import playStore from "../assets/images/play_store_black01.png";
// import backgroundImage from "../assets/images/background_image.png";
import backgroundImage from "../assets/images/home_bg02.jpg";
import { FaUsers, FaDownload, FaStar, FaSmile } from 'react-icons/fa';
import '../index.css'

const Home = () => {

  return (
    <section 
          id="home" 
          className="py-20 md:py-20 bg-cover bg-center bg-no-repeat min-h-screen"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            // backgroundBlendMode: 'overlay',
            // backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
    >
          {/* Dark overlay for mobile */}
          {/* <div className="absolute inset-0 bg-black/20 md:bg-transparent"></div> */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center relative">
              {/* Left Column */}
              {/* <div className="space-y-6 md:space-y-8 text-center md:text-left relative p-10 rounded-[10px]" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}> */}
              <div className="space-y-6 pt-20 lg:space-y-8 text-center lg:text-left relative">
              {/* <div className="space-y-6 md:space-y-8 text-center md:text-left relative p-8 rounded-3xl bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-sm shadow-lg border border-white/20"> */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
                  Discover<br />Myanmar Flavors Worldwide
                </h1>
                <p className="text-base sm:text-lg text-black font-semibold text-2xl max-w-xl mx-auto md:mx-0 p-4 md:p-0 rounded-lg md:rounded-none backdrop-blur-sm md:backdrop-blur-none bg-white/30 md:bg-transparent">
                  Explore authentic Myanmar Foods <br /> no matter where you are.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-7 mt-[70px]">
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
              </div>

              {/* Right Column - App Image */}
              <div className="flex justify-center mt-8 pt-20 lg:mt-0 relative">
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
                  className="max-w-[100%] h-[200px] xs:h-[300px] sm:h-[400px] lg:h-[500px] drop-shadow-2xl hover:scale-105 transition-all duration-500 relative z-10"
                />
              </div>
            </div>
          </div>
        </section>
  );
};

export default Home;