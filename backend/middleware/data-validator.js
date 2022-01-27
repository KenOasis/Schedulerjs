const { check, validationResult } = require("express-validator");

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$/;

exports.companySignupValidator = async (req, res, next) => {
  await check("name")
    .notEmpty()
    .withMessage("The company name cannot be empty.")
    .bail()
    .isLength({ min: 3, max: 64 })
    .bail()
    .withMessage("The company name must have length between 3 and 64")
    .run(req);

  await check("address")
    .notEmpty()
    .withMessage("The comapny address cannot be empty")
    .bail()
    .isLength({ min: 6, max: 256 })
    .withMessage("The company address is between 6 to 256 characters long.")
    .run(req);

  await check("email")
    .notEmpty()
    .withMessage("The email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .run(req);

  await check("phone")
    .notEmpty()
    .withMessage("Phone number cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Phone number must be numeric number")
    .bail()
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must have the legnth 11")
    .run(req);

  await check("password")
    .matches(passwordRegex)
    .withMessage(
      "Must be length >= 8, contain number, letter and special character and max length as 24"
    )
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password_confirmation) {
        throw new Error("Password confirmation is not match with password");
      }
      return true;
    })
    .run(req);

  let results = validationResult(req);
  if (!results.isEmpty()) {
    return res
      .status(400)
      .json({ status: "invalid data", errors: results.array() });
  } else {
    next();
  }
};

exports.companyUpdateValidator = async (req, res, next) => {
  await check("name")
    .notEmpty()
    .withMessage("The company name cannot be empty")
    .bail()
    .isLength({ min: 3, max: 64 })
    .withMessage("The company name must have length between 3 and 64")
    .run(req);

  await check("address")
    .notEmpty()
    .withMessage("The company address cannot be empty")
    .bail()
    .isLength({ min: 6, max: 256 })
    .withMessage("The company address is between 6 to 256 characters long.")
    .run(req);

  await check("phone")
    .notEmpty()
    .withMessage("Phone number cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Phone number must be numeric number")
    .bail()
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must have the legnth 11")
    .run(req);

  let results = validationResult(req);
  if (!results.isEmpty()) {
    return res
      .status(400)
      .json({ status: "invalid data", errors: results.array() });
  } else {
    next();
  }
};

exports.paramsValidator = (req, res, next) => {
  for (key of Object.values(req.params)) {
    let numericKey = +key;
    if (isNaN(numericKey)) {
      return res.status(400).json({ status: "invalid params" });
    }
  }
  next();
};
