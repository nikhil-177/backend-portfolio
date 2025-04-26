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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user === null) {
      return res.status(400).json({
        message: 'Invalid Email or Password',
        statusCode: 400,
        success: false,
      });
    }
    // check password
    if (!(user.password === password)) {
      return res.status(400).json({
        message: 'Invalid Email or Password',
        statusCode: 400,
        success: false,
      });
    } else {
      return res.status(200).json({
        message: `Welcome back, ${user.name}`,
        tokens: [],
        statusCode: 200,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      statusCode: 500,
      success: false,
    });
  }
};
