// This checker ensure that the current logined company account could only accessed/modfied their own data (data integrity)

const authDrivers = require("../db/admin/auth-drivers");
const ValidationError = require("../error/validation-error");
exports.groupChecker = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const company_id = req.userData.company_id;
  const group_id = +req.params.group_id || +req.body.group_id;

  if (group_id) {
    try {
      let isAuthorized = await authDrivers.checkGroup(group_id, company_id);
      if (isAuthorized) {
        return next();
      } else {
        throw new ValidationError(
          `Unauthorized access by company_id: ${company_id}`,
          403
        );
      }
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
};

exports.roleChecker = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  const company_id = req.userData.company_id;
  const role_id = +req.params.role_id || +req.body.role_id;
  if (role_id) {
    try {
      let isAuthorized = await authDrivers.checkRole(role_id, company_id);
      if (isAuthorized) {
        return next();
      } else {
        throw new ValidationError(
          `Unauthorized access by company_id: ${company_id}`,
          403
        );
      }
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
};

exports.employeeChecker = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  const company_id = req.userData.company_id;
  const employee_id = +req.params.employee_id || +req.body.employee_id;
  if (employee_id) {
    try {
      let isAuthorized = await authDrivers.checkEmployee(
        employee_id,
        company_id
      );
      if (isAuthorized) {
        return next();
      } else {
        throw new ValidationError(
          `Unauthorized access by company_id: ${company_id}`,
          403
        );
      }
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
};

exports.offTypeChecker = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  const company_id = req.userData.company_id;
  const off_id = +req.params.off_id || +req.body.off_id;
  if (off_id) {
    try {
      let isAuthorized = await authDrivers.checkEmployee(off_id, company_id);
      if (isAuthorized) {
        return next();
      } else {
        throw new ValidationError(
          `Unauthorized access by company_id: ${company_id}`,
          403
        );
      }
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
};
