const express = require("express");
const router = express.Router();

/**
 * Employee Login
 * .../employee/login  POST
 */

router.post("/login");

// TODO add middleware check login status

// TODO add middleware check activation status of the account

/**
 * Employee change their password
 * .../employee/change_pw POST
 */
router.post("/change_pw");

/**
 * Employee record timestamp
 * employee should be logout after this action
 * .../employee/sign  POST
 */
router.post("/sign");

/**
 * Employee get the schedule of the given timestamp
 * .../employee/schedule/:year&:month&:day  GET
 */
router.get("/schedule/:year&:month&:day");

/**
 * Employee set the available time of weekday/weekend
 * .../employee/available/   POST
 */
router.post("/available");

/**
 * Employee get the dayoff request records
 * .../employee/dayoff   GET
 */
router.get("/dayoff");

/**
 * Employee request a day off
 * .../employee/dayoff   POST
 */

router.post("/dayoff");

/**
 * Employee get a punch record of the given date
 * .../employee/punch/:year&:month&:day   GET
 */
router.get("/punch/:year&:month&:day");
/*******************Above are routes that ONLY check activation status******************/

// TODO add middleware to check role action status

/**
 * Employee make a schedule
 * .../employee/schedule/   POST
 */
router.post("/schedule");

/**
 * Employee updated a unpublished schedule
 * .../employee/schedule/:schedule_id   PUT
 */
router.put("/schedule/:schedule_id");

/**
 * Employee publish a schedule
 * .../employee/schedule/publish/:schedule_id  PUT
 */
router.put("/schedule/publish/:schedule_id");

/**
 * Employee get all punch records of the group of give date
 * .../empoyee/punch/all/:year&:month&:day  GET
 */
router.get("/punch/:year&:month&:day");

/**
 * Employee modified a punch record
 * .../employee/punch/:punch_record_id  PUT
 */
router.put("/punch/:punch_record_id");

/**
 * Employee approved a day off request
 * .../employee/dayoff/:off_record_id  PUT
 */
router.put("/dayoff/:punch_record_id");
module.exports = router;
