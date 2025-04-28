import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: [
      {
        step: {
          type: String,
          required: true,
        },
        order: {
          type: Number,
          required: true,
        },
      },
    ],
    images: [
      {
        type: String,
        required: false,
      },
    ],
    preparationTime: {
      type: Number, // Time in minutes
      required: true,
    },
    cookingTime: {
      type: Number, // Time in minutes
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    isApproved: {
      type: String,
      enum:["pending","approved","rejected"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

recipeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export const Recipe = mongoose.model('Recipe', recipeSchema);
