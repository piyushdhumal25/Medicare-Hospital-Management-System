import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const DonorsList = () => {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://medicare-hospital-management-system-3.onrender.com/api/donors");
      setDonors(res.data);
    } catch (error) {
      console.error("Failed to fetch donors", error);
      setError("Could not load donors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const deleteDonor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donor?")) return;

    try {https://medicare-hospital-management-system-3.onrender.com
      await axios.delete(`/api/donors/delete/${id}`);
      alert("Donor deleted successfully");
      fetchDonors();
    } catch (error) {
      console.error("Error deleting donor:", error);
      alert("Failed to delete donor");
    }
  };

  // Apply search filter
  const filteredDonors = donors.filter((donor) => {
    const searchTerm = search.toLowerCase();
    return donor.firstName.toLowerCase().includes(searchTerm) ||
           donor.lastName.toLowerCase().includes(searchTerm) ||
           donor.email.toLowerCase().includes(searchTerm);
  });



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">
          🩸 Blood Donors
        </h2>
        <div className="flex gap-4 items-center">
          <span className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg shadow-sm">
            Total Donors: {filteredDonors.length}
          </span>
          {loading && (
            <span className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg shadow-sm flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
        />
      </div>

      {/* Donors Table */}
      {/* Donors Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-red-500 to-red-600 text-white text-left">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">City</th>
              <th className="p-3">Last Donation</th>
              <th className="p-3">Registered Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredDonors.length > 0 ? (
              filteredDonors.map((donor, index) => (
                <tr
                  key={donor.id || index}
                  className="border-b hover:bg-red-50 transition duration-200"
                >
                  <td className="p-3 font-medium text-gray-600">
                    {index + 1}
                  </td>
                  <td className="p-3 font-semibold text-gray-800">
                    {donor.firstName} {donor.lastName}
                  </td>
                  <td className="p-3 capitalize">
                    {donor.gender?.toLowerCase()}
                  </td>
                  <td className="p-3 text-blue-600">
                    <a href={`tel:${donor.phone}`} className="hover:underline">
                      {donor.phone}
                    </a>
                  </td>
                  <td className="p-3">
                    <a href={`mailto:${donor.email}`} className="hover:underline text-blue-600">
                      {donor.email}
                    </a>
                  </td>
                  <td className="p-3">{donor.city}</td>
                  <td className="p-3">
                    {donor.lastDonation 
                      ? new Date(donor.lastDonation).toLocaleDateString() 
                      : "N/A"}
                  </td>
                  <td className="p-3 text-gray-500">
                    {new Date(donor.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteDonor(donor._id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                    >
                      <FaTrashAlt className="text-xs" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center p-8 text-gray-500 font-medium"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading donors...
                    </div>
                  ) : error ? (
                    <>❌ {error}</>
                  ) : (
                    <>🚫 No donors found</>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorsList;