const groupDriver = require("../../db/admin/group-driver");

exports.getGroupsByCompany = async (req, res, next) => {
  const company_id = req.userData.company_id;
  try {
    const groups = await groupDriver.getGroupsByCompany(company_id);
    res.status(200).json({ status: "Success!", groups: groups });
  } catch (error) {
    next(error);
  }
};

exports.getGroupById = async (req, res, next) => {
  const group_id = +req.params.group_id;
  try {
    const group = await groupDriver.getGroupById(group_id);
    if (group) {
      res.status(200).json({ status: "success", group: group });
    }
  } catch (error) {
    next(error);
  }
};

exports.creatGroup = async (req, res, next) => {
  const { name, description } = req.body;
  const company_id = req.userData.company_id;
  try {
    const new_group = await groupDriver.createGroup(
      company_id,
      name,
      description
    );
    if (new_group) {
      res.status(200).json({ status: "success", new_group: new_group });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateGroup = async (req, res, next) => {
  const group_id = +req.params.group_id;
  const { name, description, activated } = req.body;
  try {
    const updatedResult = await groupDriver.updateGroup(
      group_id,
      name,
      description,
      activated
    );
    if (updatedResult) {
      res.status(200).json({ status: "success" });
    }
  } catch (error) {
    next(error);
  }
};
