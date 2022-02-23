const express = require("express");
const router = express.Router();
const authChecker = require("../../middleware/auth-checker");
const employeeControllers = require("../../controllers/group/employee-controllers");
const emplyeeActivationChecker = require("../../middleware/employee-activation-checker");
const dataValidator = require("../../middleware/data-validator");
const employeeActionChecker = require("../../middleware/employee-action-checker");
const managerControllers = require("../../controllers/group/manager-controllers");
/**
 * Employee Login
 * .../api/group/login  POST
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
 * .../api/group/employee_info  GET
 */
router.get("/employee_info", employeeControllers.getEmployeeInfo);

/**
 * Update employee's emergency_contact
 * .../api/group/emergency_contact PUT
 */
router.put(
  "/emergency_contact",
  dataValidator.emergencyContactValidator,
  employeeControllers.updateEmergencyContact
);

/**
 * Employee change their password
 * .../api/group/change_pw POST
 */
router.put(
  "/change_pw",
  dataValidator.employeePasswordValidator,
  employeeControllers.updatePassword
);

/**
 * Employee get a punch record of the given date
 * .../api/group/punch/:year&:month&:day   GET
 */
router.get(
  "/punch/:year&:month&:day",
  dataValidator.paramsValidator,
  employeeControllers.getPunchRecordsByDate
);

// Middlerware to check employee's activation status
router.use(emplyeeActivationChecker);

/**
 * Employee get the schedule of the given timestamp
 * .../api/group/schedule/:year&:month&:day  GET
 */
router.get("/schedule/:year&:month&:day");

/**
 * Employee record timestamp
 * employee should be logout after this action
 * .../api/group/record_time  POST
 */
router.post(
  "/punch/record_time",
  dataValidator.recordedPunchTimeValidator,
  employeeControllers.recordedTimestamp
);

// Belowed is activated employee only
/**
 * Employee set the available time of weekday/weekend
 * .../api/group/available  POST
 */
router.post(
  "/available",
  dataValidator.employeeSetAvailableValidator,
  employeeControllers.setAvailableTime
);

/**
 * Get logged-in employee availabel time for a specific time period
 * .../api/group/available    GET
 */
router.get(
  "/available/:year&:month&:day",
  dataValidator.paramsValidator,
  employeeControllers.getAvailableTime
);
/**
 * Employee get all the dayoff request records of current employee
 * .../api/group/dayoff GET
 */

router.get("/dayoff/all", employeeControllers.getOffRecords);

/**
 * Employee get the dayoff request record
 * .../api/group/dayoff/:off_record_id  GET
 */
router.get("/dayoff/:off_record_id", employeeControllers.getOffRecordById);

/**
 * Employee request a day off
 * .../api/group/dayoff POST
 */

router.post(
  "/dayoff",
  dataValidator.createOffRecordsValidator,
  employeeControllers.creatOffRecord
);

/**
 * Employee update a un-reviwed day off
 * .../api/group/dayoff/
 */

/*******************Above are routes that ONLY check activation status******************/

//middleware to check role action status

/**
 * Get the all employees' info of the group
 * .../group/manage/employee_info
 */

// TOFIX  (return obj properties)
router.get(
  "/manage/employee_info/all",
  employeeActionChecker("M0"),
  managerControllers.getEmployees
);

router.get("/manage/employee_info/:employee_id");

/**
 * Get all the available time of the group members in a special day
 * .../group/manage/available/all/:year&:month:&day
 */

router.get(
  "/manage/available/all/:year&:month&:day",
  employeeActionChecker("M0"),
  managerControllers.getAvailableTimeOfGroup
);

/**
 * Get all the dayoff records of the group
 * .../group/manage/dayoff/all
 */

// TOFIX (return obj properties)
router.get(
  "/manage/dayoff/all/",
  employeeActionChecker("M0"),
  managerControllers.getOffRecordsOfGroup
);

/**
 * Get the specific dayoff records of the group
 * .../group/manage/dayoff/:off_records_id
 */

router.get(
  "/manage/dayoff/:off_record_id",
  employeeActionChecker("M0"),
  managerControllers.getOffRecordsById
);

/**
 * Employee approved/decline a day off request
 * .../group/dayoff/:off_record_id  PUT
 */
router.put("/dayoff/review/:off_record_id");

//  Not checked routes
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
router.get("/manage/punch/:year&:month&:day");

module.exports = router;
