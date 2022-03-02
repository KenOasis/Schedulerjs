const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Schedules = db["Schedules"];
const Shifts = db["Shifts"];

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
