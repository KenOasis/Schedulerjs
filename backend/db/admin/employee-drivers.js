const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
const Employee_Role_Records = db["Employee_Role_Records"];

const stringGenerator = require("../../util/random-string-generator");

const bcrypt = require("bcryptjs");
const ValidationError = require("../../error/validation-error");
const { employee } = require("../../middleware/auth-checker");
const salt = bcrypt.genSaltSync(10);

exports.getEmployeesByGroup = async (group_id) => {
  try {
    const employees = await Employees.findAll({
      raw: true,
      attributes: [
        "employee_id",
        "username",
        "firstname",
        "lastname",
        "activated",
        "role.title",
      ],
      include: {
        model: Roles,
        as: "role",
        attributes: [],
        required: true,
        include: {
          model: Groups,
          as: "group",
          attributes: [],
          required: true,
          where: {
            group_id: group_id,
          },
        },
      },
    });

    if (employees) {
      return employees.map((employee) => {
        return { ...employee };
      });
    }
  } catch (error) {
    throw error;
  }
};

exports.getEmployeeById = async (employee_id) => {
  try {
    const employee = await Employees.findOne({
      where: {
        employee_id,
      },
    });

    if (employee) {
      const role = await Roles.findByPk(employee.role_id);
      return {
        employee_id: employee.employee_id,
        username: employee.username,
        firstname: employee.firstname,
        lastname: employee.lastname,
        emergency_contact: employee.emergency_contact,
        role_id: employee.role_id,
        group_id: role.group_id,
        activated: employee.activated,
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.existedEmployeeByUsername = async (username) => {
  try {
    const existing_username = await Employees.findOne({
      where: {
        username,
      },
    });

    if (existing_username) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

exports.createEmployee = async (
  role_id,
  username,
  firstname,
  lastname,
  emergency_contact,
  safety_pin
) => {
  try {
    let random_password = stringGenerator(8);
    let hash_password = bcrypt.hashSync(random_password, salt);
    let hash_safety_pin = bcrypt.hashSync(safety_pin, salt);
    const new_employee = await Employees.create({
      username,
      firstname,
      lastname,
      safety_pin: hash_safety_pin,
      password: hash_password,
      emergency_contact,
      role_id,
    });

    const role = await Roles.findOne({
      where: {
        role_id,
      },
      attributes: ["role_id", "title", "abbreviation", "group_id"],
    });

    const group = await Groups.findOne({
      where: {
        group_id: role.group_id,
      },
    });

    if (new_employee) {
      await Employee_Role_Records.create({
        employee_id: new_employee.employee_id,
        role_id: new_employee.role_id,
      });
      return {
        employee_id: new_employee.employee_id,
        username: new_employee.username,
        firstname: new_employee.firstname,
        lastname: new_employee.lastname,
        emergency_contact: emergency_contact,
        password: random_password,
        role_id: new_employee.role_id,
        title: role.title,
        abbreviation: role.abbreviation,
        activated: new_employee.activated,
        group_name: group.name,
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.updateEmployee = async (
  employee_id,
  firstname,
  lastname,
  role_id,
  activated
) => {
  try {
    const employee = await Employees.findByPk(employee_id);

    if (employee) {
      if (employee.role_id !== role_id) {
        const employee_role_record = await Employee_Role_Records.findOne({
          where: {
            employee_id: employee_id,
            current: true,
          },
        });
        employee_role_record.current = false;
        let today = new Date();
        employee_role_record.ends_at = today;
        await employee_role_record.save();
        await Employee_Role_Records.create({
          employee_id: employee_id,
          role_id: role_id,
        });
      }

      employee.firstname = firstname;
      employee.lastname = lastname;
      employee.role_id = role_id;
      employee.activated = activated;
      await employee.save();
      return true;
    } else {
      throw new LogicalError(
        `Employee with employee_id:${employee_id} is not existed.`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.resetPassword = async (employee_id) => {
  try {
    const employee = await Employees.findByPk(employee_id);
    if (employee) {
      let new_randown_password = stringGenerator(8);
      let hash_password = bcrypt.hashSync(new_randown_password, salt);
      employee.password = hash_password;
      await employee.save();
      return new_randown_password;
    } else {
      throw new LogicalError(
        `Employee with employee_id:${employee_id} is not existed.`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.setSafetyPin = async (employee_id, safety_pin) => {
  try {
    const employee = await Employees.findByPk(employee_id);
    if (employee) {
      employee.safety_pin = safety_pin;
      await employee.save();
      return true;
    } else {
      throw new LogicalError(
        `Employee with employee_id:${employee_id} is not existed.`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};
