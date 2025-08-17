import React, { createContext, useState, useEffect } from "react";
import axios from "axios"; 
import Navbar from "../Navbar";

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [loggedInDoctorEmail, setLoggedInDoctorEmail] = useState(null);
  const [doctors, setDoctors] = useState([]);
  <Navbar/>

  // ✅ Fetch doctors from backend
  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // ✅ Add Doctor to backend & refresh list
  const addDoctor = async (newDoctor) => {
    try {
      await axios.post("http://localhost:5000/api/doctors", newDoctor);
      await fetchDoctors(); // refresh list after adding
      console.log("Doctor added:", newDoctor);
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  // ✅ Auto set doctor email from localStorage on app load
  useEffect(() => {
    const storedDoctor = JSON.parse(localStorage.getItem("doctor"));
    if (storedDoctor?.email) {
      setLoggedInDoctorEmail(storedDoctor.email);
    }
    fetchDoctors(); // get doctors when app loads
  }, []);

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        setDoctors,
        addDoctor,
        loggedInDoctorEmail,
        setLoggedInDoctorEmail,
        fetchDoctors
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};