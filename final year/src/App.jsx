import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from './components/Login';
import LoginDoctor from './doctordash/LoginDoctor';
import SignUp from './components/SignUp';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HealthConcern from './Pages/healthConcerns';
import WhyUs from './Pages/whyUs';
import UserTestimonials from './Pages/testimonials';
import Map from './Pages/Map';
import TrustedBy from './Pages/TrustedBy';
import AdminDashboard from './Pages/AdminDashboard';
import PatientDashboard from './Pages/PatientDashboard';
import DoctorDashboard from './Pages/DoctorDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import BookAppointment from './patientdash/BookAppoinment';
import { AppointmentProvider } from './data/AppointmentContext';
import DoctorsList from './admindash/Doctorlist';
import { DoctorProvider } from './data/DoctorContext';
import AddDoctor from './admindash/AddDoctor';
import DoctorProfile from './doctordash/DoctorProfile';
import Chatbot from './Chatbot';
import PaymentSuccess from './patientdash/PaymentSuccess';
import PaymentFailed from './patientdash/PaymentFailed';
import Donate from './donate/Donate';

const LayoutWrapper = () => {
  const location = useLocation();

  const hideNavbarFooterRoutes = [
    "/admin/dashboard",
    "/doctor/dashboard",
    "/patient/dashboard",
    "/login",
    "/signup",
  ];

  const shouldHideLayout = hideNavbarFooterRoutes.some(path =>
    location.pathname.toLowerCase().startsWith(path.toLowerCase())
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <Routes>
{/* ...existing code... */}
        <Route
          path='/'
          element={
            <>
              <Hero />
              <HealthConcern />
              <div id="whyus">
                <TrustedBy />
                <WhyUs />
              </div>
              <Map />
              <UserTestimonials />
            </>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path="/logindoctor" element={ <LoginDoctor/> }/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        <Route path="/admin/dashboard/*" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/doctor/dashboard" element={
          <ProtectedRoute role="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/patient/dashboard" element={
          <ProtectedRoute role="patient">
            <PatientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<PatientDashboard />} />
        <Route path="/admin/dashboard/doctors-list" element={<DoctorsList />} />
        <Route path="/admin/dashboard/add-doctor" element={<AddDoctor />} />
        <Route path="/doctordashboard/*" element={ <DoctorDashboard/> } />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/donate" element={<Donate/>} />
      </Routes>

      {/* Show Chatbot on all pages except dashboard/login/signup routes */}
      {!shouldHideLayout && <Chatbot />}
      {!shouldHideLayout && <Footer />}
    </>
  );
};

const App = () => {
    return (
    <AppointmentProvider>
      <DoctorProvider> {/* ✅ Wrap karla DoctorContext */}
        <BrowserRouter>
          <LayoutWrapper />
        </BrowserRouter>
      </DoctorProvider>
    </AppointmentProvider>
  );
};

export default App;