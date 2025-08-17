import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, UserCircle2 } from 'lucide-react';

const testimonials = [
  {
    name: "Avinash Kumar",
    feedback:
      "Very good app. Well thought out about booking an appointment. Also, Doctor's feedback mechanism is good and describes all the basics in a good way.",
  },
  {
    name: "Sneha Joshi",
    feedback:
      "Consulting doctors online saved me so much travel and time. It’s truly convenient, especially during emergencies.",
  },
  {
    name: "Raj Mehra",
    feedback:
      "The interface is clean and user-friendly. Booking and reminders are spot-on. Would recommend to friends.",
  },
];

export default function UserTestimonials() {
  const [index, setIndex] = useState(0);

  // Auto-slide logic using useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-white py-20 px-4 text-center relative">
      <h2 className="text-4xl font-bold text-gray-800 mb-10">
        What our users have to say?
      </h2>

      {/* Arrow buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronRight size={32} />
      </button>

      {/* Testimonial */}
      <div className="max-w-3xl mx-auto">
        <p className="text-xl text-gray-700 leading-relaxed italic mb-6 transition-all duration-500">
          “{testimonials[index].feedback}”
        </p>

        <div className="flex justify-center items-center gap-2 text-gray-600 font-medium">
          <UserCircle2 className="w-6 h-6" />
          <span>{testimonials[index].name}</span>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
