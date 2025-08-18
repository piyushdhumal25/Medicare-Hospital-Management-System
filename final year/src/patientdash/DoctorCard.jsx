import React from "react";

const DoctorCard = ({ doctor, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`w-full max-w-xl p-5 rounded-xl flex flex-col md:flex-row items-start justify-between 
        transition-all duration-300 cursor-pointer bg-gradient-to-r from-cyan-50 to-white 
        ${isSelected ? "border-2 border-cyan-500 shadow-lg" : "border border-gray-200 hover:shadow-md"}`}
    >
      {/* Left Side - Doctor Info */}
      <div className="flex-1">
        <h2 className="font-bold text-xl text-gray-800">{doctor.name}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {doctor.specialty} • {doctor.experience} yrs
        </p>

        <p className="text-sm text-gray-700 mt-2">
          <b>Available:</b> {doctor.availability}
        </p>
      </div>

      {/* Right Side - Rating & Category */}
      <div className="flex flex-col items-end mt-3 md:mt-0">
        <span className="text-yellow-500 font-semibold text-lg">
          ⭐ {doctor.rating}
        </span>
        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium mt-2">
          {doctor.category}
        </span>
      </div>
    </div>
  );
};

export default DoctorCard;
