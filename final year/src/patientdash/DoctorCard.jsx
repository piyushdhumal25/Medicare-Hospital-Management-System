import React from "react";

const DoctorCard = ({ doctor, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`p-6 bg-white rounded-lg shadow-md transition-all duration-300 cursor-pointer 
        ${isSelected ? "border-2 border-cyan-500 shadow-lg" : "border border-gray-200 hover:shadow-lg"}`}
    >
      <h2 className="text-xl font-bold text-cyan-600">{doctor.name}</h2>
      <p className="text-sm text-gray-600 mt-1">
        {doctor.specialty} • {doctor.experience} 
      </p>
      <p className="text-sm text-gray-600 mt-2">
        <b>Available:</b>{" "}
        {Array.isArray(doctor.available) ? doctor.available.join(", ") : doctor.available}
      </p>
      {/* Price tag removed */}
    </div>
  );
};

export default DoctorCard;
