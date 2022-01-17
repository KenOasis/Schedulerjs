const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Off_Types = db["Off_Types"];

exports.getOffsByCompany = async (company_id) => {
  try {
    const offs = await Off_Types.findAll({
      where: {
        company_id,
      },
    });
    let results = [];
    if (offs && offs.length) {
      results = offs.map((off) => {
        return {
          off_id: off.off_id,
          company_id: off.company_id,
          name: off.name,
          description: off.description,
        };
      });
    }
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getOffById = async (off_id) => {
  try {
    const off = await Off_Types.findByPk(off_id);
    if (off) {
      return {
        off_id: off.off_id,
        company_id: off.company_id,
        name: off.name,
        description: off.description,
      };
    } else {
      throw new LogicalError(
        `Off type with off_id:${off_id} is not existed.`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.createOff = async (company_id, name, description) => {
  try {
    const new_off = await Off_Types.create({
      company_id,
      name,
      description,
    });

    if (new_off) {
      return {
        off_id: new_off.off_id,
        company_id: new_off.company_id,
        name: new_off.name,
        description: new_off.description,
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.updateOff = async (off_id, name, description) => {
  try {
    const off = await Off_Types.findByPk(off_id);

    if (off) {
      off.name = name;
      off.description = description;
      await off.save();
      return true;
    } else {
      throw new LogicalError(
        `Off type with off_id:${off_id} is not existed.`,
        404
      );
    }
  } catch (error) {
    throw error;
  }
};
