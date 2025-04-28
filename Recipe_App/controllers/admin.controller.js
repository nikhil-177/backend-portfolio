import { Recipe } from '../models/recipe.model.js';

export const getRecipesBasedOnStatus = async (req, res) => {
  const status = req.params?.status;

  if (status !== 'approved' && status !== 'pending' && status !== 'failed') {
    return res
      .status(400)
      .json({ message: 'Invalid parameter', statusCode: 400, success: false });
  }
  try {
    const recipe = await Recipe.find({ status });
    return res
      .status(200)
      .json({
        length: recipe.length,
        data: recipe,
        message: 'Recipes fetched successfully',
        statusCode: 200,
        success: true,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: error.message || 'Something went wrong',
        statusCode: 500,
        success: false,
      });
  }
};
