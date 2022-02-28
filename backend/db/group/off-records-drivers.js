const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const { Op } = require("sequelize");
const Off_Records = db["Off_Records"];

const employeeDrivers = require("./employee-drivers");
const off_records = require("../../models/off_records");

exports.createOffRecord = async (
  employee_id,
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
    if (confilict_records) {
      return false;
    }
    const off_record = await Off_Records.create({
      employee_id,
      off_id,
      starts_at,
      ends_at,
      reason,
    });
    if (off_record) {
      return {
        off_record_id: off_record.off_record_id,
        requested_at: off_record.requested_at,
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

exports.getOffRecordsOfGroup = async (group_id) => {
  try {
    const employees = await Employees.findAll({
      raw: true,
      attributes: [
        "employee_id",
        "firstname",
        "lastname",
        "activated",
        "role.title",
        "role.abbreviation",
        "role.group_id",
      ],
      where: {
        activated: true,
      },
      include: {
        model: Roles,
        as: "role",
        attributes: [],
        required: true,
        include: {
          model: Groups,
          as: "group",
          where: {
            group_id: group_id,
          },
          attributes: [],
          required: true,
        },
      },
    });

    const off_records = [];
    for await (emp of employees) {
      const records = await Off_Records.findAll({
        raw: true,
        where: {
          employee_id: emp.employee_id,
        },
      });
      if (records.length) {
        records.forEach((record) => {
          off_records.push({
            employee_id: emp.employee_id,
            firstname: emp.firstname,
            lastname: emp.lastname,
            off_record_id: record.off_record_id,
            starts_at: record.starts_at,
            ends_at: record.ends_at,
            approved: record.approved,
          });
        });
      }
    }
    return off_records;
  } catch (error) {
    throw error;
  }
};

exports.getOffRecordById = async (off_record_id) => {
  try {
    const off_record = await Off_Records.findOne({
      raw: true,
      where: {
        off_record_id,
      },
    });

    if (off_record) {
      return {
        ...off_record,
      };
    } else {
      throw new LogicalError(
        `Off Record with id ${off_record_id} is not existed`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.updateOffRecord = async (
  off_record_id,
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
    if (
      confilict_records &&
      confilict_records.off_record_id !== off_record_id
    ) {
      return [
        false,
        `You already request day off between (inclusive) ${starts_at} and ${ends_at}`,
      ];
    }

    const off_record = await Off_Records.findByPk(off_record_id);
    if (off_record) {
      if (off_record.approved !== null) {
        return [false, "Cannot updated the reviewed record"];
      }
      off_record.off_id = off_id;
      off_record.starts_at = starts_at;
      off_record.ends_at = ends_at;
      off_record.reason = reason;
      await off_record.save();
      return [true, ""];
    } else {
      throw new LogicalError(
        `Off Record with id ${off_record_id} is not existed`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.reviewOffRecord = async (
  off_record_id,
  approved,
  approved_by,
  comment
) => {
  try {
    const off_record = await Off_Records.findByPk(off_record_id);
    if (off_record) {
      if (off_record.approved !== null) {
        return false;
      }
      off_record.approved = approved;
      off_record.approved_by = approved_by;
      off_record.comment = comment;
      await off_record.save();
      return true;
    } else {
      throw new LogicalError(
        `Off Record with id ${off_record_id} is not existed`,
        404
      );
    }
  } catch (error) {
    next(error);
  }
};
