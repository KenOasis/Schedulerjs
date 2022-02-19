const offDrivers = require("../../db/admin/off-drivers");

exports.getOffByCompany = async (req, res, next) => {
  const company_id = req.userData.company_id;
  try {
    const offs = await offDrivers.getOffsByCompany(company_id);
    if (offs) {
      return res.status(200).json({ status: "success", offs: offs });
    }
  } catch (error) {
    next(error);
  }
};

exports.getOffById = async (req, res, next) => {
  const off_id = +req.params.off_id;
  try {
    const off = await offDrivers.getOffById(off_id);
    if (off) {
      return res.status(200).json({ status: "success", off: off });
    }
  } catch (error) {
    next(error);
  }
};

exports.createOff = async (req, res, next) => {
  const { name, description } = req.body;
  const company_id = req.userData.company_id;
  try {
    const existed_off = await offDrivers.existedOff(name);
    if (existed_off) {
      return res.status(409).json({
        status: "conflict",
        message: `Off type with name ${name} is already existed!`,
      });
    }
    const new_off = await offDrivers.createOff(company_id, name, description);
    if (new_off) {
      return res.status(200).json({ status: "success", off: new_off });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateOff = async (req, res, next) => {
  const { name, description } = req.body;
  const off_id = +req.params.off_id;
  try {
    const existed_off = await offDrivers.existedOff(name);
    if (existed_off && existed_off.off_id !== off_id) {
      return res.status(409).json({
        status: "conflict",
        message: `Off type with name ${name} is already existed!`,
      });
    }
    const isUpdatedSuccess = await offDrivers.updateOff(
      off_id,
      name,
      description
    );

    if (isUpdatedSuccess) {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    next(error);
  }
};
