import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers?.authorization?.replace('Bearer ' , '')
  if (!token) {
    return res.status(401).json({
      message: 'No token, authorization denied',
      statusCode: 401,
      success: false,
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    // Attach the user info to req.user (typically user id or role)
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({
      message: 'Token is not valid or has expired',
      statusCode: 401,
      success: false,
    });
  }
};
