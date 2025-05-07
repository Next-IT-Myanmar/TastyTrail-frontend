import React from 'react';
import wavesBg from '../assets/images/wave_bg.png';
import playStore from '../assets/images/play_store_qr.png';
import appStore from '../assets/images/play_store_qr.png';
import { FaQrcode, FaApple, FaGooglePlay } from 'react-icons/fa';
import '../index.css'

const DownloadSection = () => {
  return (
    <section 
      id="download"
      className="py-20 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${wavesBg})` }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Left Content */}
          <div className="flex-1 text-left">
            <h2 className="text-4xl font-bold text-white mb-6">
              Discover Local Flavors
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
              Get Our Apps
            </h3>
            <p className="text-lg text-white/80 max-w-xl leading-relaxed">
              Find the best Myanmar restaurants, read reviews, and explore local cuisine right from your phone. <span className="text-black">Scan these QR codes to download MM Tasty Trail app directly to your device.</span>
            </p>
          </div>

          {/* Right Content - QR Codes */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center mb-4">
                  <FaApple className="text-3xl text-black mr-2" />
                  <h3 className="text-xl font-semibold">App Store</h3>
                </div>
                <div className="p-2 rounded-xl mb-4 hover:scale-105 transition-transform">
                  <img 
                    src={appStore} 
                    alt="Download on App Store" 
                    className="h-40 w-40 object-contain"
                  />
                </div>
                <p>Scan to download for iOS</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center mb-4">
                  <FaGooglePlay className="text-3xl text-black mr-2" />
                  <h3 className="text-xl font-semibold">Play Store</h3>
                </div>
                <div className="p-2 rounded-xl mb-4 hover:scale-105 transition-transform">
                  <img 
                    src={playStore} 
                    alt="Get it on Play Store" 
                    className="h-40 w-40 object-contain"
                  />
                </div>
                <p>Scan to download for Android</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;