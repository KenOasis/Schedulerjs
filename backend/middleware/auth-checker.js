const jwt = require("jsonwebtoken");
const ValidationError = require("../error/validation-error");

exports.admin = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // the first element is "Bearer TOKEN"
    if (req.headers.authorization === undefined) {
      throw new ValidationError("Authorization Failed", 401);
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new ValidationError("Authorization Failed", 401);
    }
    let decodedToken;
    jwt.verify(token, "5ecret_5equ@nce_4jwt", (err, decoded) => {
      if (err) {
        throw new ValidationError(err.message, 401);
      } else {
        decodedToken = decoded;
      }
    });
    req.userData = {
      company_id: decodedToken.company_id,
      email: decodedToken.email,
    };
    return next();
  } catch (error) {
    next(error);
  }
};

exports.employee = (req, res, next) => {
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
      employee_id: decodedToken.employee_id,
      username: decodedToken.username,
    };
    return next();
  } catch (error) {
    next(error);
  }
};
