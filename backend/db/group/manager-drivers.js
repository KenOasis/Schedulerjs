const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Role_Actions = db["Role_Actions"];
const Actions = db["Actions"];
const Groups = db["Groups"];
const Companies = db["Companies"];
const Off_Types = db["Off_Types"];
const Schedules = db["Schedules"];
const Available_Time = db["Available_Time"];
const { Op } = require("sequelize");
const Off_Records = db["Off_Records"];

const employeeDrivers = require("./employee-drivers");
const off_records = require("../../models/off_records");
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
            group_id: employee.group_id,
          },
          attributes: [],
          required: true,
        },
      },
    });

    // this may never run
    if (!employees || employees.length === 0) {
      throw new LogicalError("DB error", 500);
    }

    return employees.map((employee) => {
      return {
        employee_id: employee.employee_id,
        firstname: employee.firstname,
        lastname: employee.lastname,
        title: employee.title,
        abbreviation: employee.abbreviation,
      };
    });
  } catch (error) {
    throw error;
  }
};

exports.getAvailableTimeByGroup = async (employee_id, year, month, day) => {
  try {
    let employees = await this.getEmployeesOfGroup(employee_id);
    for await (employee of employees) {
      let available_time = await employeeDrivers.getAvailableTime(
        employee.employee_id,
        year,
        month,
        day
      );
      employee.available = available_time;
    }
    return employees;
  } catch (error) {
    throw error;
  }
};

exports.getOffRecordOfGroup = async (employee_id) => {
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
            group_id: employee.group_id,
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
