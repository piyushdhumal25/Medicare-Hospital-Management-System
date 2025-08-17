import React, { useEffect, useState } from "react";

const DonorsList = () => {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/donors");
        if (!response.ok) throw new Error("Failed to fetch donors");
        const data = await response.json();
        setDonors(data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };
    fetchDonors();
  }, []);

  // Extract unique cities for filter dropdown
  const uniqueCities = [...new Set(donors.map((donor) => donor.city))];

  // Apply search + filter
  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.firstName.toLowerCase().includes(search.toLowerCase()) ||
      donor.lastName.toLowerCase().includes(search.toLowerCase()) ||
      donor.email.toLowerCase().includes(search.toLowerCase());
    const matchesCity = cityFilter ? donor.city === cityFilter : true;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">
          🩸 Blood Donors
        </h2>
        <span className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg shadow-sm">
          Total Donors: {filteredDonors.length}
        </span>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search Box */}
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
        />

        {/* City Filter */}
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="w-full sm:w-1/3 p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
        >
          <option value="">🌍 All Cities</option>
          {uniqueCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

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
            </tr>
          </thead>
          <tbody>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-red-50 transition duration-200"
                >
                  <td className="p-3 font-medium text-gray-600">
                    {index + 1}
                  </td>
                  <td className="p-3 font-semibold text-gray-800">
                    {donor.firstName} {donor.lastName}
                  </td>
                  <td className="p-3">{donor.gender}</td>
                  <td className="p-3 text-blue-600">{donor.phone}</td>
                  <td className="p-3">{donor.email}</td>
                  <td className="p-3">{donor.city}</td>
                  <td className="p-3">
                    {donor.lastDonation ? donor.lastDonation : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500 font-medium"
                >
                  🚫 No donors found
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