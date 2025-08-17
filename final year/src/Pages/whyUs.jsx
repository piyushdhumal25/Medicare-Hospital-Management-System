import React from "react";
import QuoteSection from './QuoteSection';

const WhyUs = () => {
  return (
    <>
    {/* <QuoteSection/> */}
     <section className="py-20 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Why Choose Medicare?</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            We go beyond just bookings — our platform is built to deliver a safe, reliable, and patient-centric experience at every touchpoint.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Reusable Card Design */}
            {[
              {
                title: "User-Centric Interface",
                desc: "Clean, intuitive design built for easy navigation and stress-free appointment management."
              },
              {
                title: "Real-Time Availability",
                desc: "Doctors and patients stay updated with instant scheduling and availability checks."
              },
              {
                title: "End-to-End Security",
                desc: "Your data is protected with robust encryption and strict privacy protocols."
              },
              {
                title: "Insurance & TPA Support",
                desc: "Integrated support for all major insurance providers to ease your claim journey."
              },
              {
                title: "24/7 Medical Support",
                desc: "A dedicated team of doctors and support staff to assist anytime, anywhere."
              },
              {
                title: "Trusted by Thousands",
                desc: "Our platform is used by thousands of patients and doctors every day for seamless healthcare."
              }
            ].map((card, index) => (
              <div key={index} className="bg-gray-100 rounded-2xl p-6 shadow hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{card.title}</h3>
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
          <QuoteSection/>
    </>
  );
};

export default WhyUs;
