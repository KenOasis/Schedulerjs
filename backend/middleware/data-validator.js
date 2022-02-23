const { check, param, validationResult } = require("express-validator");

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$/;

const employeeUsernameRegex = /^[A-Za-z]+(?:[A-Za-z0-9]+)*$/;

// YYYY-MM-DD
const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

// HH:MM:SS
const timeRegex = /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/;

const notNullMessage = "cannot be empty(include null or undefined)";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Data Validator for the admin/company routes
exports.adminCompanyValidator = async (req, res, next) => {
  await check("name")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isLength({ min: 3, max: 64 })
    .bail()
    .withMessage("must have length between 3 and 64.")
    .run(req);

  await check("address")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isLength({ min: 6, max: 256 })
    .withMessage("must has length between 6 to 256.")
    .run(req);

  await check("phone")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isMobilePhone(["en-US"])
    .withMessage("is not a valid phone number")
    .run(req);

  // If method === "POST", it is signup route, otherwise it is update route
  if (req.method === "POST") {
    await check("email")
      .notEmpty()
      .withMessage(notNullMessage)
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
    .withMessage(notNullMessage)
    .bail()
    .isLength({ min: 3, max: 64 })
    .withMessage("must have length between 3 to 64.")
    .run(req);

  await check("description")
    .notEmpty()
    .withMessage(notNullMessage)
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

// Data Validator for the admin/role create/update routes
exports.adminRoleValidator = async (req, res, next) => {
  if (req.method === "POST") {
    await check("group_id")
      .notEmpty()
      .withMessage(notNullMessage)
      .bail()
      .isInt({ min: 1 })
      .withMessage("must be an integer >= 1")
      .run(req);
  }
  await check("title")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isLength({ min: 3, max: 64 })
    .withMessage("must have the length between 3 and 64.")
    .run(req);

  await check("abbreviation")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isLength({ min: 2, max: 8 })
    .withMessage("must have length between 2 to 8")
    .run(req);

  await check("priority")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isInt({ min: 1 })
    .withMessage("must be an integer greater than 0")
    .run(req);

  await check("description")
    .notEmpty()
    .withMessage(notNullMessage)
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

// Data Validator for the admin/employee create/update routes
exports.adminEmployeeValidator = async (req, res, next) => {
  if (req.method === "POST") {
    await check("username")
      .notEmpty()
      .withMessage(notNullMessage)
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
      .withMessage(notNullMessage)
      .matches(/^[0-9]{4}$/)
      .withMessage("must be a 4 digits number.")
      .run(req);
  }

  await check("role_id")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isInt({ min: 1 })
    .withMessage("must be an interger greater than 0")
    .run(req);

  await check("firstname")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isLength({ min: 1, max: 32 })
    .withMessage("must have length between 1 to 32.")
    .run(req);

  await check("lastname")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isLength({ min: 1, max: 32 })
    .withMessage("must have length between 1 to 32.")
    .run(req);

  await check("emergency_contact")
    .notEmpty()
    .withMessage(notNullMessage)
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

// Data Validator for the admin/employee/set_sp route
exports.adminEmployeeSetSafetyPinValidator = async (req, res, next) => {
  await check("safety_pin")
    .notEmpty()
    .withMessage(notNullMessage)
    .matches(/^[0-9]{4}$/)
    .withMessage("must be a 4 digits number.")
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
// Data Validator of admin/off routes
exports.offTypeValidator = async (req, res, next) => {
  await check("name")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isLength({ min: 3, max: 64 })
    .withMessage("must have length between 3 to 64")
    .run(req);

  await check("description")
    .notEmpty()
    .withMessage(notNullMessage)
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

// Data validator for admin/login routes
exports.adminLoginValidator = async (req, res, next) => {
  await check("email").notEmpty().withMessage(notNullMessage).run(req);

  await check("password").notEmpty().withMessage(notNullMessage).run(req);

  let results = validationResult(req);
  if (!results.isEmpty()) {
    return res
      .status(400)
      .json({ status: "invalid data", errors: results.array() });
  } else {
    next();
  }
};

// Data validator for group/login routes
exports.employeeLoginValidator = async (req, res, next) => {
  await check("username").notEmpty().withMessage(notNullMessage).run(req);

  await check("password").notEmpty().withMessage(notNullMessage).run(req);

  let results = validationResult(req);
  if (!results.isEmpty()) {
    return res
      .status(400)
      .json({ status: "invalid data", errors: results.array() });
  } else {
    next();
  }
};

// Data validator for group/emergency_contact routes
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

// Data validator for group/change_pw routes
exports.employeePasswordValidator = async (req, res, next) => {
  await check("password").notEmpty().withMessage(notNullMessage).run(req);

  await check("new_password")
    .matches(passwordRegex)
    .withMessage(
      "must have length between 8 to 24, and contains number, letter and special character."
    )
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

// Data validator for /group/available  POST
exports.employeeSetAvailableValidator = async (req, res, next) => {
  await check("effected_start")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .matches(dateRegex)
    .withMessage("date format should be YYYY-MM-DD.")
    .run(req);

  await check("effected_end")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .matches(dateRegex)
    .withMessage("date format should be YYYY-MM-DD")
    .run(req);

  await check("available")
    .isArray({ max: 7 })
    .withMessage(
      "wrong parameter type, should be an array not longer than 7 days"
    )
    .custom((value, { req }) => {
      value.forEach((available) => {
        let starts_at = new Date(
          req.body.effected_start + " " + available.starts_at
        );
        let ends_at = new Date(
          req.body.effected_start + " " + available.ends_at
        );
        if (starts_at >= ends_at) {
          throw new Error(
            `For ${available.day}, starts_at cannot greater or equal than ends_at time`
          );
        }
      });
      return true;
    })
    .run(req);

  await check("available.*.day")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .custom((value, { req }) => {
      if (!days.includes(value)) {
        throw new Error("type error.");
      }
      return true;
    })
    .run(req);

  await check("available.*.starts_at")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .matches(timeRegex)
    .withMessage("time format should be HH:MM:SS")
    .run(req);

  await check("available.*.ends_at")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .matches(timeRegex)
    .withMessage("time format should be HH:MM:SS")
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

exports.createOffRecordsValidator = async (req, res, next) => {
  await check("off_id")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isInt()
    .withMessage("invalid type")
    .run(req);

  await check("starts_at")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .matches(dateRegex)
    .withMessage("invalid date format.")
    .run(req);

  await check("ends_at")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .matches(dateRegex)
    .withMessage("invalid date format.")
    .custom((value, { req }) => {
      let starts_at = new Date(req.body.starts_at);
      let ends_at = new Date(value);
      if (starts_at > ends_at) {
        throw new Error("starts_at cannot greater than ends at.");
      }
      return true;
    })
    .run(req);

  await check("reason")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isLength({ min: 3, max: 256 })
    .withMessage("must be the string with length between 3 to 256.")
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

exports.recordedPunchTimeValidator = async (req, res, next) => {
  await check("recorded_date")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .matches(dateRegex)
    .withMessage("date format should be YYYY-MM-DD")
    .run(req);

  await check("recorded_time")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .matches(timeRegex)
    .withMessage("time format should be HH:MM:SS")
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

// Parameters validator: All parameter must be numeric int
exports.paramsValidator = async (req, res, next) => {
  await param("*")
    .notEmpty()
    .withMessage(notNullMessage)
    .bail()
    .isInt()
    .withMessage("Invalid params")
    .run(req);

  let results = validationResult(req);
  if (!results.isEmpty()) {
    return res
      .status(400)
      .json({ status: "invalid params", errors: results.array() });
  } else {
    next();
  }
};

exports.body;
