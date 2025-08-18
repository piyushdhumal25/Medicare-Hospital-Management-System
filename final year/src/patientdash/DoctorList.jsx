import React from "react";
import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors, onSelectDoctor, selectedDoctor }) => {
  return (

    <div className="space-y-4 overflow-y-auto h-[70vh]">
      {doctors?.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          isSelected={selectedDoctor && doctor.id === selectedDoctor.id}
          onClick={() => onSelectDoctor(doctor)}
          
        />
      ))}
    </div>
  );
};

export default DoctorList;