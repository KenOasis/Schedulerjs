const companyDriver = require("../../db/admin/company-driver");

exports.signup = async (req, res, next) => {
  const { name, address, email, phone, password } = req.body;
  try {
    // TODO check if existed email; Email is the id used for login, cannot be changed.
    // TODO encrypted password
    const new_company = await companyDriver.signup(
      name,
      address,
      email,
      phone,
      password
    );
    if (new_company) {
      res.status(200).json({ status: "success", new_company: new_company });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const company_id = +req.params.company_id;
  const { name, address, phone } = req.body;
  try {
    if (typeof company_id === "number") {
      const updatedResult = await companyDriver.update(
        company_id,
        name,
        address,
        phone
      );
      if (updatedResult) {
        res.status(200).json({ status: "success" });
      }
    } else {
      throw new Error("Wrong parameters.");
    }
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = (req, res, next) => {
  // TODO Verify and change password
  res.status(200).json({ status: "success" });
};

exports.login = (req, res, next) => {
  // TODO
  res.status(200).json({ status: "success" });
};

exports.logout = (req, res, next) => {
  // TODO
  res.status(200).json({ status: "success" });
};

exports.getCompany = async (req, res, next) => {
  const company_id = +req.params.company_id;
  // TODO check whether login
  try {
    if (typeof company_id === "number") {
      const company = await companyDriver.getCompany(company_id);
      if (company) {
        res.status(200).json({ status: "success", company: company });
      }
    }
  } catch (error) {
    next(error);
  }
};
