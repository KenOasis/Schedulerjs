const companyDriver = require("../../db/admin/company-driver");
const bcrypt = require("bcryptjs");
const ValidationError = require("../../error/validation-error");
const salt = bcrypt.genSaltSync(10);

exports.signup = async (req, res, next) => {
  const { name, address, email, phone, password } = req.body;
  try {
    const existing_email = await companyDriver.emailExisted(email);
    if (existing_email) {
      return res
        .status(409)
        .json({ status: "conflict", message: "Email is already existed" });
    }
    const hash_password = bcrypt.hashSync(password, salt);
    const new_company = await companyDriver.signup(
      name,
      address,
      email,
      phone,
      hash_password
    );
    if (new_company) {
      return res
        .status(200)
        .json({ status: "success", new_company: new_company });
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

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let existing_email;
  try {
    existing_email = await companyDriver.emailExisted(email);
    if (existing_email === null) {
      throw new ValidationError("The email is not existed", 401);
    }

    const isPasswordMatched = bcrypt.compareSync(
      password,
      existing_email.password
    );
    if (isPasswordMatched) {
      return res.status(200).json({ status: "success" });
    } else {
      throw new ValidationError("Wrong password", 401);
    }
  } catch (error) {
    next(error);
  }
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
