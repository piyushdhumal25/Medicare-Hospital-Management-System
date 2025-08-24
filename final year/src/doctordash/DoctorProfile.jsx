import React, { useContext, useState } from "react";
import { DoctorContext } from "../data/DoctorContext";
import axios from "axios";
import { FaUserMd, FaEnvelope, FaPhoneAlt, FaGraduationCap, FaStar, FaCalendarAlt, FaHospital, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const DoctorProfile = () => {
  const { loggedInDoctorEmail, doctors } = useContext(DoctorContext);

  const doctorData = doctors.find(d => d.email === loggedInDoctorEmail);

  const [doctor, setDoctor] = useState(doctorData);
  const [isEditing, setIsEditing] = useState(false);

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">
          Doctor details not found. Please log in.
        </p>
      </div>
    );
  }

  const handleChange = (field, value) => {
    setDoctor(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`https://medicare-hospital-management-system-3.onrender.com/api/doctor/update-profile/${doctor._id}`, doctor, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message || "Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update profile.");
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-6 px-8 text-center relative">
          <FaUserMd className="text-white text-5xl mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-white">{doctor.name}</h2>
          <p className="text-blue-100">{doctor.specialty || doctor.speciality}</p>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 bg-white text-blue-600 p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            {isEditing ? <FaTimes /> : <FaEdit />}
          </button>
        </div>

        {/* Details */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <DetailItem icon={<FaEnvelope />} label="Email" value={doctor.email} disabled />
          <DetailItem icon={<FaPhoneAlt />} label="Phone" value={doctor.phone} editable={isEditing} onChange={(v) => handleChange("phone", v)} />
          <DetailItem icon={<FaGraduationCap />} label="Education" value={doctor.education} editable={isEditing} onChange={(v) => handleChange("education", v)} />
          <DetailItem icon={<FaStar />} label="Rating" value={doctor.rating} editable={isEditing} onChange={(v) => handleChange("rating", v)} />
          <DetailItem label="Experience" value={doctor.experience} editable={isEditing} onChange={(v) => handleChange("experience", v)} />
          <DetailItem label="Fee" value={doctor.fee} editable={isEditing} onChange={(v) => handleChange("fee", v)} />
          <DetailItem label="Category" value={doctor.category} editable={isEditing} onChange={(v) => handleChange("category", v)} />
          <DetailItem icon={<FaHospital />} label="Available At" value={Array.isArray(doctor.available) ? doctor.available.join(", ") : doctor.available} editable={isEditing} onChange={(v) => handleChange("available", v.split(","))} />
          <DetailItem icon={<FaCalendarAlt />} label="Availability" value={doctor.availability} editable={isEditing} onChange={(v) => handleChange("availability", v)} />
          <DetailItem label="Certificate" value={doctor.certificate} editable={isEditing} onChange={(v) => handleChange("certificate", v)} />
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="p-6 text-center">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition inline-flex items-center gap-2"
            >
              <FaSave /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Detail Item Component
const DetailItem = ({ icon, label, value, editable, onChange, disabled }) => (
  <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="flex items-center space-x-3">
      {icon && <span className="text-blue-600 text-lg">{icon}</span>}
      <div className="w-full">
        <p className="text-sm text-gray-500">{label}</p>
        {editable && !disabled ? (
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <p className="font-semibold break-words">{value || "N/A"}</p>
        )}
      </div>
    </div>
  </div>
);

export default DoctorProfile;
