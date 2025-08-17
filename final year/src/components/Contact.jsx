import React, { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({ fullName: '', email: '', message: '' });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', form);
      alert('Message sent successfully!');
      setForm({ fullName: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error(error); // Now 'error' is used
      alert('Failed to send message.');
    }
  };

  return (
    <section className="min-h-screen flex">
      <div className="w-[60%] hidden md:flex items-center justify-center bg-blue-100">
        <img
          src="loginpage.svg"
          alt="Contact Illustration"
          className="w-[90%] h-auto object-contain"
        />
      </div>

      <div className="py-20 px-5 mx-auto bg-white shadow-lg max-w-xl">
        <h1 className="mb-4 text-3xl text-center font-bold text-blue-700">Contact Us</h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Let’s talk about everything!</h2>
        <p className="mb-6 text-gray-600">Need help? Drop us a message—we’re here to assist!</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-xl font-medium text-gray-700" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-xl font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-xl font-medium text-gray-700" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your message..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
