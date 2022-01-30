const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Employees = db["Employees"];
const Roles = db["Roles"];
const Groups = db["Groups"];
Roles.belongsTo(Groups, { as: "groups", foreignKey: "group_id" });
Employees.belongsTo(Roles, { as: "roles", foreignKey: "role_id" });

const stringGenerator = require("../../util/random-string-generator");

const bcrypt = require("bcryptjs");
const ValidationError = require("../../error/validation-error");
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
        "emergency_contact",
        "activated",
        "roles.title",
        "roles.abbreviation",
        "roles->groups.name",
      ],
      include: {
        model: Roles,
        as: "roles",
        attributes: [],
        required: true,
        include: {
          model: Groups,
          as: "groups",
          attributes: [],
          required: true,
          where: {
            group_id: group_id,
          },
        },
      },
    });

    if (employees) {
      return {
        ...employees,
      };
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
      return {
        employee_id: employee.employee_id,
        username: employee.username,
        firstname: employee.firstname,
        lastname: employee.lastname,
        emergency_contact: employee.emergency_contact,
        role_id: employee.role_id,
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
      attributes: ["role_id", "title", "abbreviation"],
    });

    if (new_employee) {
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

exports.resetPassword = async (safety_pin, employee_id) => {
  try {
    const employee = await Employees.findByPk(employee_id);
    if (employee) {
      let is_safety_pin_matched = bcrypt.compareSync(
        safety_pin,
        employee.safety_pin
      );
      if (is_safety_pin_matched) {
        let new_randown_password = stringGenerator(8);
        let hash_password = bcrypt.hashSync(new_randown_password, salt);
        employee.password = hash_password;
        await employee.save();
        return new_randown_password;
      } else {
        throw new ValidationError("Wrong safety pin.", 403);
      }
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
