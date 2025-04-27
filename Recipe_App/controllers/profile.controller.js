import { User } from '../models/user.model.js';

export const getUserProfile = async (req, res) => {
  //   const { id } = req.user;
  const id = '680dcc6055ee301e827a598c';
  try {
    const user = await User.findById(id).select(
      '-profile.password -favourites -createdRecipes -comments -refreshToken'
    );

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        statusCode: 404,
        success: false,
      });
    }
    return res.status(200).json({
      data: user,
      message: 'Profile retrieved successfully',
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

export const updateUserProfile = async (req, res) => {
  // const { id } = req.user;
  const id = '680dcc6055ee301e827a598c'; // remove this later

  const { name, avatar, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          'profile.name': name,
          'profile.email': email,
          'profile.avatar': avatar,
        },
      },
      { runValidators: true, new: true }
    ).select('-profile.password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        statusCode: 404,
        success: false,
      });
    }

    return res.status(200).json({
      data: user.profile,
      message: 'User updated successfully',
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
