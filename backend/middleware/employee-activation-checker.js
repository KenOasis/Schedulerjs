const authDrivers = require("../db/group/auth-drivers");

module.exports = async (req, res, next) => {
  const employee_id = req.userData.employee_id;
  try {
    const is_employee_activated = await authDrivers.isEmployeeActivated(
      employee_id
    );
    if (is_employee_activated) {
      next();
    } else {
      return res.status(403).json({
        status: "forbidden",
        message: "Account is inactivated, pls contact admin.",
      });
    }
  } catch (error) {
    next(error);
  }
};
