const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const Companies = db["Companies"];
const Off_Types = db["Off_Types"];
const Role_Actions = db["Role_Actions"];
const Actions = db["Actions"];
require("../association");

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

exports.checkEmployeeAction = async (employee_id, action_key) => {
  try {
    const employee = await Employees.findByPk(employee_id);
    const action = await Actions.findOne({
      where: {
        key: action_key,
      },
    });
    if (employee && action) {
      const role_action = await Role_Actions.findOne({
        where: {
          role_id: employee.role_id,
          action_id: action.action_id,
        },
      });
      if (role_action) {
        return true;
      }
    }
    return false;
    return false;
  } catch (error) {
    throw error;
  }
};
