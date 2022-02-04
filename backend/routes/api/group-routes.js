const express = require("express");
const router = express.Router();
const authChecker = require("../../middleware/auth-checker");
const employeeControllers = require("../../controllers/group/employee-controllers");
const emplyeeActivationChecker = require("../../middleware/employee-activation-checker");
const dataValidator = require("../../middleware/data-validator");
const employeeActionChecker = require("../../middleware/employee-action-checker");
/**
 * Employee Login
 * .../group/login  POST
 */

router.post(
  "/login",
  dataValidator.employeeLoginValidator,
  employeeControllers.login
);

// check login status
router.use(authChecker.employee);

/**
 * Get Employee info
 * .../group/employee_info  GET
 */
router.get("/employee_info", employeeControllers.getEmployeeInfo);

/**
 * Update employee's emergency_contact
 * .../group/emergency_contact PUT
 */
router.put(
  "/emergency_contact",
  dataValidator.emergencyContactValidator,
  employeeControllers.updateEmergencyContact
);

/**
 * Employee change their password
 * .../group/change_pw POST
 */
router.post("/change_pw", employeeControllers.updatePassword);

/**
 * Employee get a punch record of the given date
 * .../group/punch/:year&:month&:day   GET
 */
//// TODO ////
router.get("/punch/:year&:month&:day");

// Middlerware to check employee's activation status
router.use(emplyeeActivationChecker);

/**
 * Employee get the schedule of the given timestamp
 * .../group/schedule/:year&:month&:day  GET
 */
router.get("/schedule/:year&:month&:day");

/**
 * Employee record timestamp
 * employee should be logout after this action
 * .../group/sign  POST
 */
router.post("/sign");

// Belowed is activated employee only
/**
 * Employee set the available time of weekday/weekend
 * .../group/available/   POST
 */
router.post("/available");

/**
 * Employee get the dayoff request records
 * .../group/dayoff GET
 */
router.get("/dayoff");

/**
 * Employee request a day off
 * .../group/dayoff POST
 */

router.post("/dayoff");

/*******************Above are routes that ONLY check activation status******************/

//middleware to check role action status

/**
 * Get the all employees' info of the group
 * .../group/employee_info
 */

router.get(
  "/employee_info/all",
  employeeActionChecker("M1"),
  employeeControllers.getEmployees
);
/**
 * Employee make a schedule
 * .../group/schedule/   POST
 */
router.post("/schedule");

/**
 * Employee updated a unpublished schedule
 * .../group/schedule/:schedule_id   PUT
 */
router.put("/schedule/:schedule_id");

/**
 * Employee publish a schedule
 * .../group/schedule/publish/:schedule_id  PUT
 */
router.put("/schedule/publish/:schedule_id");

/**
 * Employee get all punch records of the group of give date
 * .../empoyee/punch/all/:year&:month&:day  GET
 */
router.get("/punch/:year&:month&:day");

/**
 * Employee modified a punch record
 * .../group/punch/:punch_record_id  PUT
 */
router.put("/punch/:punch_record_id");

/**
 * Employee approved a day off request
 * .../group/dayoff/:off_record_id  PUT
 */
router.put("/dayoff/:off_record_id");
module.exports = router;
