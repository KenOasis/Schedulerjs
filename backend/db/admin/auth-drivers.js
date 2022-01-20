const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const Companies = db["Companies"];
Groups.belongsTo(Companies, { as: "company", foreignKey: "company_id" });
Roles.belongsTo(Groups, { as: "group", foreignKey: "group_id" });
Employees.belongsTo(Roles, { as: "role", foreignKey: "role_id" });

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
