import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    profile: {
      name: String,
      avatar: String,
      email: String,
      password: String, //store hashed password only
    },
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
    refreshToken: { type: String, default: '' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('profile.password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.profile.password = await bcrypt.hash(this.profile.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model('User', userSchema);
