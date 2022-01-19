const jwt = require("jsonwebtoken");
const ValidationError = require("../error/validation-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // the first element is "Bearer TOKEN"
    if (req.headers.authorization === null) {
      throw new ValidationError("Authorization Failed", 401);
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new ValidationError("Authorization Failed", 401);
    }
    const decodedToken = jwt.verify(token, "5ecret_5equ@nce_4jwt");
    req.userData = {
      company_id: decodedToken.company_id,
      email: decodedToken.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};
