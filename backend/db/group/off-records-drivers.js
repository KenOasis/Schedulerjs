const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const { Op } = require("sequelize");
const Off_Records = db["Off_Records"];

const employeeDrivers = require("./employee-drivers");
const off_records = require("../../models/off_records");

exports.getOffRecordOfGroup = async (group_id) => {
  try {
    const employees = await Employees.findAll({
      raw: true,
      attributes: [
        "employee_id",
        "firstname",
        "lastname",
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

    const off_records = [];
    for await (emp of employees) {
      const records = await Off_Records.findAll({
        raw: true,
        where: {
          employee_id: emp.employee_id,
        },
      });
      if (records.length) {
        records.forEach((record) => {
          off_records.push({
            employee_id: emp.employee_id,
            firstname: emp.firstname,
            lastname: emp.lastname,
            off_record_id: record.off_record_id,
            approved: record.approved,
          });
        });
      }
    }
    return off_records;
  } catch (error) {
    throw error;
  }
};

exports.getOffRecordById = async (off_record_id) => {
  try {
    const off_record = await Off_Records.findOne({
      raw: true,
      where: {
        off_record_id,
      },
    });

    if (off_record) {
      return {
        ...off_record,
      };
    } else {
      throw new LogicalError(
        `Off Record with id ${off_record_id} is not existed`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};
