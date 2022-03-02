const offRecordsDrivers = require("../../db/group/off-records-drivers");
const employeeDrivers = require("../../db/group/employee-drivers");
const availableTimeDrivers = require("../../db/group/available-time-drivers");
const schedulesShiftsDrivers = require("../../db/group/schedules-shifts-drivers");

exports.getEmployeesByGroup = async (req, res, next) => {
  const group_id = req.userData.group_id;
  try {
    const employees = await employeeDrivers.getEmployeesOfGroup(group_id);
    return res.status(200).json({ status: "success", employees: employees });
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  const employee_id = req.params.employee_id;
  try {
    const employee = await employeeDrivers.getEmployeeInfo(employee_id, 1);
    if (employee) {
      return res.status(200).json({ status: "success", employee: employee });
    }
  } catch (error) {
    next(error);
  }
};

exports.getAvailableTimeOfGroup = async (req, res, next) => {
  const group_id = req.userData.group_id;
  const year = +req.params.year;
  const month = +req.params.month;
  const day = +req.params.day;
  try {
    const available = await availableTimeDrivers.getAvailableTimeByGroup(
      group_id,
      year,
      month,
      day
    );
    return res.status(200).json({
      status: "success",
      date: `${year}-${month}-${day}`,
      available: available,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOffRecordsOfGroup = async (req, res, next) => {
  const group_id = req.userData.group_id;
  try {
    const off_records = await offRecordsDrivers.getOffRecordsOfGroup(group_id);

    return res
      .status(200)
      .json({ status: "success", off_records: off_records });
  } catch (error) {
    next(error);
  }
};

exports.getOffRecordsById = async (req, res, next) => {
  const off_record_id = +req.params.off_record_id;
  console.log(off_record_id);
  try {
    const off_record = await offRecordsDrivers.getOffRecordById(off_record_id);

    if (off_record) {
      return res
        .status(200)
        .json({ status: "success", off_record: off_record });
    }
  } catch (error) {
    next(error);
  }
};

exports.reviewOffRecords = async (req, res, next) => {
  const off_record_id = +req.params.off_record_id;
  const approved_by = req.userData.employee_id;
  const { approved, comment } = req.body;
  try {
    const is_updated_success = await offRecordsDrivers.reviewOffRecord(
      off_record_id,
      approved,
      approved_by,
      comment
    );
    if (is_updated_success) {
      return res.status(200).json({ status: "success" });
    } else {
      // the record has been reviewed
      return res
        .status(403)
        .json({ status: "forbidden", message: "The record has been reviewed" });
    }
  } catch (error) {
    next(error);
  }
};

exports.createSchedule = async (req, res, next) => {
  const group_id = req.userData.group_id;
  const { schedule_date, shifts } = req.body;
  try {
    const schedule_id = await schedulesShiftsDrivers.createSchedule(
      group_id,
      schedule_date,
      shifts
    );
    if (schedule_id) {
      return res
        .status(200)
        .json({ status: "success", schedule_id: schedule_id });
    } else {
      return res.status(409).json({
        status: "conflict",
        message: `Schedule at ${schedule_date} is already existed`,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateSchedule = async (req, res, next) => {
  const schedule_id = +req.params.schedule_id;
  const { shifts } = req.body;
  try {
    const is_updated_success = await schedulesShiftsDrivers.updateSchedule(
      schedule_id,
      shifts
    );
    if (is_updated_success) {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    next(error);
  }
};
