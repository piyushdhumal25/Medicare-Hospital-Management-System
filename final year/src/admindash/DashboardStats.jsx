import React from 'react';
import { UserPlus, Users, CalendarCheck } from 'lucide-react'; // Optional icons

const DashboardStats = ({ totalDoctors, totalPatients, totalAppointments }) => {
  const cards = [
    {
      title: "Total Doctors",
      count: totalDoctors,
      icon: <UserPlus size={28} className="text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      title: "Total Patients",
      count: totalPatients,
      icon: <Users size={28} className="text-green-500" />,
      bg: "bg-green-50",
    },
    {
      title: "Total Appointments",
      count: totalAppointments,
      icon: <CalendarCheck size={28} className="text-purple-500" />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`flex items-center justify-between ${card.bg} shadow-md rounded-xl p-6 transition-transform hover:scale-[1.02] hover:shadow-lg`}
        >
          <div>
            <p className="text-sm text-gray-500">{card.title}</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{card.count}</h3>
          </div>
          <div className="bg-white p-3 rounded-full shadow">{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
