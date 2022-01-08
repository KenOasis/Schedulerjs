const express = require("express");
const router = express.Router();
const companyController = require("../../controllers/admin/company");

/**
 * Sign up a new company account
 * POST ../api/admin/signup
 * body: {
 *  name,
 *  address,
 *  email,
 *  phone,
 *  password
 * }
 */
router.post("/signup", companyController.signup);

/**
 * Update basic company info
 * PUT ../api/admin/:company_id
 * // Each property of body is OPTIONAL
 * body: {
 *  name,
 *  address,
 *  phone
 * }
 */
router.put("/:company_id", companyController.update);

/**
 * Update password of company account
 * PUT ../api/admin/change_pw/:company_id
 */

router.put("/change_pw/:company_id", companyController.updatePassword);
/**
 * Login company account
 * POST ../api/admin/login
 */
router.post("/login", companyController.login);

/**
 * Logout company account
 * GET ../api/admin/logout
 */
router.post("/logout", companyController.logout);

/**
 * Get company info
 * GET ../api/admin/?company_id=?
 */
router.get("/:company_id", companyController.getCompany);

/**
 * Get all the group of the current company account
 * GET ../api/admin/group/getall/:company_id
 */

/**
 * Get the group info
 * GET ../api/admin/group/get/:group_id
 */

/**
 * Create a new group
 * POST ../api/admin/group/
 */

/**
 * Update an existing group info
 * PUT ../api/admin/group/:group_id
 */

/**
 * Get all the roles of a certain group
 * GET ../api/admin/role/getall/
 */

/**
 * Get role info
 * GET ../api/admin/role/get/:role_id
 */

/**
 * Create a new role
 * POST ../api/admin/role/
 */

/**
 * Update an exsting role
 * PUT ../api/admin/role/:role_id
 */

/**
 * Delete a role
 * DELETE ../api/admin/role/:role_id
 */

/**
 * Get all the employee account of current group
 * GET ../api/admin/employee/getall
 */

/**
 * Get a employee account info
 * GET ../api/admin/employee/get/:employee_id
 */

/**
 * Create an account
 * POST ../api/admin/employee/
 */

/**
 * Update an account
 * PUT ../api/admin/gemployee/
 */

/**
 * Get all the off type
 * GET ../api/admin/off/getall
 */

/**
 * Get an off type info
 * GET ../api/admin/off/get/:off_id
 */

/**
 * Create an off type info
 * POST ../api/admin/off/
 */

/**
 * Update an off type info
 * PUT ../api/admin/off/:off_id
 */

module.exports = router;
