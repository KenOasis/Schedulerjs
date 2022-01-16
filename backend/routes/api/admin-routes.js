const express = require("express");
const router = express.Router();
const companyController = require("../../controllers/admin/companies-controllers");
const groupController = require("../../controllers/admin/groups-controllers");
const roleController = require("../../controllers/admin/roles-controllers");
const adminEmployeeController = require("../../controllers/admin/employees-controllers");
const offController = require("../../controllers/admin/offs-controllers");

const dataValidator = require("../../middleware/data-validator");
const authChecker = require("../../middleware/auth-checker");
/**
 * Sign up a new company account
 * POST ../api/admin/signup
 * body: {
 *  name,
 *  address,
 *  email,
 *  phone,
 *  password,
 *  password_confirmation
 * }
 */
router.post(
  "/signup",
  dataValidator.companySignupValidation,
  companyController.signup
);

/**
 * Login company account
 * POST ../api/admin/login
 * body {
 *  email,
 *  password
 * }
 *
 * return {
 *    status: "success",
 *    token: token
 * }
 */
router.post("/login", companyController.login);

router.use(authChecker);

/**
 * Update basic company info
 * PUT ../api/admin/
 * // Each property of body is OPTIONAL
 * body: {
 *  name,
 *  address,
 *  phone
 * }
 */
router.put("/", companyController.update);

/**
 * Update password of company account
 * PUT ../api/admin/change_pw/
 */

router.put("/change_pw/", companyController.updatePassword);

/**
 * Get company info
 * GET ../api/admin/
 */
router.get("/", companyController.getCompany);

/**
 * Get all the group of the current company account
 * GET ../api/admin/group/all/
 */
router.get("/group/all", groupController.getGroupsByCompany);

/**
 * Get the group info
 * GET ../api/admin/group/:group_id
 */
router.get("/group/:group_id", groupController.getGroupById);

/**
 * Create a new group
 * POST ../api/admin/group/
 */
router.post("/group", groupController.creatGroup);

/**
 * Update an existing group info
 * PUT ../api/admin/group/:group_id
 */
router.put("/group/:group_id", groupController.updateGroup);

/**
 * Get all the assignable actions
 * GET ../api/admin/actions
 */

router.get("/actions", roleController.getActions);
/**
 * Get all the roles of a certain group
 * GET ../api/admin/role/all/:group_id
 */
router.get("/role/all/:group_id", roleController.getRolesByGroup);

/**
 * Get role info
 * GET ../api/admin/role/:role_id
 */
router.get("/role/:role_id", roleController.getRolesById);

/**
 * Create a new role
 * POST ../api/admin/role/
 */
router.post("/role/", roleController.createRole);

/**
 * Update an exsting role
 * PUT ../api/admin/role/:role_id
 */
router.put("/role/:role_id", roleController.updateRole);

/**
 * Delete a role
 * DELETE ../api/admin/role/:role_id
 */
router.delete("/role/:role_id", roleController.deleteRole);

/**
 * Get all the employee account of current group
 * GET ../api/admin/employee/getall
 */
router.get(
  "/employee/all/:group_id",
  adminEmployeeController.getEmployeeByGroup
);
/**
 * Get a employee account info
 * GET ../api/admin/employee/:employee_id
 */
router.get("/employee/:employee_id", adminEmployeeController.getEmployeeById);

/**
 * Create an account
 * POST ../api/admin/employee/
 */
router.post("/employee", adminEmployeeController.createEmployee);

/**
 * Update an account
 * PUT ../api/admin/gemployee/:employee_id
 */
router.put("/employee/:employee_id", adminEmployeeController.updateEmployee);
// TODISCUSS: Do we need a specific route to activated or deactivated mulitiple account(whole group) ?

router.post("/employee/activated", adminEmployeeController.activatedEmployee);

/**
 * Get all the off type of one company
 * GET ../api/admin/off/all/:company_id
 */
router.get("/off/all/:company_id", offController.getOffByCompany);

/**
 * Get an off type info
 * GET ../api/admin/off/:off_id
 */
router.get("/off/:off_id", offController.getOffById);

/**
 * Create an off type info
 * POST ../api/admin/off/
 */
router.post("/off", offController.createOff);

/**
 * Update an off type info
 * PUT ../api/admin/off/:off_id
 */
router.put("/off/:off_id", offController.updateOff);

module.exports = router;
