const authDriver = require("../db/group/auth-drivers");

module.exports = (action_key) => {
  return async (req, res, next) => {
    const employee_id = req.userData.employee_id;
    const is_employee_action_existed = await authDriver.checkEmployeeAction(
      employee_id,
      action_key
    );
    if (is_employee_action_existed) {
      next();
    } else {
      return res
        .status(403)
        .json({ status: "forbidden", message: "Unauthorized access." });
    }
  };
};
