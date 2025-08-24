import React, { useState } from "react";
import axios from "axios";

const PrescriptionInput = ({ appointment, onPrescriptionSaved }) => {
  const [prescriptionList, setPrescriptionList] = useState(Array.isArray(appointment.prescription) ? appointment.prescription : []);
  const [medicineInputs, setMedicineInputs] = useState([
    { id: 1, medicine: "", dose: "", frequency: "", note: "" } // Start with one input row
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const MAX_MEDICINES = 5; // Maximum number of medicines that can be added

  const handleChange = (id, field, value) => {
    setMedicineInputs(prevInputs => 
      prevInputs.map(input => 
        input.id === id ? { ...input, [field]: value } : input
      )
    );
  };

  const handleAddMedicineRow = () => {
    if (medicineInputs.length < MAX_MEDICINES) {
      const newId = medicineInputs.length + 1;
      setMedicineInputs([...medicineInputs, { id: newId, medicine: "", dose: "", frequency: "", note: "" }]);
    }
  };

  const handleRemoveRow = (id) => {
    setMedicineInputs(prevInputs => prevInputs.filter(input => input.id !== id));
  };

  const handleAddItemToPrescription = (item) => {
    if (!item.medicine.trim() || !item.dose.trim()) return false;
    setPrescriptionList([...prescriptionList, item]);
    return true;
  };

  const handleRemoveItem = (idx) => {
    setPrescriptionList(prescriptionList.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    // Collect all filled medicine inputs
    let finalList = [...prescriptionList];
    let validInputsFound = false;
    
    medicineInputs.forEach(input => {
      if (input.medicine.trim() && input.dose.trim()) {
        finalList.push({
          medicine: input.medicine,
          dose: input.dose,
          frequency: input.frequency,
          note: input.note
        });
        validInputsFound = true;
      }
    });
    
    setPrescriptionList(finalList);
    // Clear inputs after saving
    setMedicineInputs([{ id: 1, medicine: "", dose: "", frequency: "", note: "" }]);
    
    try {
      await axios.put("https://medicare-hospital-management-system-3.onrender.com/api/appointments/prescription", {
        appointmentId: appointment._id,
        prescription: finalList,
      });
      onPrescriptionSaved(finalList);
      setSuccess("Prescription saved successfully!");
    } catch (err) {
      setError("Failed to save prescription");
    }
    setLoading(false);
  };

  return (
    <form className="bg-white p-4 rounded-lg border border-gray-200" onSubmit={handleSubmit}>
      <label className="text-lg font-bold text-blue-800 mb-3 block">Prescription</label>
      
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto bg-white border">
          <thead className="bg-blue-600 text-white uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left font-bold">Medicine</th>
              <th className="py-3 px-6 text-left font-bold">Dose</th>
              <th className="py-3 px-6 text-left font-bold">Frequency</th>
              <th className="py-3 px-6 text-left font-bold">Note</th>
              <th className="py-3 px-6 text-left font-bold">Remove</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm font-medium divide-y divide-gray-200">
            {medicineInputs.map((input, index) => (
              <tr key={input.id} className="hover:bg-blue-50 transition duration-150">
                <td className="py-3 px-6">
                  <div className="flex flex-col">
                    <input 
                      type="text" 
                      placeholder={`Medicine ${index + 1}`} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      value={input.medicine} 
                      onChange={(e) => handleChange(input.id, 'medicine', e.target.value)} 
                      required 
                    />
                  </div>
                </td>
                <td className="py-3 px-6">
                  <input 
                    type="text" 
                    placeholder="Dose" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    value={input.dose} 
                    onChange={(e) => handleChange(input.id, 'dose', e.target.value)} 
                    required 
                  />
                </td>
                <td className="py-3 px-6">
                  <input 
                    type="text" 
                    placeholder="Frequency" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    value={input.frequency} 
                    onChange={(e) => handleChange(input.id, 'frequency', e.target.value)} 
                  />
                </td>
                <td className="py-3 px-6">
                  <input 
                    type="text" 
                    placeholder="Note" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    value={input.note} 
                    onChange={(e) => handleChange(input.id, 'note', e.target.value)} 
                  />
                </td>
                <td className="py-3 px-6">
                  {medicineInputs.length > 1 && (
                    <button
                      type="button"
                      className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={() => handleRemoveRow(input.id)}
                      disabled={loading}
                    >
                      Remove
                    </button>
                  )}
                  {medicineInputs.length === 1 && (
                    <button
                      type="button"
                      className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={() => setMedicineInputs([{ id: 1, medicine: "", dose: "", frequency: "", note: "" }])}
                      disabled={loading}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
            
            {/* Add Medicine button at the bottom of the table */}
            {medicineInputs.length < MAX_MEDICINES && (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center">
                  <button 
                    type="button"
                    className="px-4 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleAddMedicineRow}
                    disabled={loading}
                  >
                    + Add Medicine
                  </button>
                </td>
              </tr>
            )}
            
            {prescriptionList.map((item, idx) => (
              <tr key={idx} className="hover:bg-blue-50 transition duration-150">
                <td className="py-4 px-6 font-semibold">
                  <span>{item.medicine}</span>
                </td>
                <td className="py-4 px-6">{item.dose}</td>
                <td className="py-4 px-6">{item.frequency || '-'}</td>
                <td className="py-4 px-6">{item.note || '-'}</td>
                <td className="py-4 px-6">
                  <button
                    type="button"
                    className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => handleRemoveItem(idx)}
                    disabled={loading}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-center gap-4 mt-6">
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 disabled:opacity-50 font-medium shadow-md transition duration-300"
          disabled={loading || (
            prescriptionList.length === 0 && 
            !medicineInputs.some(input => input.medicine.trim() && input.dose.trim())
          )}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className="px-5 py-2 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 disabled:opacity-50 font-medium shadow-md transition duration-300"
          disabled={loading || prescriptionList.length === 0}
          onClick={async () => {
            setLoading(true);
            setError("");
            setSuccess("");
            try {
              await axios.put("https://medicare-hospital-management-system-3.onrender.com/api/appointments/prescription", {
                appointmentId: appointment._id,
                prescription: [],
              });
              setPrescriptionList([]);
              setSuccess("Prescription deleted successfully!");
              onPrescriptionSaved([]);
            } catch (err) {
              setError("Failed to delete prescription");
            }
            setLoading(false);
          }}
        >
          Delete
        </button>
      </div>
      {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
      {success && <div className="text-green-600 mt-2 text-sm font-semibold">{success}</div>}
    </form>
  );
};

export default PrescriptionInput;