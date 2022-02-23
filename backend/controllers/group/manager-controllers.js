const offRecordsDrivers = require("../../db/group/off-records-drivers");
const employeeDrivers = require("../../db/group/employee-drivers");
const availableTimeDrivers = require("../../db/group/available-time-drivers");

exports.getEmployees = async (req, res, next) => {
  const group_id = req.userData.group_id;
  try {
    const employees = await employeeDrivers.getEmployeesOfGroup(group_id);
    if (employees) {
      return res.status(200).json({ status: "success", employees: employees });
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
    const off_records = await offRecordsDrivers.getOffRecordOfGroup(group_id);

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
