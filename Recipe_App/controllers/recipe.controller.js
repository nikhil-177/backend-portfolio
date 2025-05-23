import { Recipe } from '../models/recipe.model.js';
import { User } from '../models/user.model.js';

export const createRecipe = async (req, res) => {
  const { id,role } = req.user;
  
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

  let status = "pending"
  if(role === "admin"){
    status = "approved" 
  } 
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
      status
    });
// save the recipe in users db
    const user = await User.findByIdAndUpdate(id,{$set:{createdRecipes:recipe._id}}).select("role")
    
    let message = user.role === "admin" ? "Recipe created successfully" : "Recipe is in pending for now"
    res.status(200).json({
      data: recipe,
      message ,
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

export const updateRecipe = async (req, res) => {
  const { ...updateData } = req.body;
  const id = req.params?.id;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { $set: updateData },
      { runValidators: true, new: true }
    );

    return res.status(200).json({
      data: updatedRecipe,
      message: 'Recipe updated successfully',
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

export const deleteRecipe = async (req, res) => {
  const id = req.params?.id;

  try {
    await Recipe.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Recipe deleted successfully',
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

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({status:"approved"});
    return res.status(200).json({
      totalRecipes: recipes.length,
      data: recipes,
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

export const getRecipe = async (req, res) => {
  const id = req.params?.id;
  try {
    const recipe = await Recipe.findById(id);

    return res
      .status(200)
      .json({
        data: recipe,
        message: 'Recipe fetched successfully',
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
