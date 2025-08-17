import React from 'react';
import { LogOut } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="bg-white shadow-lg rounded-b-xl px-8 py-4 flex justify-between items-center border-b border-gray-100">
      {/* Left side: Branding */}
      

      {/* Right side: Profile + Logout */}
      <div className="flex items-center gap-4">
        {/* Profile Initials Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shadow-inner">
      
        </div>

      </div>
    </div>
  );
};

export default Topbar;
