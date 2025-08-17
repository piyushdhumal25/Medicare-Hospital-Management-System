import React from 'react';
import { Users, CalendarCheck2, ShieldCheck } from 'lucide-react';

export default function TrustedBy() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6 md:px-20 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">
        Trusted by <span className="text-blue-600">2,000+</span> Users
      </h2>

      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12">
        Join thousands of patients using our platform to book appointments, consult top doctors, and take control of their health — all in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-blue-800 font-medium">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:shadow-lg">
          <Users className="w-12 h-12 mb-4 text-blue-600" />
          <h3 className="text-xl font-semibold mb-1">2k+ Happy Patients</h3>
          <p className="text-gray-500 text-sm">People who trust our platform for health consultations and support.</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:shadow-lg">
          <CalendarCheck2 className="w-12 h-12 mb-4 text-blue-600" />
          <h3 className="text-xl font-semibold mb-1">10k+ Appointments</h3>
          <p className="text-gray-500 text-sm">Appointments booked and managed successfully without hassle.</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:shadow-lg">
          <ShieldCheck className="w-12 h-12 mb-4 text-blue-600" />
          <h3 className="text-xl font-semibold mb-1">Verified Doctors</h3>
          <p className="text-gray-500 text-sm">Licensed professionals across multiple specialties on our platform.</p>
        </div>
      </div>
    </section>
  );
}
