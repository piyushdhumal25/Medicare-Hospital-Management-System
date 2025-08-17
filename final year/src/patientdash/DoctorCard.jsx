import React from "react";

const DoctorCard = ({ doctor, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg shadow-md cursor-pointer ${
        isSelected ? "border-2 border-cyan-500" : ""
      }`}
    >
      <h2 className="font-bold text-lg">{doctor.name}</h2>
      <p>{doctor.specialty} • {doctor.experience} years</p>
      <p className="text-sm text-gray-500">Available: {doctor.available.join(", ")}</p>
      <p className="text-cyan-600 font-semibold">{doctor.fee}</p>
    </div>
  );
};

export default DoctorCard;