import { User } from '../models/user.model.js';

export const getUserCreatedRecipes = async (req, res) => {
  const { id } = req.user;
  try {
    const userRecipes = await User.findById(id).select('createdRecipes').populate('createdRecipes');
    if (userRecipes.length === 0) {
      return res.status(400).json({
        message: 'No recipes found,Please create first',
        statusCode: 400,
        success: false,
      });
    } else {
      return res.status(200).json({
        data: userRecipes,
        message: 'Recipes fetched successfully',
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
