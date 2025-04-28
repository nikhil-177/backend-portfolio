import { Recipe } from '../models/recipe.model.js';

export const createRecipe = async (req, res) => {
  const { id } = req.user;
  const {
    name,
    description,
    ingredients,
    instructions,
    images,
    preparationTime,
    cookingTime,
    servings,
  } = req.body;

  try {
    const recipe = await Recipe.create({
      name,
      description,
      ingredients,
      instructions,
      images,
      preparationTime,
      cookingTime,
      servings,
      createdBy: id,
    });

    return res
      .status(200)
      .json({
        data: recipe,
        message: 'Recipe created successfully',
        statusCode: 200,
        success: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: error.message || 'Something went wrong',
        statusCode: 500,
        success: false,
      });
  }
};
