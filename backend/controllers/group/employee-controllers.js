const bcrypt = require("bcryptjs");
const ValidationError = require("../../error/validation-error");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const authDrivers = require("../../db/group/auth-drivers");
const employeeDrivers = require("../../db/group/employee-drivers");
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const existing_employee = await authDrivers.existingEmployee(username);

    if (existing_employee === null) {
      throw new ValidationError(`Username: ${username} is not existed`, 401);
    }

    const is_password_matched = bcrypt.compareSync(
      password,
      existing_employee.password
    );

    if (is_password_matched) {
      const token = jwt.sign(
        {
          employee_id: existing_employee.employee_id,
          username: username,
        },
        "5ecret_5equ@nce_4jwt",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ status: "success", token: token });
    } else {
      throw new ValidationError(
        `Wrong password, attempted with username: ${username}`,
        401
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeInfo = async (req, res, next) => {
  const employee_id = req.userData.employee_id;
  try {
    const employee = await employeeDrivers.getEmployeeInfo(employee_id);

    if (employee) {
      return res.status(400).json({ status: "success", employee: employee });
    }
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  const { password, new_password } = req.body;
  const username = req.userData.username;

  try {
    const existing_employee = await authDrivers.existingEmployee(username);
    if (existing_employee) {
      const is_password_matched = bcrypt.compareSync(
        password,
        existing_employee.password
      );
      if (is_password_matched) {
        existing_employee.password = bcrypt.hashSync(new_password, salt);
        await existing_employee.save();
        return res.status(200).json({ status: "success" });
      } else {
        throw new ValidationError(
          `Wrong password, attempted with username ${username}`,
          401
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.updateEmergencyContact = async (req, res, next) => {
  const { emergency_contact } = req.body;
  const employee_id = req.userData.employee_id;
  try {
    const is_updated_success = await employeeDrivers.updateEmergencyContact(
      employee_id,
      emergency_contact
    );

    if (is_updated_success) {
      res.status(200).json({ status: "success" });
    }
  } catch (error) {
    next(error);
  }
};

exports.getEmployees = async (req, res, next) => {
  const employee_id = req.userData.employee_id;
  try {
    const employees = await employeeDrivers.getEmployeesOfGroup(employee_id);
    if (employees) {
      return res.status(200).json({ status: "success", employees: employees });
    }
  } catch (error) {
    next(error);
  }
};
