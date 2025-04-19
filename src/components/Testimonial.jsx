import React from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../index.css';

const Testimonial = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Blogger",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      content: "MM Tasty has completely transformed how I discover new restaurants. The app is intuitive and the recommendations are spot-on!",
      rating: 4
    },  
    {
      name: "Michael Chen",
      role: "Food Enthusiast",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      content: "I've found some of my favorite cafes through this app. The user experience is smooth and the food tour feature is amazing!",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Restaurant Owner",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      content: "As a restaurant owner, I've seen a significant increase in customers since joining MM Tasty. The platform is fantastic!",
      rating: 3
    },
    {
      name: "John Smith",
      role: "Food Critic",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      content: "The food recommendations are always on point. This app has made my food exploration journey much more exciting!",
      rating: 5
    },
    {
      name: "Lisa Wong",
      role: "Food Photographer",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      content: "As someone who's always looking for unique food spots, MM Tasty has been a game-changer. Love the interface!",
      rating: 4
    }
  ];

  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="absolute left-0 z-10 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-3 rounded-full shadow-md hover:bg-yellow-50"
      onClick={onClick}
    >
      <FaChevronLeft className="text-[#f99109]" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      className="absolute right-0 z-10 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-3 rounded-full shadow-md hover:bg-yellow-50"
      onClick={onClick}
    >
      <FaChevronRight className="text-[#f99109]" />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section id='testimonial' className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why food lovers choose MM Tasty for their culinary adventures
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="px-12">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <FaQuoteLeft className="text-[#f99109] text-xl mb-2" />
                    <p className="text-gray-600 italic">
                      {testimonial.content}
                    </p>
                  </div>

                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-[#f99109] mr-1" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;