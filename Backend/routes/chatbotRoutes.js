
const express = require('express');
const router = express.Router();


// Simple FAQ and health Q&A logic
const faq = [
  { q: /appointment|book/i, a: "You can book an appointment with our doctors using the Book Appointment page on our website." },
  { q: /doctor|specialist|profile/i, a: "You can view doctor profiles and their specialties on the Doctors page." },
  { q: /contact|reach/i, a: "You can contact us using the Contact page on our website." },
  { q: /about|website|project/i, a: "This is a health and appointment booking website where you can book appointments, view doctors, and read health information." },
  { q: /testimonial|review|trusted/i, a: "You can read testimonials and see our trusted partners on the homepage." },
  { q: /map|location/i, a: "You can see our locations and map on the homepage." },
  { q: /why us|choose/i, a: "Visit the Why Us section to know why you should choose us for your health needs." },
  // Health Q&A
  { q: /fever|temperature/i, a: "A fever is a temporary increase in your body temperature. If it persists, consult a doctor." },
  { q: /headache/i, a: "Headaches can have many causes. Stay hydrated and rest. If severe, see a doctor." },
  { q: /covid|corona/i, a: "If you suspect COVID-19, isolate and get tested. Consult a healthcare provider for symptoms." },
  { q: /cold|cough/i, a: "Colds and coughs are usually viral. Drink fluids and rest. If symptoms persist, consult a doctor." },
  { q: /medicine/i, a: "Please consult a doctor before taking any medicine." },
  { q: /emergency/i, a: "In case of emergency, call your local emergency number or visit the nearest hospital." },
  // Extra Q&A
  { q: /opening|timing|hours/i, a: "Our doctors are available for appointments from 9 AM to 6 PM, Monday to Saturday." },
  { q: /payment|pay|fees/i, a: "You can pay consultation fees online or at the clinic. Please check the Book Appointment page for details." },
  { q: /services|facilities/i, a: "We offer general consultation, specialist appointments, and health checkups. See the homepage for more services." },
  { q: /cancel|reschedule/i, a: "To cancel or reschedule an appointment, please visit the My Appointments section or contact support." },
  { q: /prescription|report/i, a: "Prescriptions and reports are provided by your doctor after your appointment. You can access them in your patient dashboard." },
  { q: /login|signup|register/i, a: "You can log in or sign up using the Login and Sign Up pages on our website." },
  { q: /forgot password|reset password/i, a: "If you forgot your password, use the Forgot Password link on the Login page to reset it." },
  // More health Q&A
  { q: /diabetes/i, a: "modern style is a chronic condition that affects how your body processes blood sugar. Consult a doctor for management and treatment." },
  { q: /blood pressure|bp|hypertension/i, a: "High blood pressure (hypertension) can lead to serious health problems. Regular monitoring and a healthy lifestyle are important." },
  { q: /allergy|allergies/i, a: "Allergies are reactions to certain substances. Avoid known allergens and consult a doctor for severe symptoms." },
  { q: /asthma/i, a: "Asthma is a condition that affects breathing. Use prescribed inhalers and avoid triggers. Consult your doctor for management." },
  { q: /pain|chest pain/i, a: "Chest pain can be serious. If you have severe or persistent chest pain, seek emergency medical attention immediately." },
  { q: /vomit|vomiting|nausea/i, a: "Vomiting and nausea can have many causes. Stay hydrated and consult a doctor if symptoms persist." },
  { q: /rash|skin problem/i, a: "Skin rashes can be caused by allergies, infections, or other issues. Consult a dermatologist for proper diagnosis." },
  { q: /diet|nutrition/i, a: "A balanced diet is important for good health. Consult a nutritionist or doctor for personalized advice." },
  { q: /exercise|fitness/i, a: "Regular exercise is beneficial for physical and mental health. Choose activities you enjoy and consult a doctor before starting a new fitness routine." },
  { q: /mental health|stress|anxiety|depression/i, a: "Mental health is important. If you feel stressed, anxious, or depressed, talk to a mental health professional or counselor." },
];


const axios = require('axios');
// Make sure to set GEMINI_API_KEY in your environment variables or .env file
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ response: "Please ask a health or website-related question." });

  const found = faq.find(item => item.q.test(message));
  if (found) {
    return res.json({ response: found.a });
  }

  // If not found in FAQ, use Gemini 2.0 Flash
  try {
    const geminiRes = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
      {
        contents: [{ role: 'user', parts: [{ text: message }] }],
        generationConfig: {
          temperature: 0.85, // More human-like
          topP: 1,
          topK: 1,
          maxOutputTokens: 256
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        }
      }
    );
    const geminiText = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
    res.json({ response: geminiText });
  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message);
    res.status(500).json({ response: 'Sorry, there was an error talking to Gemini.' });
  }
});

module.exports = router;
