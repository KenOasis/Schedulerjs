const roleDrivers = require("../../db/admin/role-drivers");

exports.getActions = async (req, res, next) => {
  try {
    const actions = await roleDrivers.getActions();
    if (actions && actions.length) {
      return res.status(200).json({ status: "success", actions: actions });
    }
  } catch (error) {
    next(error);
  }
};

exports.getRolesByGroup = async (req, res, next) => {
  const group_id = +req.params.group_id;
  try {
    const roles = await roleDrivers.getRolesByGroup(group_id);
    return res.status(200).json({ status: "success", roles: roles });
  } catch (error) {
    next(error);
  }
};

exports.getRolesById = async (req, res, next) => {
  const role_id = +req.params.role_id;
  try {
    const role = await roleDrivers.getRolesById(role_id);
    if (role) {
      return res.status(200).json({ status: "success", role: role });
    }
  } catch (error) {
    next(error);
  }
};

exports.createRole = async (req, res, next) => {
  const group_id = +req.body.group_id;
  const { title, abbreviation, description, actions } = req.body;
  const priority = +req.body.priority;
  try {
    const isCreated = await roleDrivers.createRole(
      group_id,
      title,
      abbreviation,
      description,
      priority,
      actions
    );
    if (isCreated) {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  const role_id = +req.params.role_id;
  const { title, abbreviation, description, acitons } = req.body;
  const priority = +req.body.priority;
  try {
  } catch (error) {
    next(error);
  }
};

exports.deleteRole = async (req, res, next) => {
  const role_id = +req.params.role_id;
  try {
  } catch (error) {
    next(error);
  }
};
