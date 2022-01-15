const db = require("../../models");
const Actions = db["Actions"];
const Roles = db["Roles"];
const Role_Actions = db["Role_Actions"];
const Employees = db["Employees"];
Role_Actions.hasMany(Actions, { foreignKey: "action_id" });
const LogicalError = require("../../error/logical-error");
exports.getActions = async () => {
  try {
    const actions = await Actions.findAll({});
    if (actions && actions.length) {
      const results = actions.map((action) => {
        return {
          action_id: action.action_id,
          name: action.name,
          description: action.description,
        };
      });
      return results;
    } else {
      throw new LogicalError("Actions are not existed.", 404);
    }
  } catch (error) {
    throw error;
  }
};

exports.createRole = async (
  group_id,
  title,
  abbreviation,
  description,
  priority,
  actions
) => {
  try {
    const new_role = await Roles.create({
      group_id,
      title,
      abbreviation,
      description,
      priority,
    });
    if (new_role) {
      for await (action_id of actions) {
        await Role_Actions.create({
          role_id: new_role.role_id,
          action_id: action_id,
        });
      }
      return true;
    }
  } catch (error) {
    throw error;
  }
};

exports.getRolesByGroup = async (group_id) => {
  try {
    const roles = await Roles.findAll({
      where: {
        group_id,
      },
    });
    let results = [];
    if (roles && roles.length) {
      results = roles.map((role) => {
        return {
          role_id: role.role_id,
          tilte: role.title,
          abbreviation: role.abbreviation,
        };
      });
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getRolesById = async (role_id) => {
  try {
    const role = await Roles.findByPk(role_id);
    const actions = await Role_Actions.findAll({
      raw: true,
      where: {
        role_id,
      },
      attributes: [
        "role_id",
        "action_id",
        "Actions.name",
        "Actions.description",
      ],
      include: {
        model: Actions,
        attributes: [],
      },
    });
    if (role && actions) {
      let results = {
        role_id: role.role_id,
        title: role.tilte,
        abbreviation: role.abbreviation,
        description: role.description,
        priority: role.priority,
        actions: actions.map((action) => {
          return {
            action_id: action.action_id,
            name: action.name,
            description: action.description,
          };
        }),
      };

      return results;
    }
  } catch (error) {
    throw error;
  }
};

exports.updateRole = async (
  role_id,
  title,
  abbreviation,
  description,
  priority,
  actions
) => {
  const role = await Roles.findByPk(role_id);
  if (role) {
    role.title = title;
    role.abbreviation = abbreviation;
    role.description = description;
    role.priority = priority;
    await role.save();
  } else {
    throw new LogicalError(`Role with role_id:${role_id} is not existed.`, 404);
  }
  await Role_Actions.destroy({
    where: {
      role_id,
    },
  });
  for await (action_id of actions) {
    await Role_Actions.create({
      role_id: role_id,
      action_id: action_id,
    });
  }
  return true;
};
exports.deleteRole = async (role_id) => {
  try {
    const isAssigned = await Employees.findOne({
      where: {
        role_id,
      },
    });
    if (isAssigned !== null) {
      return false;
    } else {
      await Roles.destroy({
        where: {
          role_id,
        },
      });
      return true;
    }
  } catch (error) {
    throw error;
  }
};
