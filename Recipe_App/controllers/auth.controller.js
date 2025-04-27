import { User } from '../models/user.model.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ profile: { name, email, password } });
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
    const user = await User.findOne({ 'profile.email': email });
    if (user === null) {
      return res.status(400).json({
        message: 'Invalid Email or Password',
        statusCode: 400,
        success: false,
      });
    }
    // check password
    const comparedPassword = await user.comparePassword(password);
    if (!comparedPassword) {
      return res.status(400).json({
        message: 'Invalid Email or Password',
        statusCode: 400,
        success: false,
      });
    } else {
      // generate tokens
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      // save refresh token in database
      user.refreshToken = refreshToken;
      await user.save();

      return res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          message: `Welcome back, ${user.profile.name}`,
          accessToken,
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

export const logoutUser = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id).select('refreshToken');
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', statusCode: 404, success: false });
    }

    // remove token from db
    user.refreshToken = '';
    await user.save();

    // clear cookie and send response
    return res
      .clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: 'You logged out successfully',
        statusCode: 200,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      statusCode: 500,
      success: false,
    });
  }
};
