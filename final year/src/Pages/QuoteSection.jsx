import React from 'react';
import { Quote } from 'lucide-react'; // Optional icon if you want to use lucide icons

export default function QuoteSection() {
  return (
    <section className="bg-blue-100 py-12 px-4 md:px-20 flex justify-center items-center min-h-[300px]">
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-8 md:p-16 text-center shadow-xl relative max-w-4xl w-full">
        {/* Top Quote */}
        <div className="absolute top-4 left-4 text-blue-600 text-6xl font-bold">
          “
        </div>

        {/* Content */}
        {/* <p className="text-xl md:text-2xl font-semibold text-blue-900 leading-relaxed">
        Our mission is to simplify healthcare access through intelligent technology—
        <br /><br />
        <span className="text-blue-900">
            connecting patients to trusted doctors anytime, anywhere, with just a click.
        </span>
        </p> */}
        <p className="text-xl md:text-2xl font-semibold text-blue-900 leading-relaxed">
         Medicare is on a mission to make quality healthcare affordable and accessible for over a billion+ Indians. We believe in empowering our users with the most accurate, comprehensive, and curated information and care, enabling them to make better healthcare decisions and book appointments.
        </p>

        {/* Bottom Quote */}
        <div className="absolute bottom-4 right-4 text-blue-600 text-6xl font-bold">
          ”
        </div>
      </div>
    </section>
  );
}
