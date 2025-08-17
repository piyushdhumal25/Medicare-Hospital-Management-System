import React, { useEffect, useState } from "react";

const images = [
  "/images/img1.png",
  "/images/img3.jpg",
  "/images/img4.jpg"
];

const Map = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-4 md:px-10">
      {/* Header */}

      <div className="max-w-5xl mx-auto mb-8">
        <div className="grid grid-cols-2 bg-blue-100 rounded-xl overflow-hidden shadow">
          <div className="text-center py-4 px-6 text-blue-900 font-bold text-lg border-r border-blue-300 hover:bg-blue-200 transition">
            Medical Tests
          </div>
          <div className="text-center py-4 px-6 text-blue-900 font-bold text-lg hover:bg-blue-200 transition">
            Our Locations
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      

        {/* Left: Image Slider */}
        <div className="relative rounded-xl overflow-hidden shadow-lg h-[300px] md:h-auto">
          <img
            src={images[current]}
            alt="Medical Slide"
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          />
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current ? "bg-blue-500 scale-110" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Right: Google Map */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Medical Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.8150010134223!2d73.98732077422214!3d18.582377367285314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c37c101a601b%3A0xa93da586ac881245!2sLifeline%20Hospital!5e0!3m2!1sen!2sin!4v1752914483738!5m2!1sen!2sin"
            className="w-full h-full min-h-[300px] border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          </div>
        </div>
      </div>
  );
};

export default Map;
