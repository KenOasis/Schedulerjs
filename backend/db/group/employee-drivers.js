const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const Companies = db["Companies"];
const Off_Types = db["Off_Types"];
const { Op } = require("sequelize");
const Off_Records = db["Off_Records"];

exports.getEmployeeInfo = async (employee_id, mode = 0) => {
  try {
    const employee = await Employees.findByPk(employee_id);
    if (employee) {
      const role = await Roles.findByPk(employee.role_id);
      if (mode === 0) {
        return {
          username: employee.username,
          firstname: employee.firstname,
          lastname: employee.lastname,
          title: role.title,
          activated: employee.activated,
        };
      } else {
        return {
          username: employee.username,
          firstname: employee.firstname,
          lastname: employee.lastname,
          emergency_contact: employee.emergency_contact,
          title: role.title,
          emergency_contact: employee.emergency_contact,
          activated: employee.activated,
        };
      }
    }
  } catch (error) {
    throw error;
  }
};

exports.updateEmergencyContact = async (employee_id, emergency_contact) => {
  try {
    const employee = await Employees.findByPk(employee_id);

    if (employee) {
      if (employee.emergency_contact !== emergency_contact) {
        employee.emergency_contact = emergency_contact;
        await employee.save();
      }
      return true;
    } else {
      throw new LogicalError(
        `Employee id: ${employee_id} is not existed.`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.getEmployeesOfGroup = async (group_id) => {
  try {
    const employees = await Employees.findAll({
      raw: true,
      attributes: [
        "employee_id",
        "firstname",
        "lastname",
        "activated",
        "role.title",
        "role.abbreviation",
        "role.group_id",
      ],
      include: {
        model: Roles,
        as: "role",
        attributes: [],
        required: true,
        include: {
          model: Groups,
          as: "group",
          where: {
            group_id: group_id,
          },
          attributes: [],
          required: true,
        },
      },
    });

    return employees.map((employee) => {
      return {
        employee_id: employee.employee_id,
        firstname: employee.firstname,
        lastname: employee.lastname,
        activated: employee.activated,
        title: employee.title,
        abbreviation: employee.abbreviation,
      };
    });
  } catch (error) {
    throw error;
  }
};
