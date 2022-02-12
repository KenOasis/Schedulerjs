const managerDrivers = require("../../db/group/manager-drivers");

exports.getEmployees = async (req, res, next) => {
  const employee_id = req.userData.employee_id;
  try {
    const employees = await managerDrivers.getEmployeesOfGroup(employee_id);
    if (employees) {
      return res.status(200).json({ status: "success", employees: employees });
    }
  } catch (error) {
    next(error);
  }
};

exports.getAvailableTimeOfGroup = async (req, res, next) => {
  const employee_id = req.userData.employee_id;
  const year = +req.params.year;
  const month = +req.params.month;
  const day = +req.params.day;
  try {
    const available = await managerDrivers.getAvailableTimeByGroup(
      employee_id,
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
  const employee_id = req.userData.employee_id;
  try {
    const off_records = await managerDrivers.getOffRecordOfGroup(employee_id);

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
    const off_record = await managerDrivers.getOffRecordById(off_record_id);

    if (off_record) {
      return res
        .status(200)
        .json({ status: "success", off_record: off_record });
    }
  } catch (error) {
    next(error);
  }
};
