import React from "react";

const categories = [
  "All",
  "General Physician",
   "Pediatrician",
  "Neurologist",
  "Cardiologist",
  "Radiologist",
  "Dermatologist",
  "Psychology",
  "Orthopedics",
  "Traumatology",
 "Gynecologist",
  
  
  
 
 
];

const CategoryFilter = ({ category, setCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-1 border rounded-full ${
            category === cat ? "bg-cyan-500 text-white" : "bg-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;