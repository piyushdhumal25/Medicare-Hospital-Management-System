import React from 'react'
// import WhyUs from './Pages/whyUs'

export default function Hero() {
  return (
    <>
    <section className="relative bg-gradient-to-r from-white via-blue-300 to-gray-200 pt-[75px] pb-12 px-6 md:px-20 overflow-x-hidden">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
     <h1 className="text-7xl pt-0 pl-4 md:text-7xl font-bold text-gray-800 leading-tight flex flex-col">
  <span>Your</span>
  <span className=" text-blue-600 hover:text-blue-800 transition-colors duration-200">Health</span>
  <span>Our</span>
  <span className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Commitment.</span>
</h1>


          <p className="text-gray-600 mt-4 text-lg">
            Trusted healthcare service at your fingertips. Find experienced doctors and get instant booking confirmation.
          </p>
          {/* <div className="mt-6 px-[200px] py-2">
            <a href="#appointments" className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition">   
              Apply Now
            </a>
          </div> */}
        </div>

        {/* Right Image */}
        <div className="flex justify-center  ">
          <img 
          src="public/doctor1.png" alt="hii"
          className='className="w-full h-full max-w-3xl' />
        </div>

      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
    <svg viewBox="0 0 1200 120" className="w-full h-24" preserveAspectRatio="none">
      <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" fill="#ffffff" />
    </svg>
  </div>
    </section>

    {/* <WhyUs/> */}
    </>
  );
}