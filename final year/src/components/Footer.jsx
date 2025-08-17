import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#003366] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">MediCare</h2>
          <p className="text-sm text-gray-200">
            Your trusted partner for online doctor appointments. We connect patients with expert care, 24/7.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/About" className="hover:underline">About</Link></li>
            <li><Link to="/Contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/Login" className="hover:underline">Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">📍 Pune, Maharashtra, India</p>
          <p className="text-sm">📞 +91 9876543210</p>
          <p className="text-sm">✉️ support@medicare.com</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-blue-400 pt-4 text-center text-sm text-gray-200">
        &copy; {new Date().getFullYear()} MediCare. All rights reserved.
      </div>
    </footer>
  );
}
