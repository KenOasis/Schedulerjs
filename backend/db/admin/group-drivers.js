const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Groups = db["Groups"];

exports.createGroup = async (company_id, name, description) => {
  try {
    const group = await Groups.create({ company_id, name, description });
    if (group) {
      return {
        group_id: group.group_id,
        name: group.name,
        description: group.description,
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.getGroupById = async (group_id) => {
  try {
    const group = await Groups.findByPk(group_id);
    if (group) {
      return {
        group_id: group.group_id,
        name: group.name,
        description: group.description,
        activated: group.activated,
      };
    } else {
      throw new LogicalError(
        `Group with group_id: ${group_id} is not existed.`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.getGroupsByCompany = async (company_id) => {
  try {
    const groups = await Groups.findAll({
      where: {
        company_id,
      },
    });
    let results = [];
    if (groups && groups.length) {
      results = groups.map((group) => {
        return {
          group_id: group.group_id,
          name: group.name,
          description: group.description,
          activated: group.activated,
        };
      });
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.updateGroup = async (group_id, name, description, activated) => {
  try {
    const group = await Groups.findByPk(group_id);
    if (group) {
      group.name = name;
      group.description = description;
      group.activated = activated;
      group.save();
      return true;
    } else {
      throw new LogicalError(
        `Group with group_id: ${group_id} is not existed.`,
        404
      );
    }
  } catch (error) {}
};
