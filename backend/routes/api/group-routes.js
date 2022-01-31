const express = require("express");
const router = express.Router();
const authChecker = require("../../middleware/auth-checker");
const employeeControllers = require("../../controllers/group/employee-controllers");
/**
 * Employee Login
 * .../group/login  POST
 */

router.post("/login", employeeControllers.login);

// TODO add middleware check activation status of the account
// check login status
router.use(authChecker.employee);
/**
 * Employee change their password
 * .../group/change_pw POST
 */

router.post("/change_pw", employeeControllers.updatePassword);

/**
 * Employee record timestamp
 * employee should be logout after this action
 * .../group/sign  POST
 */
router.post("/sign");

/**
 * Employee get the schedule of the given timestamp
 * .../group/schedule/:year&:month&:day  GET
 */
router.get("/schedule/:year&:month&:day");

/**
 * Employee set the available time of weekday/weekend
 * .../group/available/   POST
 */
router.post("/available");

/**
 * Employee get the dayoff request records
 * .../group/dayoff   GET
 */
router.get("/dayoff");

/**
 * Employee request a day off
 * .../group/dayoff   POST
 */

router.post("/dayoff");

/**
 * Employee get a punch record of the given date
 * .../group/punch/:year&:month&:day   GET
 */
router.get("/punch/:year&:month&:day");
/*******************Above are routes that ONLY check activation status******************/

// TODO add middleware to check role action status

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
router.put("/dayoff/:punch_record_id");
module.exports = router;
