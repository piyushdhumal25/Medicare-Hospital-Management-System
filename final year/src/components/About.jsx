import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen pt-[30px] pb-32 bg-gray-100">
      {/* Header Section */}
      <div className="bg-gray-200 h-[300px] flex items-center justify-center">
        <h1 className="text-5xl text-gray-700 font-semibold">About Us</h1>
      </div>

      {/* Content Section */}
      <div className="bg-white p-10 mx-auto mt-[-60px] max-w-5xl rounded-2xl shadow-xl">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Welcome to MediCare</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At <strong>MediCare</strong>, we are dedicated to transforming how healthcare professionals engage with technology. Our mission is to simplify clinic operations through smart, customizable, and user-friendly digital solutions designed specifically for doctors and medical staff. <br /><br />
          
          MediCare began with a simple idea — empower doctors with tools that are efficient, reliable, and tailored to their real-world needs. Over time, we have evolved into a complete clinic management platform that provides everything from appointment scheduling and patient records to branded prescription systems and queue management tools. <br /><br />
          
          Unlike generic platforms, MediCare offers full white-label capabilities — allowing clinics to operate under their own identity, logo, and brand. We prioritize transparency, control, and customization, ensuring that each clinic gets a solution that feels uniquely theirs. <br /><br />
          
          Our philosophy is built on trust, ethical development, and meaningful innovation. We reject unnecessary complexity, hidden costs, and features that serve no purpose. Instead, MediCare delivers only what matters — clean design, seamless functionality, and dependable support. <br /><br />
          
          Whether you're a small private clinic or a large healthcare center, our goal remains the same: to support your growth with technology that adapts to your needs, not the other way around. <br /><br />
          
          <strong>MediCare</strong> — built for doctors, powered by vision, and driven by purpose.
        </p>
      </div>
    </div>
  );
};

export default About;
