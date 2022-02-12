const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const Companies = db["Companies"];
const Off_Types = db["Off_Types"];
const Available_Time = db["Available_Time"];
const { Op } = require("sequelize");
const Off_Records = db["Off_Records"];

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

exports.createOffRecord = async (
  employee_id,
  requested_at,
  off_id,
  starts_at,
  ends_at,
  reason
) => {
  try {
    const confilict_records = await Off_Records.findOne({
      where: {
        [Op.or]: [
          {
            starts_at: {
              [Op.between]: [starts_at, ends_at],
            },
          },
          {
            ends_at: {
              [Op.between]: [starts_at, ends_at],
            },
          },
        ],
      },
    });
    console.log(confilict_records);
    if (confilict_records) {
      return false;
    }
    const off_record = await Off_Records.create({
      employee_id,
      requested_at,
      off_id,
      starts_at,
      ends_at,
      reason,
    });
    if (off_record) {
      return {
        off_record_id: off_record.off_record_id,
        employee_id: off_record.employee_id,
        off_id: off_record.off_id,
        starts_at: off_record.starts_at,
        ends_at: off_record.ends_at,
        reason: off_record.reason,
        approved: off_record.approved,
        approved_by: off_record.approved_by,
        comment: off_record.comment,
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.getOffRecord = async (employee_id) => {
  try {
    const off_records = await Off_Records.findAll({
      raw: true,
      where: {
        employee_id,
      },
    });

    return off_records.map((record) => {
      return {
        ...record,
      };
    });
  } catch (error) {
    throw error;
  }
};

exports.reviewOffRecord = async (off_record_id, approved, approved_by) => {
  try {
  } catch (error) {
    throw error;
  }
};
