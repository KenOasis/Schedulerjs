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
 * Employee get the schedule of the given date (monthly or daily)
 * .../api/group/schedule/:year&:month&:day  GET
 */
router.get(
  "/schedule/:year&:month&:day",
  dataValidator.paramsValidator,
  employeeControllers.getSchedule
);

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
router.get(
  "/dayoff/:off_record_id",
  dataValidator.paramsValidator,
  employeeControllers.getOffRecordById
);

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
 * .../api/group/dayoff/:off_record_id
 */

router.put(
  "/dayoff/:off_record_id",
  dataValidator.paramsValidator,
  dataValidator.createOffRecordsValidator,
  employeeControllers.updateOffRecord
);

/*******************Above are routes that ONLY check activation status******************/

//middleware to check role action status

/**
 * Get the all employees' info of the group
 * .../group/manage/employee_info
 */

router.get(
  "/manage/employee_info/all",
  employeeActionChecker("M0"),
  managerControllers.getEmployeesByGroup
);

/**
 * Get the employees info of the given employee_id
 * .../group/manage/employee_info/:employee_id
 */
router.get(
  "/manage/employee_info/:employee_id",
  employeeActionChecker("M0"),
  dataValidator.adminCompanyValidator,
  managerControllers.getEmployeeById
);

/**
 * Get all the available time of the ACTIVATED group members in a special day
 * .../group/manage/available/all/:year&:month:&day
 */

router.get(
  "/manage/available/all/:year&:month&:day",
  employeeActionChecker("M0"),
  dataValidator.paramsValidator,
  managerControllers.getAvailableTimeOfGroup
);

/**
 * Get all the dayoff records of the ACTIVATED group members
 * .../group/manage/dayoff/all
 */

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
  dataValidator.paramsValidator,
  managerControllers.getOffRecordsById
);

/**
 * Approved/decline a day off request
 * .../group/dayoff/:off_record_id  PUT
 */
router.put(
  "/manage/dayoff/review/:off_record_id",
  employeeActionChecker("M2"),
  dataValidator.paramsValidator,
  dataValidator.reviewOffRecordValidator,
  managerControllers.reviewOffRecords
);

/**
 * Create a schedule
 * .../group/manage/schedule/   POST
 */
// TODO check whether the employee_id in the shift is in the current group (integrity)

router.post(
  "/manage/schedule",
  employeeActionChecker("M4"),
  dataValidator.scheduleValidator,
  managerControllers.createSchedule
);

/**
 * Updated a schedule
 * .../group/manage/schedule/:schedule_id   PUT
 */
router.put(
  "/manage/schedule/:schedule_id",
  employeeActionChecker("M4"),
  dataValidator.paramsValidator,
  dataValidator.scheduleValidator,
  managerControllers.updateSchedule
);

/**
 * Get schedule for the given date
 * .../group/manage/schedule/:year&month&date
 */
router.get(
  "/manage/schedule/:year&:month&:day",
  employeeActionChecker("M4"),
  dataValidator.paramsValidator,
  managerControllers.getSchedules
);

// TODO design the punch record apis of management
/**
 * Employee get all punch records of the group of the given date
 * .../group/manage/punch/:year&:month&:day  GET
 */
router.get("/manage/punch/:year&:month&:day");

/**
 * Employee (management role) added a new punch records
 * .../group/manage/punch/  POST
 */
router.post("/manage/punch");

/**
 * Employee modifies a punch records by the given punch_record_id
 * .../group/manage/punch/:punch_record_id  PUT
 */
router.put("/manage/punch/:punch_record_id");

module.exports = router;
