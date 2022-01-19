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
  const { username, firstname, lastname, safty_pin } = req.body;
  const role_id = +req.body.role_id;
  try {
    const new_employee = await employeeDrivers.createEmployee(
      username,
      firstname,
      lastname,
      safty_pin,
      role_id
    );

    if (new_employee) {
      res.status(200).json({ status: "success", new_employee: new_employee });
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
  const safty_pin = +req.body.safty_pin;
  try {
    const reset_password = await employeeDrivers.resetPassword(
      safty_pin,
      employee_id
    );
    if (reset_password) {
      return res
        .status(200)
        .json({ status: "success", password: reset_password });
    }
  } catch (error) {
    next(error);
  }
};
