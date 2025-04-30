import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['Applicant', 'Recruiter', 'Admin'],
      default: 'Applicant',
    },

    //   if applicant
    profile: {
      headline: {
        type: String,
        required: true,
        trim: true,
      },
      bio: {
        type: String,
        required: true,
        trim: true,
      },
      location: {
        type: String,
        required: true,
        trim: true,
      },
      resumeLink: String,
      portfolioLink: String,
      skills: {
        type: [String],
        required: true,
        trim: true,
      },
      experience: {
        school: {
          type: String,
          required: true,
          trim: true,
        },
        degree: {
          type: String,
          required: true,
          trim: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
      },
      applications: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Job',
          required: true,
          trim: true,
        },
      ],
      bookmarks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Job',
          required: true,
          trim: true,
        },
      ],
    },

    // if Recruiter
    company: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      location: {
        type: String,
        required: true,
        trim: true,
      },
      websiteLink: String,
      logoLink: String,
      jobsPosted: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Job',
          required: true,
          trim: true,
        },
      ],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
