import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
    unique: true,
  },
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      comment: String,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      createdOn: { type: Date, defult: Date.now },
    },
  ],
});

export const Comment = mongoose.model('Comment', commentSchema);
