const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const Companies = db["Companies"];
const Off_Types = db["Off_Types"];

exports.getEmployeeInfo = async (employee_id) => {
  try {
    const employee = await Employees.findByPk(employee_id);
    if (employee) {
      const role = await Roles.findByPk(employee.role_id);
      return {
        username: employee.username,
        firstname: employee.firstname,
        lastname: employee.lastname,
        title: role.title,
        emergency_contact: employee.emergency_contact,
      };
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

exports.getEmployeesOfGroup = async (employee_id) => {
  try {
    const employee = await Employees.findOne({
      raw: true,
      attributes: ["employee_id", "role.group_id"],
      where: {
        employee_id,
      },
      include: {
        model: Roles,
        as: "role",
        attributes: [],
        required: true,
      },
    });

    if (!employee) {
      throw new LogicalError(
        `Employee id: ${employee_id} is not existed.`,
        404
      );
    }

    const employees = await Employees.findAll({
      raw: true,
      attributes: [
        "employee_id",
        "firstname",
        "lastname",
        "role.title",
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
            group_id: employee.group_id,
          },
          attributes: [],
          required: true,
        },
      },
    });

    if (!employees || employees.length === 0) {
      throw new LogicalError("DB error", 500);
    }

    return employees.map((employee) => {
      return {
        employee_id: employee.employee_id,
        firstname: employee.firstname,
        lastname: employee.lastname,
        title: employee.title,
      };
    });
  } catch (error) {
    throw error;
  }
};
