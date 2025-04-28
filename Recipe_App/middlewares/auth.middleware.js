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
    req.user = decoded;

    next(); 
  } catch (error) {
    return res.status(401).json({
      message: 'Token is not valid or has expired',
      statusCode: 401,
      success: false,
    });
  }
};
