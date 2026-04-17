const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Role '${req.user.role}' is not authorized to access this resource`,
      });
    }

    next();
  };
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

// Check if user is teacher
const isTeacher = (req, res, next) => {
  if (req.user && req.user.role === "teacher") {
    next();
  } else {
    res.status(403).json({ message: "Teacher access required" });
  }
};

// Check if user is student
const isStudent = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    res.status(403).json({ message: "Student access required" });
  }
};

// Check if user owns the resource (e.g., student accessing own data)
const checkOwnership = (getResourceUserId) => {
  return async (req, res, next) => {
    try {
      const resourceUserId = await getResourceUserId(req);
      
      if (req.user.role === "admin") {
        return next();
      }
      
      if (req.user._id.toString() === resourceUserId.toString()) {
        return next();
      }
      
      res.status(403).json({ message: "You can only access your own data" });
    } catch (error) {
      res.status(500).json({ message: "Error checking ownership" });
    }
  };
};

module.exports = { authorize, isAdmin, isTeacher, isStudent, checkOwnership };