import { useState } from "react";
import React from "react";

export default function Donate() {
  const [submitted, setSubmitted] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    occupation: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    lastDonation: "",
    donatedPreviously: "",
    medications: [],
    surgeryHistory: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // handle multi-checkbox arrays (like medications, surgeryHistory)
      setFormData((prev) => {
        const existing = prev[name] || [];
        const updated = checked
          ? [...existing, value]
          : existing.filter((v) => v !== value);
        
        return {
          ...prev,
          [name]: updated
        };
      });
    } else if (type === "radio") {
      // For radio buttons, just set the value directly
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Update donor name if it's firstName or lastName
      if (name === 'firstName' || name === 'lastName') {
        setDonorName(prev => {
          const names = prev.split(' ');
          if (name === 'firstName') {
            return `${value} ${names[1] || ''}`.trim();
          } else {
            return `${names[0] || ''} ${value}`.trim();
          }
        });
      }
    } else {
      // For all other inputs
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Update donor name if it's firstName or lastName
      if (name === 'firstName' || name === 'lastName') {
        setDonorName(prev => {
          const names = prev.split(' ');
          if (name === 'firstName') {
            return `${value} ${names[1] || ''}`.trim();
          } else {
            return `${names[0] || ''} ${value}`.trim();
          }
        });
      }
    }
  };

  // Submit data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Validate required fields based on the model
      const requiredFields = [
        'firstName', 'lastName', 'birthDate', 'occupation', 
        'gender', 'phone', 'email', 'address', 'city', 'country'
      ];

      const missingFields = requiredFields.filter(field => 
        !formData[field] || formData[field].toString().trim() === ''
      );

      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setIsSubmitting(false);
        return;
      }

      // Format the data
      const formattedData = {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        birthDate: new Date(formData.birthDate).toISOString(),
        medications: formData.medications || [],
        surgeryHistory: formData.surgeryHistory || []
      };

      console.log('Submitting data:', formattedData);

      // Submit the form
      const response = await fetch("http://localhost:5000/api/donors/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formattedData)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Try to get response text first
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${responseText}`);
      }
      
      // Try to parse as JSON if possible
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed response:', data);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Server returned invalid response format');
      }

      // If we get here, the submission was successful
      setDonorName(formattedData.firstName + " " + formattedData.lastName);
      setSubmitted(true);
      alert('Donation form submitted successfully!');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message || "Could not submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show certificate if submitted
  if (submitted && donorName) {
    return (
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-white to-blue-100 min-h-screen pt-28 pb-20">
        <div className="relative bg-white/90 border-4 border-blue-400 rounded-3xl shadow-2xl max-w-xl w-full px-8 py-10 flex flex-col items-center">
          <div className="mb-4 w-full flex justify-end">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Certificate
            </button>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-10">
            <svg width="180" height="50" viewBox="0 0 180 50">
              <rect x="0" y="15" width="180" height="20" rx="10" fill="#2563eb" />
              <text
                x="90"
                y="32"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="20"
                fill="#fff"
                fontWeight="bold"
              >
                CERTIFICATE
              </text>
            </svg>
          </div>
          <div className="flex justify-center w-full mb-2" style={{ marginTop: "-2.5rem" }}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/012/627/730/original/3d-label-ribbon-glossy-gold-blank-plastic-banner-for-advertisment-promo-and-decoration-elements-high-quality-isolated-render-png.png"
              alt="Gold Ribbon"
              className="h-16 md:h-24 object-contain"
              style={{ margin: "0 auto", maxWidth: "400px" }}
            />
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-yellow-700 tracking-wide text-center mb-2">
            Blood Donation Certificate
          </div>
          <div className="text-base md:text-lg text-gray-700 font-medium text-center mb-6">
            This certificate is proudly presented to
          </div>
          <div className="text-2xl md:text-3xl font-bold text-red-700 text-center mb-2 underline decoration-wavy">
            {donorName || "[Donor Name]"}
          </div>
          <div className="text-base md:text-lg text-gray-700 font-medium text-center mb-6">
            in recognition of their generous blood donation at{" "}
            <span className="text-blue-700 font-bold">MediCare Hospital</span>.
            <br />
            Your selfless act is deeply appreciated and will help save precious lives.
            <br />
            <span className="italic text-gray-600">Thank you for being a real-life hero!</span>
          </div>
          <div className="flex flex-row justify-between w-full mt-8 mb-2 px-2">
            <div className="text-left">
              <div className="font-semibold text-gray-600">Date</div>
              <div className="text-gray-800">{new Date().toLocaleDateString()}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-600">Authorized by MediCare</div>
              <div className="text-gray-800 mt-2 font-cursive text-lg">
                <svg width="100" height="30">
                  <text x="0" y="20" fontFamily="cursive" fontSize="20" fill="#2563eb">
                    MediCare
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full border-t-2 border-blue-400 mt-6 pt-2 text-center text-xs text-gray-500 tracking-widest">
            MediCare Hospital • Your Health, Our Commitment
          </div>
        </div>
      </div>
    );
  }

  // Form UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-white to-red-200 pt-28 pb-20">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="bg-white/90 p-0 rounded-3xl shadow-2xl max-w-2xl w-full flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full px-6 md:px-10 py-8 flex flex-col items-center rounded-lg shadow-xl bg-white">
            {/* Branding */}
            <div className="mb-2 mt-10 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-blue-700 tracking-wide">MediCare Hospital</span>
              <span className="text-xs text-gray-500 font-semibold">Your Health, Our Commitment</span>
            </div>

            {/* Motivational Heading */}
            <h1 className="text-4xl font-extrabold mb-2 text-red-700 text-center tracking-tight">
              🩸 Blood Donation Form ❤️
            </h1>

            {/* Grid Fields */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* First Name */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full p-3 border border-red-300 rounded-lg"
                  onChange={(e) => {
                    handleChange(e);
                    setDonorName(e.target.value + (donorName.split(" ")[1] ? " " + donorName.split(" ")[1] : ""));
                  }}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full p-3 border border-red-300 rounded-lg"
                  onChange={(e) => {
                    handleChange(e);
                    setDonorName((donorName.split(" ")[0] || "") + " " + e.target.value);
                  }}
                />
              </div>

              {/* Other inputs → just keep handleChange */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Birth Date</label>
                <input type="date" name="birthDate" required className="w-full p-3 border border-red-300 rounded-lg" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Occupation</label>
                <input type="text" name="occupation" required className="w-full p-3 border border-red-300 rounded-lg" onChange={handleChange} />
              </div>

              {/* Gender */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Gender *</label>
                <div className="flex gap-4 mt-2">
                  <label><input type="radio" name="gender" value="male" required onChange={handleChange} /> Male</label>
                  <label><input type="radio" name="gender" value="female" required onChange={handleChange} /> Female</label>
                  <label><input type="radio" name="gender" value="other" required onChange={handleChange} /> Other</label>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Phone Number</label>
                <input type="text" name="phone" required className="w-full p-3 border border-red-300 rounded-lg" onChange={handleChange} />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Email</label>
                <input type="email" name="email" required className="w-full p-3 border border-red-300 rounded-lg" onChange={handleChange} />
              </div>

              {/* Address */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Address</label>
                <input type="text" name="address" required className="w-full p-3 border border-red-300 rounded-lg" onChange={handleChange} />
              </div>

              {/* City */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">City</label>
                <input type="text" name="city" required className="w-full p-3 border border-red-300 rounded-lg" onChange={handleChange} />
              </div>

              {/* Country */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Country</label>
                <input type="text" name="country" required className="w-full p-3 border border-red-300 rounded-lg" onChange={handleChange} />
              </div>

              {/* Zip */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Zip Code</label>
                <input type="text" name="zip" required className="w-full p-3 border border-red-300 rounded-lg" onChange={handleChange} />
              </div>

              {/* Last Donation */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Last time you donated?</label>
                <input type="date" name="lastDonation" className="w-full p-3 border border-red-300 rounded-lg" onChange={handleChange} />
              </div>

              {/* Donated Previously */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Have you donated previously?</label>
                <div className="flex gap-4 mt-2">
                  <label><input type="radio" name="donatedPreviously" value="yes" onChange={handleChange} /> Yes</label>
                  <label><input type="radio" name="donatedPreviously" value="no" onChange={handleChange} /> No</label>
                </div>
              </div>

              {/* Medications */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold text-gray-700">Medications (past 72 hours)?</label>
                <div className="grid grid-cols-2 gap-2">
                  <label><input type="checkbox" name="medications" value="antibiotics" onChange={handleChange} /> Antibiotics</label>
                  <label><input type="checkbox" name="medications" value="steroids" onChange={handleChange} /> Steroids</label>
                  <label><input type="checkbox" name="medications" value="aspirin" onChange={handleChange} /> Aspirin</label>
                  <label><input type="checkbox" name="medications" value="vaccinations" onChange={handleChange} /> Vaccinations</label>
                  <label><input type="checkbox" name="medications" value="alcohol" onChange={handleChange} /> Alcohol</label>
                  <label><input type="checkbox" name="medications" value="dogbite" onChange={handleChange} /> Dog Bite Vaccine</label>
                </div>
              </div>

              {/* Surgery History */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold text-gray-700">Surgery/Blood Transfusion in 6 months?</label>
                <div className="grid grid-cols-3 gap-2">
                  <label><input type="checkbox" name="surgeryHistory" value="major" onChange={handleChange} /> Major Surgery</label>
                  <label><input type="checkbox" name="surgeryHistory" value="minor" onChange={handleChange} /> Minor Surgery</label>
                  <label><input type="checkbox" name="surgeryHistory" value="bloodTransfusion" onChange={handleChange} /> Blood Transfusion</label>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-3 rounded-full shadow-lg transition-all font-bold text-lg tracking-wide flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-110'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                'Donate Now'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
