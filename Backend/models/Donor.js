const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: { 
    type: String, 
    required: [true, 'Last name is required'],
    trim: true
  },
  birthDate: { 
    type: Date, 
    required: [true, 'Birth date is required']
  },
  occupation: { 
    type: String, 
    required: [true, 'Occupation is required'],
    trim: true
  },
  gender: { 
    type: String, 
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  address: { 
    type: String, 
    required: [true, 'Address is required'],
    trim: true
  },
  city: { 
    type: String, 
    required: [true, 'City is required'],
    trim: true
  },
  country: { 
    type: String, 
    required: [true, 'Country is required'],
    trim: true
  },
  zip: { 
    type: String, 
    required: [true, 'ZIP code is required'],
    trim: true
  },
  lastDonation: { 
    type: Date,
    default: null
  },
  donatedPreviously: { 
    type: String,
    enum: ['yes', 'no'],
    default: 'no'
  },
  medications: {
    type: [String],
    default: []
  },
  surgeryHistory: {
    type: [String],
    default: []
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add any custom methods or virtual properties here if needed
donorSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const Donor = mongoose.model("Donor", donorSchema);
module.exports = Donor;
