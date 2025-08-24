import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("https://medicare-hospital-management-system-3.onrender.com/api/doctors");
        setDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name?.toLowerCase().includes(query.toLowerCase()) ||
      doc.specialty?.toLowerCase().includes(query.toLowerCase())
  );

  const doctorPerPage = 1;
  const totalPages = Math.ceil(filteredDoctors.length / doctorPerPage);
  const currentDoctor = filteredDoctors.slice(
    currentPage * doctorPerPage,
    currentPage * doctorPerPage + doctorPerPage
  );

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      
      {/* Sidebar (Left Section) */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center">
          All Available Doctors
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search doctors by name or specialty..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(0);
            }}
            className="w-full max-w-md border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {filteredDoctors.length === 0 ? (
          <p className="text-center text-red-500 font-medium mt-10">
            No matching doctors found.
          </p>
        ) : (
          <div className="flex flex-col items-center">
            {currentDoctor.map((doc, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 w-full max-w-lg"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                    {doc.name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-gray-500">{doc.specialty}</p>
                  </div>
                </div>

                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Experience:</span> {doc.experience} years</p>
                  <p><span className="font-semibold">Fee:</span> ₹{doc.fee}</p>
                  <p><span className="font-semibold">Rating:</span> ⭐ {doc.rating}</p>
                  <p><span className="font-semibold">Category:</span> {doc.category}</p>
                  <p><span className="font-semibold">Availability:</span> {doc.availability || "Not specified"}</p>
                  <p><span className="font-semibold">Education:</span> {doc.education}</p>
                  <p><span className="font-semibold">Certificate:</span> {doc.certificate}</p>

                  {doc.available?.length > 0 && (
                    <div>
                      <span className="font-semibold">Available At:</span>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {doc.available.map((place, i) => (
                          <li key={i}>{place}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigate("/patient/dashboard")}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                >
                  Want to book appointment
                </button>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              >
                ⬅ Prev
              </button>
              <span className="text-gray-700">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              >
                Next ➡
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDoctors;