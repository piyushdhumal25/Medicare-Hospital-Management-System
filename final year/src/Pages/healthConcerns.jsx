import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Health concern cards data
const healthConcerns = [
  {
    title: "Skin problems or rashes?",
    subtitle: "Get expert help for acne, pimples & more",
    image: "/rashes.png",
  },
  {
    title: "Facing intimacy concerns?",
    subtitle: "Talk to a specialist about performance issues",
    image: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
  },
  {
    title: "Common cold, cough, or fever?",
    subtitle: "Consult a general physician online now",
    image: "https://cdn-icons-png.flaticon.com/512/169/169367.png",
  },
  {
    title: "Is your child unwell?",
    subtitle: "Get quick pediatric advice from top doctors",
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
  },
  {
    title: "Feeling low or anxious?",
    subtitle: "Mental health experts are here to help you",
    image: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
  },
];

// Custom Arrow Buttons
const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-indigo-100 z-10"
  >
    <ChevronLeft size={22} className="text-indigo-700" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-indigo-100 z-10"
  >
    <ChevronRight size={22} className="text-indigo-700" />
  </button>
);

// Main Component
export default function HealthConcernCards() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-10">
        Health Concerns We Can Help With
      </h2>

      <div className="relative">
        <Slider {...settings}>
          {healthConcerns.map((item, index) => (
            <div key={index} className="px-4">
              <div className="bg-white p-6 rounded-2xl shadow-md text-center h-full hover:shadow-xl transition duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 mx-auto mb-5 object-contain"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{item.subtitle}</p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium">
                  CONSULT NOW
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
