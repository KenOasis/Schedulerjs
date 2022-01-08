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
      return new_company;
    }
  } catch (error) {
    throw error;
  }
};
