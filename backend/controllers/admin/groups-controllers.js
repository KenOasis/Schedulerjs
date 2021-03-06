const groupDrivers = require("../../db/admin/group-drivers");

exports.getGroupsByCompany = async (req, res, next) => {
  const company_id = req.userData.company_id;
  try {
    const groups = await groupDrivers.getGroupsByCompany(company_id);
    return res.status(200).json({ status: "Success!", groups: groups });
  } catch (error) {
    next(error);
  }
};

exports.getGroupById = async (req, res, next) => {
  const group_id = +req.params.group_id;
  try {
    const group = await groupDrivers.getGroupById(group_id);
    if (group) {
      return res.status(200).json({ status: "success", group: group });
    }
  } catch (error) {
    next(error);
  }
};

exports.creatGroup = async (req, res, next) => {
  const { name, description } = req.body;
  const company_id = req.userData.company_id;
  try {
    const [is_create_success, obj] = await groupDrivers.createGroup(
      company_id,
      name,
      description
    );
    if (is_create_success) {
      return res
        .status(200)
        .json({ status: "success", new_group: obj.new_group });
    } else {
      return res.status(409).json({ status: "conflict", message: obj.message });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateGroup = async (req, res, next) => {
  const group_id = +req.params.group_id;
  const { name, description, activated } = req.body;
  try {
    const [is_update_status, message] = await groupDrivers.updateGroup(
      group_id,
      name,
      description,
      activated
    );
    if (is_update_status) {
      return res.status(200).json({ status: "success" });
    } else {
      return res.status(409).json({ status: "conflict", message: message });
    }
  } catch (error) {
    next(error);
  }
};
