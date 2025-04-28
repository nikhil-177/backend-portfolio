export const isAdmin = async (req, res, next) => {
  const { id, role } = req.user;
  if (role === 'admin') {
    return next();
  } else {
    return res
      .status(403)
      .json({ message: 'Only admin can access', statusCode: 403, success: false });
  }
};
