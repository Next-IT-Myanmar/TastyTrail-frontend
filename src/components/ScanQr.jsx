import React from 'react';
import { FaQrcode, FaApple, FaGooglePlay } from 'react-icons/fa';
import appStoreQR from '../assets/images/app_store_qr.svg';
import playStoreQR from '../assets/images/play_store_qr.png';
import qrBg from '../assets/images/qr_background.jpg';

const ScanQr = () => {
  return (
    <section 
      className="py-20 bg-cover bg-center bg-no-repeat relative"
      style={{ 
        backgroundImage: `url(${qrBg})`,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <FaQrcode className="text-5xl text-black mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-black mb-4">Download Our App</h2>
          <p className="text-black max-w-2xl mx-auto">
            Scan these QR codes to download MM Tasty Trail app directly to your device
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* App Store QR */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="flex items-center justify-center mb-4">
              <FaApple className="text-3xl text-gray-800 mr-2" />
              <h3 className="text-xl font-semibold">App Store</h3>
            </div>
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              <img 
                src={appStoreQR} 
                alt="App Store QR Code" 
                className="w-48 h-48 object-contain"
              />
            </div>
            <p className="text-gray-600">Scan to download for iOS</p>
          </div>

          {/* Play Store QR */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="flex items-center justify-center mb-4">
              <FaGooglePlay className="text-3xl text-gray-800 mr-2" />
              <h3 className="text-xl font-semibold">Play Store</h3>
            </div>
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              <img 
                src={playStoreQR} 
                alt="Play Store QR Code" 
                className="w-48 h-48 object-contain"
              />
            </div>
            <p className="text-gray-600">Scan to download for Android</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScanQr;