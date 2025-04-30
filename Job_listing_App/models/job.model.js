import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    requiredd: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default: 'Full-time',
  },
  category: {
    type: String,
    required: true,
  },
  salaryRange: {
    type: Number,
    min: Number,
    max: Number,
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['Entry-level', 'Mid-level', 'Senior-level'],
    default: 'Entry-level',
  },
  skillsRequired: {
    type: [String],
    required: true,
  },
  isRemote: {
    type: Boolean,
    default: false,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Closed', 'Paused'],
    default: 'Active',
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      default: [],
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Job = mongoose.model('Job', jobSchema);
