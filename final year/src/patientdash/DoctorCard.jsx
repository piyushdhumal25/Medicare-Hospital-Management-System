import React from "react";

const DoctorCard = ({ doctor, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg shadow-md cursor-pointer ${
        isSelected ? "border-2 border-cyan-500" : ""
      }`}
    >
      {/* Doctor Name */}
      <h2 className="font-bold text-lg">{doctor.name}</h2>

      {/* Specialty & Experience */}
      <p>{doctor.specialty} • {doctor.experience} years</p>

      
      {/* Rating */}
      <p><b>Rating:</b> ⭐ {doctor.rating}</p>

      {/* Category */}
      <p><b>Category:</b> {doctor.category}</p>

      {/* Availability */}
      <p><b>Availability:</b> {doctor.availability}</p>

      {/* Education */}
      <p><b>Education:</b> {doctor.education}</p>

      {/* Certificate */}
      <p><b>Certificate:</b> {doctor.certificate}</p>

      {/* Available At */}
      <div>
        <b>Available At:</b>
        {doctor.available && doctor.available.length > 0 ? (
          <ul className="list-disc list-inside text-sm">
            {doctor.available.map((place, index) => (
              <li key={index}>{place}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Not Available</p>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;