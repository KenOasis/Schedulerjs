exports.getGroupsByCompany = async (req, res, next) => {
  const company_id = +req.params.company_id;
  try {
  } catch (error) {
    next(error);
  }
};

exports.getGroupById = async (req, res, next) => {
  const group_id = +req.params.group_id;
  try {
  } catch (error) {
    next(error);
  }
};

exports.creatGroup = async (req, res, next) => {
  const { name, description } = req.body;
  try {
  } catch (error) {
    next(error);
  }
};

exports.updateGroup = async (req, res, next) => {
  const { name, description, activated } = req.body;
  try {
  } catch (error) {
    next(error);
  }
};
