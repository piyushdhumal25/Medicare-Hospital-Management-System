import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStethoscope,
  FaCertificate,
  FaClock,
  FaChalkboardTeacher,
  FaStar,
  FaTags,
  FaMoneyBill,
} from "react-icons/fa";

const DoctorDetail = ({ doctor }) => {
  const navigate = useNavigate();

  if (!doctor) {
    return <p className="text-center text-gray-500">No doctor selected.</p>;
  }

  const handleBookAppointment = () => {
    navigate("/book-appointment", { state: { doctor } });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
      {/* Doctor Basic Info */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-gray-800">{doctor.name}</h2>
        <p className="text-gray-600">
          {doctor.specialty} · {doctor.experience} yrs
        </p>
      </div>

      {/* Extra Details (from DoctorCard) */}
      <div className="mt-4 space-y-3 text-gray-600">
        

        {/* Rating */}
        {doctor.rating && (
          <div className="flex items-center space-x-2">
            <FaStar className="text-yellow-500" />
            <span>
              <strong>Rating:</strong> ⭐ {doctor.rating}
            </span>
          </div>
        )}

        {/* Category */}
        {doctor.category && (
          <div className="flex items-center space-x-2">
            <FaTags className="text-purple-500" />
            <span>
              <strong>Category:</strong> {doctor.category}
            </span>
          </div>
        )}

        {/* Availability */}
        {doctor.availability && (
          <div className="flex items-center space-x-2">
            <FaClock className="text-blue-500" />
            <span>
              <strong>Availability:</strong> {doctor.availability}
            </span>
          </div>
        )}

        {/* Education */}
        {doctor.education && (
          <div className="flex items-center space-x-2">
            <FaChalkboardTeacher className="text-cyan-500" />
            <span>
              <strong>Education:</strong> {doctor.education}
            </span>
          </div>
        )}

        {/* Certificate */}
        {doctor.certificate && (
          <div className="flex items-center space-x-2">
            <FaCertificate className="text-yellow-500" />
            <span>
              <strong>Certificate:</strong> {doctor.certificate}
            </span>
          </div>
        )}

        {/* Available At */}
        <div>
          <strong>Available At:</strong>
          {doctor.available && doctor.available.length > 0 ? (
            <ul className="list-disc list-inside ml-6 text-sm">
              {doctor.available.map((place, i) => (
                <li key={i}>{place}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Not Available</p>
          )}
        </div>
      </div>

      {/* Book Appointment Button */}
      <button
        onClick={handleBookAppointment}
        className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-colors"
      >
        Book Appointment
      </button>

      {/* Patient Reviews */}
      {doctor.reviews?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Patient Reviews
          </h3>
          <div className="space-y-3">
            {doctor.reviews.map((r, i) => (
              <div
                key={i}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <p className="font-semibold text-gray-800">{r.name}</p>
                <p className="text-yellow-600">⭐ {r.rating}/5</p>
                <p className="text-gray-700 text-sm mt-1">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetail;