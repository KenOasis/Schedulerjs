const db = require("../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const Companies = db["Companies"];
const Off_Types = db["Off_Types"];
const Role_Actions = db["Role_Actions"];
const Actions = db["Actions"];
// Defined the associations of models

Groups.belongsTo(Companies, { as: "company", foreignKey: "company_id" });
Roles.belongsTo(Groups, { as: "group", foreignKey: "group_id" });
Employees.belongsTo(Roles, { as: "role", foreignKey: "role_id" });
Off_Types.belongsTo(Companies, { as: "company", foreignKey: "company_id" });
Role_Actions.hasMany(Actions, { as: "action", foreignKey: "action_id" });
Role_Actions.hasMany(Roles, { as: "role", foreignKey: "role_id" });
