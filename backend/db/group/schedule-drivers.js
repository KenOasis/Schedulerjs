const LogicalError = require("../../error/logical-error");
const { employee } = require("../../middleware/auth-checker");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Role_Actions = db["Role_Actions"];
const Actions = db["Actions"];
const Groups = db["Groups"];
const Companies = db["Companies"];
const Off_Types = db["Off_Types"];
const Schedules = db["Schedules"];

exports.getScheduleByEmployee = async (employee_id, year, month, day) => {
  try {
  } catch (error) {
    throw error;
  }
};
