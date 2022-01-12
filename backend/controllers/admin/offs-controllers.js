exports.getOffByCompany = async (req, res, next) => {
  const company_id = +req.params.company_id;
  try {
  } catch (error) {
    next(error);
  }
};

exports.getOffById = async (req, res, next) => {
  const off_id = +req.params.off_id;
  try {
  } catch (error) {
    next(error);
  }
};

exports.createOff = async (req, res, next) => {
  const { name, description } = req.body;
  const company_id = +req.body.company_id;
  try {
  } catch (error) {
    next(error);
  }
};

exports.updateOff = async (req, res, next) => {
  const { name, description } = req.body;
  const off_id = +req.params.off_id;
  try {
  } catch (error) {
    next(error);
  }
};
