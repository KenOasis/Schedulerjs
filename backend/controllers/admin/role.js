exports.getRolesByGroup = async (req, res, next) => {
  const group_id = +req.params.group_id;
  try {
  } catch (error) {
    next(error);
  }
};

exports.getRolesById = async (req, res, next) => {
  const role_id = +req.params.role_id;
  try {
  } catch (error) {
    next(error);
  }
};

exports.createRole = async (req, res, next) => {
  const group_id = +req.body.group_id;
  const { title, abbreviation, description, actions } = req.body;
  const priority = +req.body.priority;
  try {
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  const role_id = +req.params.role_id;
  const { title, abbreviation, description, acitons } = req.body;
  const priority = +req.body.priority;
  try {
  } catch (error) {
    next(error);
  }
};

exports.deleteRole = async (req, res, next) => {
  const role_id = +req.params.role_id;
  try {
  } catch (error) {
    next(error);
  }
};
