const LogicalError = require("../../error/logical-error");
const { employee } = require("../../middleware/auth-checker");
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