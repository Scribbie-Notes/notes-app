import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const testimonialsData = [
  {
    text: `"Since I started using this notes application, my productivity has skyrocketed. The intuitive design and seamless syncing across devices make it an essential tool for organizing my thoughts and tasks. The powerful search functionality ensures I can always find what I need, and the ability to collaborate with others has transformed the way I work on projects. It’s truly a game-changer for anyone looking to stay organized and efficient."`,
    name: "Leroy Jenkins",
    position: "CTO of Company Co.",
    img: "https://i.pinimg.com/736x/a8/9f/67/a89f67343169f2a76369d2df3b364875.jpg",
  },
  {
    text: `"With this notes app, staying organized is a breeze. Its user-friendly interface and powerful features make it an essential tool. Perfect for managing tasks and capturing ideas on the go. Highly recommended!"`,
    name: "Kendrick Lamar",
    position: "CEO of Oklama",
    img: "https://i.pinimg.com/736x/a8/9f/67/a89f67343169f2a76369d2df3b364875.jpg",
  },
  {
    text: `"This notes application is a game-changer. It simplifies task management and boosts productivity. Its intuitive design and robust features make organizing notes effortless, ensuring I never miss a detail. Highly recommended!"`,
    name: "Drake",
    position: "CTO of OVO Company",
    img: "https://i.pinimg.com/736x/a8/9f/67/a89f67343169f2a76369d2df3b364875.jpg",
  },
  {
    text: `"I've tried many note-taking apps, but this one stands out for its simplicity and functionality. The ability to categorize and tag notes makes retrieval a breeze, and the collaborative features have been invaluable for team projects. The app’s reliability and ease of use have made it an essential part of my daily routine, helping me stay on top of my tasks and ideas effortlessly."`,
    name: "Martin Garrix",
    position: "CEO of Spotify",
    img: "https://i.pinimg.com/736x/a8/9f/67/a89f67343169f2a76369d2df3b364875.jpg",
  }
];

const Testimonial = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();

  const testimonialDisplayDuration = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, testimonialDisplayDuration);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {location.pathname === '/testimonial' && <Navbar userInfo={user} />}
      <div className="bg-neutral-100 h-[400px] py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Title */}
            <div className="max-w-lg">
              <h2 className="text-4xl font-bold mb-4">What our customers think</h2>
              <p className="text-gray-600 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus commodi sint, similique cupiditate possimus suscipit delectus illum eos iure magnam!
              </p>
              {/* Progress Bar */}
              <div className="relative w-full h-1 bg-gray-200 overflow-hidden">
                <div
                  className="absolute h-full bg-black transition-all duration-[5000ms]"
                  style={{ width: `${(currentIndex + 1) * 25}%` }}
                ></div>
              </div>
            </div>

            {/* Right Side - Testimonials */}
            <div className="relative">
              {testimonialsData.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ease-in-out absolute inset-0 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className="p-6 bg-white shadow-md rounded-lg">
                    <p className="text-lg text-gray-700">{testimonial.text}</p>
                    <div className="flex items-center mt-4">
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className="w-12 h-12 bg-center bg-cover rounded-full"
                      />
                      <div className="ml-4">
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
