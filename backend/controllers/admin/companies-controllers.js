const companyDrivers = require("../../db/admin/company-drivers");
const bcrypt = require("bcryptjs");
const ValidationError = require("../../error/validation-error");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
  const { name, address, email, phone, password } = req.body;
  try {
    const existing_email = await companyDrivers.emailExisted(email);
    if (existing_email) {
      return res
        .status(409)
        .json({ status: "conflict", message: "Email is already existed" });
    }
    const hash_password = bcrypt.hashSync(password, salt);
    const new_company = await companyDrivers.signup(
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
  const company_id = req.userData.company_id;
  const { name, address, phone } = req.body;
  try {
    if (typeof company_id === "number") {
      const updatedResult = await companyDrivers.update(
        company_id,
        name,
        address,
        phone
      );
      if (updatedResult) {
        return res.status(200).json({ status: "success" });
      }
    } else {
      throw new Error("Wrong parameters.");
    }
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  const email = req.userData.email;
  const { password, new_password } = req.body;

  try {
    const existing_user = await companyDrivers.emailExisted(email);
    if (existing_user) {
      const isPasswordMatched = bcrypt.compareSync(
        password,
        existing_user.password
      );
      if (isPasswordMatched) {
        const hash_password = bcrypt.hashSync(new_password, salt);
        existing_user.password = hash_password;
        await existing_user.save();
        return res.status(200).json({ status: "success" });
      } else {
        throw new ValidationError("Wrong password", 401);
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let existing_user;
  try {
    existing_user = await companyDrivers.emailExisted(email);
    if (existing_user === null) {
      throw new ValidationError("The email is not existed", 401);
    }

    const isPasswordMatched = bcrypt.compareSync(
      password,
      existing_user.password
    );
    if (isPasswordMatched) {
      const token = jwt.sign(
        {
          company_id: existing_user.company_id,
          email: existing_user.email,
        },
        "5ecret_5equ@nce_4jwt",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ status: "success", token: token });
    } else {
      throw new ValidationError("Wrong password", 401);
    }
  } catch (error) {
    next(error);
  }
};

exports.getCompany = async (req, res, next) => {
  const company_id = req.userData.company_id;
  try {
    if (typeof company_id === "number") {
      const company = await companyDrivers.getCompanyInfo(company_id);
      if (company) {
        return res.status(200).json({ status: "success", company: company });
      }
    }
  } catch (error) {
    next(error);
  }
};
