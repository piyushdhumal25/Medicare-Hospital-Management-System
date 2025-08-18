import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PrescriptionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use user data from localStorage
  const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
  
  // Get prescription data from state
  const prescription = location.state?.prescription || [];
  const doctorName = location.state?.doctorName || "Dr. John Doe";
  const date = location.state?.date || new Date().toLocaleDateString();
  const time = location.state?.time || "";
  const patientEmail = location.state?.patientEmail || userData.email || "";
  
  console.log("User data from localStorage:", userData);
  console.log("Prescription page state:", location.state);
  console.log("Patient email:", patientEmail);
  
  // Current date for prescription
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl border-2 border-blue-800 relative">
        {/* Header with hospital name and doctor info */}
        <div className="border-b-2 border-blue-800 pb-4 mb-6">
          <div className="flex flex-col items-center mb-4">
            {/* Hospital Logo - Stethoscope heart design */}
            <div className="mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="80" height="80">
                {/* Background circle */}
                <circle cx="50" cy="50" r="40" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
                
                {/* Stethoscope forming heart shape */}
                <path d="M30 40 
                      C30 30, 40 20, 50 30 
                      C60 20, 70 30, 70 40 
                      C70 50, 65 55, 60 60
                      C55 65, 52 68, 50 70
                      C48 68, 45 65, 40 60
                      C35 55, 30 50, 30 40Z" 
                      fill="none" stroke="#2563eb" strokeWidth="4" />
                
                {/* Stethoscope earpiece and tube */}
                <circle cx="25" cy="45" r="5" fill="#2563eb" />
                <path d="M25 45 Q20 55 25 65 Q30 75 40 75 L60 75" 
                      fill="none" stroke="#2563eb" strokeWidth="3" />
                
                {/* Stethoscope chest piece */}
                <circle cx="65" cy="75" r="6" fill="#2563eb" />
                
                {/* Text */}
                <text x="50" y="40" fontSize="10" fontWeight="bold" fill="#2563eb" textAnchor="middle">Dr</text>
              </svg>
            </div>
            
            {/* Centered Hospital Name */}
            <h1 className="text-4xl font-extrabold text-blue-800 tracking-wide text-center mb-1">MediCare Hospital</h1>
            {/* Hospital Address in smaller size */}
            <p className="text-gray-600 text-sm text-center">123 Medical Center Drive, Healthville, NY 10001</p>
            <p className="text-gray-600 text-sm text-center">Phone: (123) 456-7890 | Email: info@medicare-hospital.com</p>
          </div>
          
          <div className="flex justify-between items-start mt-4">
            <div>
              <p className="text-lg font-bold text-blue-700 mb-1">Dr. {doctorName.split(' ')[1]}</p>
              <p className="text-gray-600 italic text-sm">{
                doctorName.toLowerCase().includes("cardiologist") ? "Cardiologist" :
                doctorName.toLowerCase().includes("dermatologist") ? "Dermatologist" :
                doctorName.toLowerCase().includes("pediatrician") ? "Pediatrician" :
                doctorName.toLowerCase().includes("orthopedic") ? "Orthopedic Surgeon" :
                doctorName.toLowerCase().includes("neurologist") ? "Neurologist" :
                "General Physician"
              }</p>
            </div>
            
            <div className="text-right">
              <p className="text-gray-600"><span className="font-bold">Date:</span> {currentDate}</p>
              <p className="text-gray-600"><span className="font-bold">Appointment:</span> {date} {time}</p>
            </div>
          </div>
        </div>

        {/* Patient info */}
        <div className="border-b-2 border-blue-800 pb-4 mb-6">
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm">
              <p className="text-center text-blue-800 text-lg font-medium">
                Patient Email: <span className="font-semibold">{patientEmail || "Not available"}</span>
              </p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-gray-600"><span className="font-bold">Date:</span> {currentDate}</p>
              <p className="text-gray-600"><span className="font-bold">Appointment:</span> {date} {time}</p>
            </div>
          </div>
        </div>

        {/* Details heading */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-blue-800">Details</h3>
        </div>

        {/* Prescription items */}
        <div className="mb-8">
          {prescription.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-blue-600">
                    <th className="py-2 text-left font-bold text-blue-800">No.</th>
                    <th className="py-2 text-left font-bold text-blue-800">Medicine</th>
                    <th className="py-2 text-left font-bold text-blue-800">Dose</th>
                    <th className="py-2 text-left font-bold text-blue-800">Frequency</th>
                    <th className="py-2 text-left font-bold text-blue-800">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {prescription.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200">
                      <td className="py-3 pr-2 font-semibold">{idx + 1}.</td>
                      <td className="py-3 pr-2 font-semibold">{item.medicine}</td>
                      <td className="py-3 pr-2">{item.dose}</td>
                      <td className="py-3 pr-2">{item.frequency || 'As needed'}</td>
                      <td className="py-3 italic text-gray-600">{item.note || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-6 text-gray-500 italic">No prescription found.</p>
          )}
        </div>

        {/* Doctor signature */}
        <div className="flex justify-between items-end mt-12 pt-4 border-t border-gray-300">
          <div>
            <p className="text-gray-600 mb-2">Take as directed</p>
            <p className="text-blue-700 font-semibold">MediCare Hospital</p>
            <p className="text-gray-600 text-xs">123 Medical Center Drive, Healthville, NY 10001</p>
          </div>
          <div className="text-right">
            <div className="h-10 w-40 border-b border-gray-500 mb-2"></div>
            <p className="text-gray-600">Dr. {doctorName.split(' ')[1]}</p>
          </div>
        </div>

        {/* Watermark or stamp */}
        <div className="absolute bottom-4 right-4 opacity-20 rotate-12">
          <div className="border-2 border-blue-800 rounded-full p-2">
            <p className="text-blue-800 font-bold">VERIFIED</p>
          </div>
        </div>

        {/* Back button */}
        <div className="flex justify-center mt-8">
          <button
            className="py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-24"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPage;
