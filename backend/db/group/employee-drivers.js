const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const Companies = db["Companies"];
const Off_Types = db["Off_Types"];
const Available_Time = db["Available_Time"];
const { Op } = require("sequelize");
const e = require("express");
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

exports.setAvailableTime = async (
  employee_id,
  effected_start,
  effected_end,
  available
) => {
  const available_time = [];
  try {
    for await (day of available) {
      console.log(day.starts_at);
      const time = await Available_Time.create({
        employee_id,
        day: day.day,
        effected_start,
        effected_end,
        starts_at: day.starts_at,
        ends_at: day.ends_at,
      });
      if (time) {
        available_time.push(time);
      }
    }
    if (available_time.length === available.length) {
      return true;
    }
  } catch (error) {
    throw error;
  }
};

exports.getAvailableTime = async (employee_id, year, month, day) => {
  const days_of_week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const available_time = [];
  try {
    if (day) {
      const dateObj = new Date(year, month - 1, day);
      const day_of_week = days_of_week[dateObj.getDay()];
      let time = await Available_Time.findAll({
        where: {
          employee_id: employee_id,
          day: day_of_week,
          effected_start: {
            [Op.lte]: dateObj,
          },
          effected_end: {
            [Op.gte]: dateObj,
          },
        },
        order: [["created_at", "DESC"]],
        limit: 1,
      });
      if (time.length) {
        available_time.push({
          year: year,
          month: month,
          day: day,
          day_of_week: day_of_week,
          starts_at: time[0].starts_at,
          ends_at: time[0].ends_at,
        });
      }
      return available_time;
    } else {
      const month_end = new Date(year, month, 0);
      const days = [];
      for (let i = 1; i <= month_end.getDate(); ++i) {
        days.push(i);
      }
      for await (day of days) {
        const dateObj = new Date(year, month - 1, day);
        const day_of_week = days_of_week[dateObj.getDay()];
        let time = await Available_Time.findAll({
          where: {
            employee_id: employee_id,
            day: day_of_week,
            effected_start: {
              [Op.lte]: dateObj,
            },
            effected_end: {
              [Op.gte]: dateObj,
            },
          },
          order: [["created_at", "DESC"]],
          limit: 1,
        });
        if (time.length) {
          available_time.push({
            year: year,
            month: month,
            day: day,
            day_of_week: day_of_week,
            starts_at: time[0].starts_at,
            ends_at: time[0].ends_at,
          });
        }
      }
      return available_time;
    }
  } catch (error) {
    throw error;
  }
};
