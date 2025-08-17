import React, { useContext } from "react";
import { DoctorContext } from "../data/DoctorContext";

const AllDoctors = () => {
  const { doctors } = useContext(DoctorContext);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Available Doctors</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(doctors || []).map((doc, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{doc.name}</h3>
            <p>{doc.specialty} • {doc.experience} years</p>
            <p>Available: {doc.availability}</p>
            <p>Fees: ₹{doc.feesMin} - ₹{doc.feesMax}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDoctors;