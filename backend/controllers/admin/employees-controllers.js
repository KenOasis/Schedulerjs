const employeeDrivers = require("../../db/admin/employee-drivers");

exports.getEmployeeByGroup = async (req, res, next) => {
  const group_id = +req.params.group_id;
  try {
    const employees = await employeeDrivers.getEmployeesByGroup(group_id);
    if (employees) {
      return res.status(200).json({ status: "success", employees: employees });
    }
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  const employee_id = +req.params.employee_id;
  try {
    const employee = await employeeDrivers.getEmployeeById(employee_id);

    if (employee) {
      return res.status(200).json({ status: "success", employee: employee });
    }
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  const { username, firstname, lastname, safety_pin, emergency_contact } =
    req.body;
  const role_id = +req.body.role_id;
  try {
    const isUsernameExisted = await employeeDrivers.existedEmployeeByUsername(
      username
    );
    if (!isUsernameExisted) {
      const new_employee = await employeeDrivers.createEmployee(
        role_id,
        username,
        firstname,
        lastname,
        emergency_contact,
        safety_pin
      );

      if (new_employee) {
        return res
          .status(200)
          .json({ status: "success", new_employee: new_employee });
      }
    } else {
      return res.status(409).json({
        status: "conflict",
        message: `Username: ${username} is already existed`,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  const { firstname, lastname, activated } = req.body;
  const role_id = +req.body.role_id;
  const employee_id = +req.params.employee_id;
  try {
    const isUpdatedSuccess = await employeeDrivers.updateEmployee(
      employee_id,
      firstname,
      lastname,
      role_id,
      activated
    );

    if (isUpdatedSuccess) {
      res.status(200).json({ status: "success" });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const employee_id = +req.params.employee_id;
  try {
    const reset_password = await employeeDrivers.resetPassword(employee_id);
    if (reset_password) {
      return res
        .status(200)
        .json({ status: "success", password: reset_password });
    }
  } catch (error) {
    next(error);
  }
};

exports.setSafetyPin = async (req, res, next) => {
  const employee_id = +req.params.employee_id;
  const { safety_pin } = req.body;
  try {
    const is_updated_success = await employeeDrivers.setSafetyPin(
      employee_id,
      safety_pin
    );
    if (is_updated_success) {
      return res.status(200).json({
        status: "success",
        message: `Employee with employee id ${employee_id} has set the new safety_pin as ${safety_pin}`,
      });
    }
  } catch (error) {
    next(error);
  }
};
