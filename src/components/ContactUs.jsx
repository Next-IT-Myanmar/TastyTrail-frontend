import React, { useState } from 'react';
import phoneImage from '../assets/images/phone_mockup_5.png';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 items-center">
          {/* Left Column - Image */}
          <div className="hidden md:flex justify-center items-center h-full w-full">
            <img 
              src={phoneImage} 
              alt="Contact MM Tasty" 
              className="w-[100%] h-[100%] object-cover object-center"
            />
          </div>

            {/* Right Column - Contact Form */}
            <div className="py-10 pr-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
                <p className="text-gray-600 mb-8">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f99109] focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="Your name"
                    required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f99109] focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="your@email.com"
                    required
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message
                    </label>
                    <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f99109] focus:border-transparent outline-none transition-colors duration-300 resize-none"
                    placeholder="Your message..."
                    required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#f99109] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#e88200]"
                >
                    Send Message
                </button>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;