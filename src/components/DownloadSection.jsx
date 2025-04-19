import React from 'react';
import wavesBg from '../assets/images/wave_bg.png';
import playStore from '../assets/images/play_store_white.png';
import appStore from '../assets/images/app_store_white.png';
import '../index.css'

const DownloadSection = () => {
  return (
    <section 
      className="py-20 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${wavesBg})` }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover Local Flavors
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Get Our Apps
          </h3>
          <p className="text-lg text-white/90 mb-8">
            Find the best Myanmar restaurants, read reviews, and explore local cuisine right from your phone. Download our app today!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="transform hover:scale-105 transition-transform">
              <img 
                src={appStore} 
                alt="Download on App Store" 
                className="h-14 w-auto"
              />
            </a>
            <a href="#" className="transform hover:scale-105 transition-transform">
              <img 
                src={playStore} 
                alt="Get it on Play Store" 
                className="h-14 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;