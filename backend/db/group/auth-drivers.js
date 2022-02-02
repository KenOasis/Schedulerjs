const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const Companies = db["Companies"];
const Off_Types = db["Off_Types"];

exports.existingEmployee = async (username) => {
  try {
    const employee = await Employees.findOne({
      where: {
        username,
      },
    });

    if (username) {
      return employee;
    }
  } catch (error) {
    throw error;
  }
};

exports.isEmployeeActivated = async (employee_id) => {
  try {
    const employee = await Employees.findByPk(employee_id);
    if (employee) {
      return employee.activated;
    } else {
      throw new LogicalError(
        `Employee id : ${employee_id} is not existed.`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};
