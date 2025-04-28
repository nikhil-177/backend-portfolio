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
    return res.status(200).json({
      length: recipe.length,
      data: recipe,
      message: 'Recipes fetched successfully',
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

export const updateRecipeStatus = async (req, res) => {
  const { id, status } = req.query;
if (!id) {
  return res.status(400).json({
    message: 'Recipe ID is required',
    statusCode: 400,
    success: false,
  });
}

if (!status) {
  return res.status(400).json({
    message: 'New status is required',
    statusCode: 400,
    success: false,
  });
}

  try {
    await Recipe.findByIdAndUpdate(
      id,
      { $set: {status} },
      { runValidators: true }
    );
    return res
      .status(200)
      .json({
        message: 'Recipe status Updated',
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
