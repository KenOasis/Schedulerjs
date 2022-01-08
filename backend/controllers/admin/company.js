const companyDriver = require("../../db/admin/company-driver");

exports.getCompany = (req, res, next) => {
  const { company_id } = req.params;
  res.status(200).json({ status: "success" });
};

exports.signup = async (req, res, next) => {
  const { name, address, email, phone, password } = req.body;
  try {
    // TODO check existed name / email;
    // TODO encrypted password
    const new_company = await companyDriver.signup(
      name,
      address,
      email,
      phone,
      password
    );
    if (new_company) {
      const obj = {
        name: new_company.name,
        address: new_company.address,
        email: new_company.email,
        phone: new_company.phone,
        password: new_company.phone,
      };
      console.log(obj);
      res.status(200).json({ status: "success" });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res, next) => {
  res.status(200).json({ status: "success" });
};

exports.login = (req, res, next) => {
  res.status(200).json({ status: "success" });
};

exports.logout = (req, res, next) => {
  res.status(200).json({ status: "success" });
};
