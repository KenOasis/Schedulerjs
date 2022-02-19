const roleDrivers = require("../../db/admin/role-drivers");
const roles = require("../../models/roles");

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
    const [isCreated, message] = await roleDrivers.createRole(
      group_id,
      title,
      abbreviation,
      description,
      priority,
      actions
    );
    if (isCreated) {
      return res.status(200).json({ status: "success" });
    } else {
      return res.status(409).json({ status: "conflict", message: message });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  const role_id = +req.params.role_id;
  const { title, abbreviation, description, actions } = req.body;
  const priority = +req.body.priority;
  try {
    const [isUpdated, message] = await roleDrivers.updateRole(
      role_id,
      title,
      abbreviation,
      description,
      priority,
      actions
    );
    if (isUpdated) {
      return res.status(200).json({ status: "success" });
    } else {
      return res.status(409).json({ status: "conflict", message: message });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteRole = async (req, res, next) => {
  const role_id = +req.params.role_id;
  try {
    const isDeleted = await roleDrivers.deleteRole(role_id);
    if (isDeleted) {
      return res.status(200).json({ status: "success" });
    } else {
      return res.status(409).json({
        status: "conflict",
        message:
          "Cannot delete role which has been assigned to some employees.",
      });
    }
  } catch (error) {
    next(error);
  }
};
