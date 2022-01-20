const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const Companies = db["Companies"];
const Off_Types = db["Off_Types"];

Groups.belongsTo(Companies, { as: "company", foreignKey: "company_id" });
Roles.belongsTo(Groups, { as: "group", foreignKey: "group_id" });
Employees.belongsTo(Roles, { as: "role", foreignKey: "role_id" });
Off_Types.belongsTo(Companies, { as: "off", foreignKey: "company_id" });
exports.checkGroup = async (group_id, company_id) => {
  try {
    const group = await Groups.findByPk(group_id);
    if (group) {
      return group.company_id === company_id;
    } else {
      throw new LogicalError(
        `Group with group_id: ${group_id} is not existed`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.checkRole = async (role_id, company_id) => {
  try {
    const role = await Roles.findOne({
      raw: true,
      attributes: ["role_id", "group.company_id"],
      where: {
        role_id,
      },
      include: {
        model: Groups,
        as: "group",
        attributes: [],
        require: true,
      },
    });

    if (role) {
      return role.company_id === company_id;
    } else {
      throw new LogicalError(
        `Role with role_id: ${role_id} is not existed`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.checkEmployee = async (employee_id, company_id) => {
  try {
    const employee = await Employees.findOne({
      raw: true,
      attributes: ["employee_id", "role->group.company_id"],
      where: {
        employee_id,
      },
      include: {
        model: Roles,
        as: "role",
        attributes: [],
        required: true,
        include: {
          model: Groups,
          as: "group",
          attributes: [],
          required: true,
        },
      },
    });

    if (employee) {
      return employee.company_id === company_id;
    } else {
      throw new LogicalError(
        `Employee with employee_id: ${employee_id} is not existed`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.offChecker = async (off_id, company_id) => {
  try {
    const off = await Off_Types.findByPk(off_id);
    if (off) {
      return off.company_id === company_id;
    } else {
      throw new LogicalError(
        `Off type with off_id: ${off_id} is not existed.`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};
