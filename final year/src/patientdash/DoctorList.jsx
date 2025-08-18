import React from "react";
import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors, onSelectDoctor, selectedDoctor, query }) => {
  // ✅ Filtering logic (doctor name + specialization)
  const filteredDoctors = doctors?.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(query?.toLowerCase()) ||
      doctor.specialization?.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div className="space-y-4 overflow-y-auto h-[70vh]">
      {filteredDoctors?.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            isSelected={selectedDoctor && doctor.id === selectedDoctor.id}
            onClick={() => onSelectDoctor(doctor)}
          />
        ))
      ) : (
        <p className="text-gray-500">No doctors found</p>
      )}
    </div>
  );
};

export default DoctorList;