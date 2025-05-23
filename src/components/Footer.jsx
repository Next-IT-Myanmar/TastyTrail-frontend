import React, {useState} from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa';
import { subscribeNewLetter } from '../services/letterService';
import logo from '../assets/images/origin_logo.png';
import '../index.css'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubscribe = async (e ) => {
    e.preventDefault();
    try {
      setStatus({ type: 'loading', message: 'Subscribing...' });
      await subscribeNewLetter(email);
      setStatus({ type: 'success', message: 'Successfully subscribed!' });
      setEmail('');
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to subscribe. Please try again.' });
    }
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-[#2d2517] text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className='flex items-center'><img src={logo} alt="MM Tasty" className="h-12 pr-3" /><span>MM Tasty Trail</span></div>
            <p className="text-gray-400">
              Discover amazing food experiences and connect with fellow food lovers around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#ef9910] transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#ef9910] transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#ef9910] transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#ef9910] transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#ef9910]">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ef9910]">Our Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ef9910]">How It Works</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-[#ef9910]">Support</a></li> */}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {/* <li><a href="#" className="text-gray-400 hover:text-[#ef9910]">Help Center</a></li> */}
              <li><a href="#" className="text-gray-400 hover:text-[#ef9910]">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#ef9910]">Terms & Conditions</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-[#ef9910]">Contact Us</a></li> */}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and offers.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#ef9910]"
              />
              <button 
                type="submit"
                disabled={status.type === 'loading'}
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  status.type === 'loading'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-[#ef9910] hover:bg-[#df8900] text-white'
                }`}
              >
                {status.type === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
              {status.message && (
                <p className={`text-sm ${
                  status.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} MM Tasty Trail. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center mt-2 md:mt-0">
              powered by <FaHeart className="text-[#ef9910] mx-1" /> Next IT Myanmar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;