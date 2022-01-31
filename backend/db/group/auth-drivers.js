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
