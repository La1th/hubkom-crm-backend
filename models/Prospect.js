const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    default: 'Admin'
  }
});

const ActivitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Call', 'Email', 'Meeting', 'Other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    default: 'Admin'
  }
});

const ProspectSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: [
      'New Lead',
      'Contacted',
      'Qualified',
      'Proposal',
      'Negotiation',
      'Contract Sent',
      'Won/Sold',
      'Lost',
      'Inactive'
    ],
    default: 'New Lead'
  },
  notes: [NoteSchema],
  activities: [ActivitySchema],
  lastContact: {
    type: Date,
    default: null
  }
}, { timestamps: true });

// Create indexes for faster queries
ProspectSchema.index({ fullName: 'text', email: 'text' });
ProspectSchema.index({ status: 1 });

const Prospect = mongoose.model('Prospect', ProspectSchema);

module.exports = Prospect; 