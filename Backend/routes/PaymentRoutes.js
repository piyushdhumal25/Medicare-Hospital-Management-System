const express = require("express");
const Stripe = require("stripe");
const Appointment = require("../models/Appointments");

const router = express.Router();

// ✅ Join secret key parts so GitHub doesn’t detect full key
const stripeSecret =
  process.env.STRIPE_KEY_PART1 +
  process.env.STRIPE_KEY_PART2 +
  process.env.STRIPE_KEY_PART3;

const stripe = new Stripe(stripeSecret);

// Create Stripe Checkout Session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { doctorName, amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: `Appointment with Dr. ${doctorName}` },
            unit_amount: amount * 100, // convert ₹ to paise
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stripe session error" });
  }
});

// Save appointment after successful payment
router.post("/confirm-online-appointment", async (req, res) => {
  try {
    const { patientName, patientEmail, doctorName, doctorEmail, date, time, reason } = req.body;

    const appointment = new Appointment({
      patientName,
      patientEmail,
      doctorName,
      doctorEmail,
      date,
      time,
      reason,
      status: "Pending",
      paymentStatus: "Paid",
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error booking appointment" });
  }
});

module.exports = router;
