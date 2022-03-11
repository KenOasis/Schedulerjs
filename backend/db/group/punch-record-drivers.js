const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Punch_Records = db["Punch_Records"];

exports.createPunch = async (employee_id, recorded_date, recorded_time) => {
  try {
    const punch_record = await Punch_Records.create({
      employee_id,
      recorded_date,
      recorded_time,
    });

    if (punch_record) {
      return {
        employee_id: punch_record.employee_id,
        recorded_date: punch_record.recorded_date,
        recorded_time: punch_record.recorded_time,
      };
    }
  } catch (error) {
    throw error;
  }
};
exports.getPunchRecordsByDate = async (employee_id, year, month, day) => {
  const days_of_week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const punch_records = [];
  try {
    if (day) {
      const dateObj = new Date(year, month - 1, day);
      // Check wheter the day is the legal day of the month in the year
      if (month !== dateObj.getMonth() + 1) {
        return punch_records;
      }

      const day_of_week = days_of_week[dateObj.getDay()];
      const records = await Punch_Records.findAll({
        where: {
          recorded_date: dateObj,
        },
      });
      const tempObj = {
        year: year,
        month: month,
        day: day,
        day_of_week: day_of_week,
        recorded_time: [],
      };
      records.forEach((record) => {
        tempObj.recorded_time.push({
          recorded_time: record.recorded_time,
          is_modified: record.modified_by === null ? false : true,
        });
      });
      punch_records.push(tempObj);
      return punch_records;
    } else {
      const month_end = new Date(year, month, 0);
      const days = [];
      for (let i = 1; i <= month_end.getDate(); ++i) {
        days.push(i);
      }
      for await (day of days) {
        const dateObj = new Date(year, month - 1, day);
        const day_of_week = days_of_week[dateObj.getDay()];
        const records = await Punch_Records.findAll({
          where: {
            recorded_date: dateObj,
          },
        });
        if (records.length) {
          const tempObj = {
            year: year,
            month: month,
            day: day,
            day_of_week: day_of_week,
            recorded_time: [],
          };
          records.forEach((record) => {
            tempObj.recorded_time.push({
              recorded_time: record.recorded_time,
              is_modified: record.modified_by === null ? false : true,
            });
          });
          punch_records.push(tempObj);
        }
      }
      return punch_records;
    }
  } catch (error) {
    throw error;
  }
};
