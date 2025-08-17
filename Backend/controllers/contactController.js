// controllers/contactController.js
const Contact = require("../models/Contact");

// Save contact form message
exports.sendMessage = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    const contact = new Contact({ fullName, email, message });
    await contact.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// ✅ New: Get all messages for admin
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages." });
  }
};
