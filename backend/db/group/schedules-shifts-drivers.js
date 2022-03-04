const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Schedules = db["Schedules"];
const Shifts = db["Shifts"];
const Off_Records = db["Off_Records"];
const employeeDrivers = require("./employee-drivers");
const { Op } = require("sequelize");

exports.createSchedule = async (group_id, schedule_date, shifts) => {
  try {
    const existed_schedule = await Schedules.findOne({
      where: {
        schedule_date,
      },
    });

    if (existed_schedule) {
      return 0;
    }
    const new_schedule = await Schedules.create({
      group_id,
      schedule_date,
    });

    if (new_schedule) {
      for await (shift of shifts) {
        await Shifts.create({
          schedule_id: new_schedule.schedule_id,
          employee_id: shift.employee_id,
          starts_at: shift.starts_at,
          ends_at: shift.ends_at,
        });
      }

      return new_schedule.schedule_id;
    }
  } catch (error) {
    throw error;
  }
};

exports.updateSchedule = async (schedule_id, shifts) => {
  try {
    const schedule = await Schedules.findByPk(schedule_id);
    if (!schedule) {
      throw new LogicalError(
        `Schedule with schedule id ${schedule_id} is not existed`,
        404
      );
    }

    if (!shifts.length) {
      await schedule.destroy();
      return true;
    }

    const current_shifts = await Shifts.findAll({
      where: {
        schedule_id: schedule.schedule_id,
      },
    });

    for await (shift of current_shifts) {
      let index = shifts.findIndex((s) => s.employee_id === shift.employee_id);
      if (index > -1) {
        let new_shift = shifts[index];
        shift.starts_at = new_shift.starts_at;
        shift.ends_at = new_shift.ends_at;
        await shift.save();
        shifts.splice(index, 1);
      } else {
        await shift.destroy();
      }
    }

    for await (shift of shifts) {
      await Shifts.create({
        schedule_id,
        ...shift,
      });
    }
    return true;
  } catch (error) {
    throw error;
  }
};

exports.getSchedule = async (employee_id, group_id, year, month, day) => {
  const schedules = [];
  try {
    if (day) {
      const dateObj = new Date(year, month - 1, day);
      // Check wheter the day is the legal day of the month in the year
      if (month !== dateObj.getMonth() + 1) {
        return schedules;
      }
      const employees = await employeeDrivers.getEmployeesOfGroup(group_id);
      for await (employee of employees) {
        let schedule = await Schedules.findAll({
          raw: true,
          where: {
            group_id,
            schedule_date: dateObj,
          },
          attributes: [
            "schedule_id",
            "schedule_date",
            "shift.starts_at",
            "shift.ends_at",
          ],
          include: {
            model: Shifts,
            as: "shift",
            attributes: [],
            where: {
              employee_id: employee.employee_id,
            },
            required: true,
          },
        });
        let dayoff = await Off_Records.findAll({
          where: {
            [Op.and]: [
              {
                employee_id: employee_id,
              },
              {
                starts_at: {
                  [Op.lte]: dateObj,
                },
              },
              {
                ends_at: {
                  [Op.gte]: dateObj,
                },
              },
            ],
          },
        });
        let tempObj = {
          employee_id: employee.employee_id,
          firstname: employee.firstname,
          lastname: employee.lastname,
          scheduled: false,
          dayoff: true,
        };
        if (schedule.length) {
          tempObj.scheduled = true;
          (tempObj.starts_at = schedule[0].starts_at),
            (tempObj.ends_at = schedule[0].ends_at);
        } else if (dayoff.length) {
          tempObj.dayoff = true;
        }
        schedules.push(tempObj);
      }
    } else {
      const employee = await employeeDrivers.getEmployeeInfo(employee_id);
      const month_end = new Date(year, month, 0);
      const days = [];
      for (let i = 1; i <= month_end.getDate(); ++i) {
        days.push(i);
      }
      for await (day of days) {
        let dateObj = new Date(year, month - 1, day);
        let schedule = await Schedules.findAll({
          where: {
            group_id,
            schedule_date: dateObj,
          },
          attributes: [
            "schedule_id",
            "schedule_date",
            "shift.starts_at",
            "shift.ends_at",
          ],
          include: {
            model: Shifts,
            as: "shift",
            attributes: [],
            where: {
              employee_id,
            },
            required: true,
          },
        });
        let dayoff = await Off_Records.findAll({
          where: {
            [Op.and]: [
              {
                employee_id: employee_id,
              },
              {
                starts_at: {
                  [Op.lte]: dateObj,
                },
              },
              {
                ends_at: {
                  [Op.gte]: dateObj,
                },
              },
            ],
          },
        });
        const tempObj = {
          employee_id: employee_id,
          firstname: employee.firstname,
          lastname: employee.lastname,
          year: year,
          month: month,
          day: day,
          dayoff: false,
          scheduled: false,
        };
        if (schedule.length) {
          tempObj.starts_at = schedule[0].starts_at;
          tempObj.ends_at = schedule[0].ends_at;
          tempObj.scheduled = true;
        } else if (dayoff.length) {
          tempObj.dayoff = true;
        }
        schedules.push(tempObj);
      }
    }
    return schedules;
  } catch (error) {
    throw error;
  }
};
