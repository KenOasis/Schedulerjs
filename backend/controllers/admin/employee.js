exports.getEmployeeByGroup = async (req, res, next) => {
  const group_id = +req.params.group_id;
  try {
  } catch (error) {
    next(error);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  const employee_id = +req.params.employee_id;
  try {
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  const { username, password } = req.body;
  const role_id = +req.body.role_id;
  try {
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  const { username, password, activated } = req.body;
  const role_id = +req.body.role_id;
  try {
  } catch (error) {
    next(error);
  }
};
