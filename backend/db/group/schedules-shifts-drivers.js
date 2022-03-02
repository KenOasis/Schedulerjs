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
