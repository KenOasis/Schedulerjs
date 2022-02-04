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
    const employee = await Employees.findOne({
      raw: true,
      attributes: [
        "employee_id",
        "role.role_id",
        "role->role_action->action.action_id",
        "role->role_action->action.key",
      ],
      where: {
        employee_id,
      },
      include: {
        model: Roles,
        as: "role",
        attributes: [],
        required: true,
        include: {
          model: Role_Actions,
          as: "role_action",
          attributes: [],
          required: true,
          include: {
            model: Actions,
            as: "action",
            attributes: [],
            where: {
              key: action_key,
            },
            required: true,
          },
        },
      },
    });
    console.log(employee);
    if (employee) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};
