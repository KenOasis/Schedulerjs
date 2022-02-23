const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Available_Time = db["Available_Time"];
const { Op } = require("sequelize");

const employeeDrivers = require("./employee-drivers");

exports.setAvailableTime = async (
  employee_id,
  effected_start,
  effected_end,
  available
) => {
  const available_time = [];
  try {
    for await (day of available) {
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
      // Check wheter the day is the legal day of the month in the year
      if (month !== dateObj.getMonth() + 1) {
        return available_time;
      }
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

exports.getAvailableTimeByGroup = async (group_id, year, month, day) => {
  try {
    let employees = await employeeDrivers.getEmployeesOfGroup(group_id);
    for await (employee of employees) {
      let available_time = await this.getAvailableTime(
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
