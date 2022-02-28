const bcrypt = require("bcryptjs");
const ValidationError = require("../../error/validation-error");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const authDrivers = require("../../db/group/auth-drivers");
const employeeDrivers = require("../../db/group/employee-drivers");
const availableTimeDrivers = require("../../db/group/available-time-drivers");
const offRecordDrivers = require("../../db/group/off-records-drivers");
const punchRecordDrivers = require("../../db/group/punch-record-drivers");
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const existing_employee = await authDrivers.existingEmployee(username);

    if (existing_employee === null) {
      throw new ValidationError(`Username: ${username} is not existed`, 401);
    }

    const is_password_matched = bcrypt.compareSync(
      password,
      existing_employee.password
    );

    if (is_password_matched) {
      const [role_id, group_id] = await authDrivers.getAuthInfo(
        existing_employee.employee_id
      );
      const token = jwt.sign(
        {
          employee_id: existing_employee.employee_id,
          username: username,
          role_id: role_id,
          group_id: group_id,
        },
        "5ecret_5equ@nce_4jwt",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ status: "success", token: token });
    } else {
      throw new ValidationError(
        `Wrong password, attempted with username: ${username}`,
        401
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeInfo = async (req, res, next) => {
  const employee_id = req.userData.employee_id;
  try {
    const employee = await employeeDrivers.getEmployeeInfo(employee_id);

    if (employee) {
      return res.status(200).json({ status: "success", employee: employee });
    }
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  const { password, new_password } = req.body;
  const username = req.userData.username;

  try {
    const existing_employee = await authDrivers.existingEmployee(username);
    if (existing_employee) {
      const is_password_matched = bcrypt.compareSync(
        password,
        existing_employee.password
      );
      if (is_password_matched) {
        existing_employee.password = bcrypt.hashSync(new_password, salt);
        await existing_employee.save();
        return res.status(200).json({ status: "success" });
      } else {
        throw new ValidationError(
          `Wrong password, attempted with username ${username}`,
          401
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.updateEmergencyContact = async (req, res, next) => {
  const { emergency_contact } = req.body;
  const employee_id = req.userData.employee_id;
  try {
    const is_updated_success = await employeeDrivers.updateEmergencyContact(
      employee_id,
      emergency_contact
    );

    if (is_updated_success) {
      res.status(200).json({ status: "success" });
    }
  } catch (error) {
    next(error);
  }
};

exports.setAvailableTime = async (req, res, next) => {
  const employee_id = req.userData.employee_id;
  const { effected_start, effected_end, available } = req.body;
  try {
    const is_success = await availableTimeDrivers.setAvailableTime(
      employee_id,
      effected_start,
      effected_end,
      available
    );
    if (is_success) {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    next(error);
  }
};

exports.getAvailableTime = async (req, res, next) => {
  const employee_id = req.userData.employee_id;
  const year = +req.params.year;
  const month = +req.params.month;
  const day = +req.params.day;
  try {
    const available_time = await availableTimeDrivers.getAvailableTime(
      employee_id,
      year,
      month,
      day
    );
    if (available_time) {
      return res
        .status(200)
        .json({ status: "success", available: available_time });
    }
  } catch (error) {
    next(error);
  }
};

exports.creatOffRecord = async (req, res, next) => {
  const employee_id = req.userData.employee_id;
  const { off_id, starts_at, ends_at, reason } = req.body;
  try {
    const off_record = await offRecordDrivers.createOffRecord(
      employee_id,
      off_id,
      starts_at,
      ends_at,
      reason
    );

    if (off_record) {
      return res
        .status(200)
        .json({ status: "success", off_record: off_record });
    } else if (off_record === false) {
      return res.status(409).json({
        status: "conflict",
        message: `You already request day off between (inclusive) ${starts_at} and ${ends_at}`,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getOffRecords = async (req, res, next) => {
  const group_id = req.userData.group_id;
  try {
    const off_records = await offRecordDrivers.getOffRecordsOfGroup(group_id);

    return res
      .status(200)
      .json({ status: "success", off_records: off_records });
  } catch (error) {
    next(error);
  }
};

exports.getOffRecordById = async (req, res, next) => {
  const off_record_id = +req.params.off_record_id;
  try {
    const off_record = await offRecordDrivers.getOffRecordById(off_record_id);
    if (off_record) {
      return res
        .status(200)
        .json({ status: "success", off_record: off_record });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateOffRecord = async (req, res, next) => {
  const off_record_id = +req.params.off_record_id;
  const { off_id, starts_at, ends_at, reason } = req.body;
  try {
    const [is_updated_success, message] =
      await offRecordDrivers.updateOffRecord(
        off_record_id,
        off_id,
        starts_at,
        ends_at,
        reason
      );
    if (is_updated_success) {
      return res.status(200).json({ status: "success" });
    } else {
      return res.status(403).json({
        status: "forbidden",
        message: message,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.recordedTimestamp = async (req, res, next) => {
  const employee_id = req.userData.employee_id;
  const { recorded_date, recorded_time } = req.body;
  try {
    const punch_record = await punchRecordDrivers.createPunch(
      employee_id,
      recorded_date,
      recorded_time
    );
    if (punch_record) {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    next(error);
  }
};

exports.getPunchRecordsByDate = async (req, res, next) => {
  const employee_id = req.userData.employee_id;
  const { year, month, day } = req.params;
  const punch_records = await punchRecordDrivers.getPunchRecordsByDate(
    employee_id,
    +year,
    +month,
    +day
  );

  return res.status(200).json({
    status: "success",
    punch_records: punch_records,
  });
  try {
  } catch (error) {
    next(error);
  }
};
