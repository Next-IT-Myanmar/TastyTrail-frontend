import React from 'react';
import { FaUserPlus, FaGlobe, FaRoute } from 'react-icons/fa';
import FeatureApp from '../assets/images/how01.png';
import FeatureApp2 from '../assets/images/how02.png';
import FeatureApp3 from '../assets/images/how03.png';
import bgImage from '../assets/images/work_bg.jpg';
import '../index.css'

const HowWork = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-2xl text-[#f99109]" />,
      title: "Create an account",
      description: "Sign up for an account with your name, email and phone number.",
      image: FeatureApp
    },
    {
      icon: <FaGlobe className="text-2xl text-[#f99109]" />,
      title: "Choose your Country",
      description: "Using your debit card, bank account, USSD, QR Code, setup your first plan.",
      image: FeatureApp2
    },
    {
      icon: <FaRoute className="text-2xl text-[#f99109]" />,
      title: "Start food adventure",
      description: "Sit back, relax & let your money work for you all day, everyday.",
      image: FeatureApp3
    }
  ];

  return (
    // <section id='howwork' className="py-20 bg-gray-100">
    <section 
          id="howwork" 
          className="py-20 relative bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(${bgImage})`,
            backgroundColor: 'rgba(255, 255, 255, 0.78)',
            backgroundBlendMode: 'overlay'}}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Start Adventuring Food Tour with MM Tasty Trail easily in 3 minutes
            </h2>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-3">
                    {step.icon}
                    <h3 className="text-xl font-semibold text-[#f99109]">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 pl-9">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Screenshots */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="w-full sm:w-1/3 transform hover:scale-105 transition-all duration-300"
              >
                <img 
                  src={step.image} 
                  alt={`Step ${index + 1}`}
                  className="w-full h-auto shadow-xl rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWork;