import { User } from '../models/user.model.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    return res.status(200).json({
      data: user,
      message: 'User created successfully',
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};
