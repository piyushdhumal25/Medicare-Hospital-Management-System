import React from "react";

const PrescriptionModal = ({ prescription, onClose }) => {
  return (
  <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
  <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-2xl relative flex flex-col items-center justify-center">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
  <h3 className="text-2xl font-extrabold mb-6 text-blue-700 text-center tracking-wide uppercase">Prescription Details</h3>
        {Array.isArray(prescription) && prescription.length > 0 ? (
          <div className="overflow-x-auto w-full flex justify-center">
            <table className="min-w-[400px] max-w-2xl mx-auto table-auto bg-white rounded-2xl shadow-lg border border-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left font-bold rounded-tl-2xl">Medicine</th>
                  <th className="py-3 px-6 text-left font-bold">Dose</th>
                  <th className="py-3 px-6 text-left font-bold">Frequency</th>
                  <th className="py-3 px-6 text-left font-bold rounded-tr-2xl">Note</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm font-medium divide-y divide-gray-200">
                {prescription.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition duration-150">
                    <td className="py-3 px-6 font-semibold">{item.medicine}</td>
                    <td className="py-3 px-6">{item.dose}</td>
                    <td className="py-3 px-6">{item.frequency || '-'}</td>
                    <td className="py-3 px-6">{item.note || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-500 italic">No prescription found.</div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionModal;
