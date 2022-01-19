const LogicalError = require("../../error/logical-error");
const db = require("../../models");
const Companies = db["Companies"];

exports.signup = async (name, address, email, phone, password) => {
  try {
    const new_company = await Companies.create({
      name,
      address,
      email,
      phone,
      password,
    });
    if (new_company) {
      return {
        company_id: new_company.comapny_id,
        name: new_company.name,
        address: new_company.address,
        email: new_company.email,
        phone: new_company.phone,
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.emailExisted = async (email) => {
  try {
    const company = await Companies.findOne({
      where: {
        email,
      },
    });
    if (company) {
      return company;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
exports.update = async (company_id, name, address, phone) => {
  try {
    const company = await Companies.findByPk(company_id);
    if (company) {
      company.name = name;
      company.address = address;
      company.phone = phone;
      await company.save();
      return true;
    } else {
      throw new LogicalError(
        `company_id:${updatedObj.comapny_id} is not existed`,
        400
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.getCompanyInfo = async (company_id) => {
  try {
    const company = await Companies.findByPk(company_id);
    if (company) {
      return {
        company_id: company.company_id,
        name: company.name,
        email: company.email,
        address: company.address,
        phone: company.phone,
      };
    } else {
      throw new LogicalError(
        `company_id:${updatedObj.comapny_id} is not existed`,
        400
      );
    }
  } catch (error) {
    throw error;
  }
};
