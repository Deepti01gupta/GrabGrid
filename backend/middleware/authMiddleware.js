const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization?.split(' ')[1];
    const fallbackToken = req.headers['x-access-token'] || req.body?.accessToken || req.query?.accessToken;
    const token = bearerToken || fallbackToken;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
