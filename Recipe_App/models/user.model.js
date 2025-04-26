import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String, //store hashed password only
    // users favourite recipes
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    // users comment on other recipes
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        ratings: { type: Number, min: 1, max: 5 },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    // users created recipes
    createdRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
