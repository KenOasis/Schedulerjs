const { check, validationResult, checkSchema } = require("express-validator");

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$/;

const employeeUsernameRegex = /^[A-Za-z]+(?:[A-Za-z0-9]+)*$/;

// Data Validator for the admin/company routes
exports.adminCompanyValidator = async (req, res, next) => {
  await check("name")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined).")
    .bail()
    .isLength({ min: 3, max: 64 })
    .bail()
    .withMessage("must have length between 3 and 64.")
    .run(req);

  await check("address")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined).")
    .bail()
    .isLength({ min: 6, max: 256 })
    .withMessage("must has length between 6 to 256.")
    .run(req);

  await check("phone")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined).")
    .bail()
    .isMobilePhone(["en-US"])
    .withMessage("is not a valid phone number")
    .run(req);

  // If method === "POST", it is signup route, otherwise it is update route
  if (req.method === "POST") {
    await check("email")
      .notEmpty()
      .withMessage("cannot be empty(include null or undefined).")
      .bail()
      .isEmail()
      .withMessage("is an invalid email address")
      .run(req);

    await check("password")
      .matches(passwordRegex)
      .withMessage(
        "must have length between 8 to 24, and contains number, letter and special character."
      )
      .bail()
      .custom((value, { req }) => {
        if (value !== req.body.password_confirmation) {
          throw new Error("is not match with password confirmation");
        }
        return true;
      })
      .run(req);
  }

  let results = validationResult(req);
  if (!results.isEmpty()) {
    return res
      .status(400)
      .json({ status: "invalid data", errors: results.array() });
  } else {
    next();
  }
};

// Data Validator for the admin/group routes
exports.adminGroupValidator = async (req, res, next) => {
  await check("name")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined)")
    .bail()
    .isLength({ min: 3, max: 64 })
    .withMessage("must have length between 3 to 64.")
    .run(req);

  await check("description")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined)")
    .bail()
    .isLength({ min: 1, max: 256 })
    .withMessage("cannot be longer than 256 characters.")
    .run(req);

  if (req.method === "PUT") {
    await check("activated")
      .isBoolean()
      .withMessage("must be boolean value")
      .run(req);
  }

  let results = validationResult(req);
  if (!results.isEmpty()) {
    return res
      .status(400)
      .json({ status: "invalid data", errors: results.array() });
  } else {
    next();
  }
};

// Data Validator for the admin/role routes
exports.adminRoleValidator = async (req, res, next) => {
  if (req.method === "POST") {
    await check("group_id")
      .notEmpty()
      .withMessage("cannot be empty(includ null or undefined).")
      .bail()
      .isInt({ min: 1 })
      .withMessage("must be an integer >= 1")
      .run(req);
  }
  await check("title")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined).")
    .bail()
    .isLength({ min: 3, max: 64 })
    .withMessage("must have the length between 3 and 64.")
    .run(req);

  await check("abbreviation")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined.")
    .bail()
    .isLength({ min: 2, max: 8 })
    .withMessage("must have length between 2 to 8")
    .run(req);

  await check("priority")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined")
    .bail()
    .isInt({ min: 1 })
    .withMessage("must be an integer greater than 0")
    .run(req);

  await check("description")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined")
    .bail()
    .isLength({ max: 256 })
    .withMessage("cannot be longer that 256 characters")
    .run(req);

  await check("actions").isArray().withMessage("must be an array").run(req);

  await check("actions.*")
    .isLength({ min: 2, max: 4 })
    .withMessage("actions.key must be a string has length between 2 to 4.")
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

// Data Validator for the admin/employee routes
exports.adminEmployeeValidator = async (req, res, next) => {
  if (req.method === "POST") {
    await check("username")
      .notEmpty()
      .withMessage("cannot be empty(include null or undefined).")
      .bail()
      .isLength({ min: 4, max: 16 })
      .withMessage("must be have length between 4 and 16")
      .bail()
      .matches(employeeUsernameRegex)
      .withMessage(
        "must be start with a character and contains character and digits only."
      )
      .run(req);

    await check("safety_pin")
      .notEmpty()
      .withMessage("cannot be empty(include null and undefined).")
      .matches(/^[0-9]{4}$/)
      .withMessage("must be a 4 digits number.")
      .run(req);
  }

  await check("role_id")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined).")
    .bail()
    .isInt({ min: 1 })
    .withMessage("must be an interger greater than 0")
    .run(req);

  await check("firstname")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined).")
    .bail()
    .isLength({ min: 1, max: 32 })
    .withMessage("must have length between 1 to 32.")
    .run(req);

  await check("lastname")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined).")
    .bail()
    .isLength({ min: 1, max: 32 })
    .withMessage("must have length between 1 to 32.")
    .run(req);

  await check("emergency_contact")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined).")
    .bail()
    .isMobilePhone(["en-US"])
    .withMessage("is not a valid phone number")
    .run(req);

  if (req.method === "PUT") {
    await check("activated")
      .isBoolean()
      .withMessage("must be boolean value")
      .run(req);
  }

  let results = validationResult(req);
  if (!results.isEmpty()) {
    return res
      .status(400)
      .json({ status: "invalid data", errors: results.array() });
  } else {
    next();
  }
};

// Data Validator of admin/off routes
exports.offTypeValidator = async (req, res, next) => {
  await check("name")
    .notEmpty()
    .withMessage("cannot be empty(include null and undefined).")
    .bail()
    .isLength({ min: 3, max: 64 })
    .withMessage("must have length between 3 to 64")
    .run(req);

  await check("description")
    .notEmpty()
    .withMessage("cannot be empty(include null and undefined).")
    .bail()
    .isLength({ max: 256 })
    .withMessage("cannot be longer that 256 characters.")
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

exports.adminLoginValidator = async (req, res, next) => {
  await check("email")
    .notEmpty()
    .withMessage("email cannot be empty(includes null or undefined)")
    .run(req);

  await check("password")
    .notEmpty()
    .withMessage("password cannot be empty(includes null or undefined)")
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

exports.employeeLoginValidator = async (req, res, next) => {
  await check("username")
    .notEmpty()
    .withMessage("username cannot be empty(includes null or undefined)")
    .run(req);

  await check("password")
    .notEmpty()
    .withMessage("password cannot be empty(includes null or undefined)")
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

exports.emergencyContactValidator = async (req, res, next) => {
  console.log(req.body);
  await check("emergency_contact")
    .notEmpty()
    .withMessage("cannot be empty(include null or undefined).")
    .bail()
    .isMobilePhone(["en-US"])
    .withMessage("is not a valid phone number")
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

// Parameters validator: All parameter must be numeric
exports.paramsValidator = (req, res, next) => {
  for (value of Object.values(req.params)) {
    let numericValue = +value;
    if (isNaN(numericValue)) {
      return res.status(400).json({ status: "invalid params" });
    }
  }
  next();
};

exports.body;
