import { User } from '../models/user.model.js';
import { Comment } from '../models/comment.model.js';
import { Recipe } from '../models/recipe.model.js';

export const getUserCreatedRecipes = async (req, res) => {
  const { id } = req.user;
  try {
    const userRecipes = await User.findById(id)
      .select('createdRecipes')
      .populate('createdRecipes');
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

export const postUsersComment = async (req, res) => {
  const { id } = req.user;
  const { rating, comment, recipeId } = req.body;

  if (!rating) {
    return res
      .status(400)
      .json({ message: 'Rating is required', statusCode: 400, success: false });
  } else if (!comment) {
    return res.status(400).json({
      message: 'Comment is required',
      statusCode: 400,
      success: false,
    });
  } else if (!recipeId) {
    return res.status(400).json({
      message: 'recipeId is required',
      statusCode: 400,
      success: false,
    });
  }

  //   add the comment now
  try {
    const searchComment = await Comment.findOne({ recipe: recipeId });

    if (searchComment === null) {
      const newComment = await Comment.create({
        recipe: recipeId,
        users: { user: id, comment, rating },
      });

      // save on recipe and user db both
      await Recipe.findByIdAndUpdate(recipeId, {
        $set: { comments: newComment._id },
      });
      await User.findByIdAndUpdate(id, { $push: { comments: newComment._id } });
      return res.status(200).json({
        message: 'Comment added successfully',
        statusCode: 200,
        success: true,
      });
    } else {
      const usersComment = searchComment.users.filter(
        (user) => user.user !== id
      );

      if (usersComment.length === 0) {
        searchComment.users = { user: id, comment, rating };
        await searchComment.save();
        //   save comment id in user db
        await User.findByIdAndUpdate(id, {
          $push: { comments: searchComment._id },
        });
        return res.status(200).json({
          message: 'Comment added successfully',
          statusCode: 200,
          success: true,
        });
      } else {
        return res.status(500).json({
          message: 'Cannot add more than 1 comment you already have in it here',
          statusCode: 500,
          success: false,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      statusCode: 500,
      success: false,
    });
  }
};

export const getUserCommentsOnRecipes = async (req, res) => {
  const { id } = req.user;
  try {
    const comments = await Comment.find({ 'users.user': id }).populate(
      'recipe'
    );
    if (comments.length === 0) {
      return res.status(500).json({
        message: 'No comments found',
        statusCode: 500,
        success: false,
      });
    } else {
      return res.status(200).json({
        data: comments,
        message: 'Comments fetched successfully',
        statusCode: 200,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      statusCode: 500,
      success: false,
    });
  }
};

export const addUsersFavouriteRecipe = async (req, res) => {
  const { id } = req.user;
  const recipeId = req.params?.recipeId;
  if (!recipeId) {
    return res.status(400).json({
      message: 'recipe id must be provided',
      statusCode: 400,
      success: false,
    });
  }

  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return res
      .status(400)
      .json({ message: 'Invalid recipe id', statusCode: 400, success: false });
  }

  try {
    const user = await User.findByIdAndUpdate(id, {
      $push: { favourites: recipeId },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid user id', statusCode: 400, success: false });
    }
    return res
      .status(200)
      .json({ message: 'Added to favourites', statusCode: 200, success: true });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      statusCode: 500,
      success: false,
    });
  }
};

export const getUsersFavouriteRecipes = async (req, res) => {
  const { id } = req.user;
  try {
    const favouriteRecipes = await User.findById(id)
      .select('favourites')
      .populate('favourites');
    if (!favouriteRecipes) {
      return res.status(400).json({
        message: 'Invalid user id or not provided',
        statusCode: 400,
        success: false,
      });
    }
    return res.status(200).json({
      data: favouriteRecipes,
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

export const removeUsersFavouriteRecipe = async (req, res) => {
  const { id } = req.user;
  const recipeId = req.params?.recipeId;

  if (!recipeId) {
    return res.status(400).json({
      message: 'recipe id must be provided',
      statusCode: 400,
      success: false,
    });
  }

  try {
    const user = await User.findByIdAndUpdate(id, {
      $pop: { favourites: recipeId },
    });
    if (!favouriteRecipes) {
      return res.status(400).json({
        message: 'Invalid user id or not provided',
        statusCode: 400,
        success: false,
      });
    }
    return res.status(200).json({
      message: 'Recipe removed from favourites',
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
