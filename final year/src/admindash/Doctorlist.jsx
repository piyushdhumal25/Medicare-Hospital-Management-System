import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import SearchBar from '../patientdash/SearchBar';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Failed to load doctors", err);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    doc.name?.toLowerCase().includes(query.toLowerCase()) ||
    doc.specialty?.toLowerCase().includes(query.toLowerCase())
  );

  const doctor = filteredDoctors[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredDoctors.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6"></h1>
        <SearchBar query={query} setQuery={setQuery} />

        {filteredDoctors.length === 0 ? (
          <p className="text-center text-red-500 font-medium mt-10">
            No matching doctors found.
          </p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center ">
            Doctors {currentIndex + 1} of {filteredDoctors.length}
            </h2>

            <div className="w-full max-w-3xl mx-auto border rounded-2xl shadow-lg p-8 bg-white hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">{doctor.name}</h3>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Specialty:</span> {doctor.specialty}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Experience:</span> {doctor.experience} years</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Fee:</span> ₹{doctor.fee}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Rating:</span> ⭐ {doctor.rating}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Category:</span> {doctor.category}</p>

              <div className="mt-3">
                <p className="font-semibold text-gray-800">Available At:</p>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {doctor.available?.map((place, index) => (
                    <li key={index}>{place}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-3 text-gray-700"><span className="font-semibold">Availability:</span> {doctor.availability}</p>
              <p className="text-gray-700"><span className="font-semibold">Education:</span> {doctor.education}</p>
              <p className="text-gray-700"><span className="font-semibold">Certificate:</span> {doctor.certificate}</p>

              <div className="mt-4">
                {/* <p className="font-semibold text-gray-800">Top Reviews:</p>
                <ul className="text-gray-700 space-y-1 text-sm">
                  {doctor.reviews?.slice(0, 2).map((review, idx) => (
                    <li key={idx} className="border-l-4 border-blue-400 pl-2 italic">
                      <strong>{review.name}</strong>: ⭐{review.rating} — {review.comment}
                    </li>
                  ))}
                </ul> */}
              </div>

              {!doctor.isVerified && (
                <button
                  onClick={async () => {
                    try {
                      await axios.patch(`http://localhost:5000/api/admin/verify-doctor/${doctor.id}`);
                      alert("Doctor verified!");
                      const res = await axios.get("http://localhost:5000/api/doctors");
                      setDoctors(res.data);
                    } catch (err) {
                      console.error("Failed to verify doctor", err);
                      alert("Error verifying doctor");
                    }
                  }}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  ✅ Verify Doctor
                </button>
              )}
            </div>

            <div className="flex gap-4 mt-8 justify-center">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-gray-300 hover:bg-gray-400 text-black font-medium px-4 py-2 rounded disabled:opacity-50"
              >
                ⬅️ Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredDoctors.length - 1}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded disabled:opacity-50"
              >
                Next ➡️
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
