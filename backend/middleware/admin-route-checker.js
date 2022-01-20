// This checker ensure that the current logined company account could only modified their own data

const authDrivers = require("../db/admin/auth-drivers");
const ValidationError = require("../error/validation-error");
module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const company_id = req.userData.company_id;
  let url = req.url;

  if (url.startsWith("/group")) {
    const group_id = +req.params.group_id || +req.body.group_id;
    console.log(group_id);
    if (group_id) {
      try {
        let isAuthorized = await authDrivers.checkGroup(group_id, company_id);
        if (isAuthorized) {
          next();
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
      next();
    }
  }
};
