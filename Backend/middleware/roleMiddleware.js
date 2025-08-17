// middleware/roleMiddleware.js

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ msg: `Access denied: ${requiredRole} only` });
    }
    next();
  };
};

module.exports = checkRole;
