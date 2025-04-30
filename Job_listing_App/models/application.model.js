import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumeLink: {
      type: String,
      required: true,
    },
    coverLetterLink: String,
    status: {
      type: String,
      enum: [
        'Applied',
        'Interview',
        'Rejected',
        'Hired',
        'Shortlisted',
        'Withdrawn',
      ],
      default: 'Applied',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    interviewDate: {
      type: Date,
    },
    interviewTime: {
      type: String,
    },
    viewed:{
        type: Boolean,
        default: false,
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model('Application', applicationSchema);
