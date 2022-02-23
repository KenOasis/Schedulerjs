const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const Companies = db["Companies"];
const Off_Types = db["Off_Types"];
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

exports.getEmployeesOfGroup = async (group_id) => {
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

    // this may never run
    if (!employees || employees.length === 0) {
      throw new LogicalError("DB error", 500);
    }

    return employees.map((employee) => {
      return {
        employee_id: employee.employee_id,
        firstname: employee.firstname,
        lastname: employee.lastname,
        activated: employee.activated,
        title: employee.title,
        abbreviation: employee.abbreviation,
      };
    });
  } catch (error) {
    throw error;
  }
};

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

exports.getOffRecords = async (employee_id) => {
  try {
    const off_records = await Off_Records.findAll({
      raw: true,
      where: {
        employee_id,
      },
    });

    return off_records.map((record) => {
      return {
        off_record_id: record.off_record_id,
        starts_at: record.starts_at,
        ends_at: record.ends_at,
        approved: record.approved,
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
