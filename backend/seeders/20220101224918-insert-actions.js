"use strict";

const actions = [
  {
    key: "E1",
    name: "Record Timestamp",
    description: "Record the timestamp when starting/ending shift/break.",
  },
  {
    key: "E2",
    name: "Setting available working time",
    description:
      "Setting up the available working time frame for every weekday/weekend.",
  },
  {
    key: "E3",
    name: "Request day off",
    description: "Request day off or vacation for future",
  },
  {
    key: "M1",
    name: "Reset Team member's password",
    description:
      "Reset all group members' password. This should be the group leader's action.",
  },

  {
    key: "M2",
    name: "Manage the day off request",
    description: "Approved/Declined day off request  for the future.",
  },
  {
    key: "M3",
    name: "Manage punch records",
    description: "Adjusting the timestamp for the finished shift.",
  },
  {
    key: "M4",
    name: "Manage Schedule",
    description:
      "Creating, modifying, publishing, or deleting the unpublished incoming sheduled. This should be the group leader's action.",
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Actions", null, {});
    await queryInterface.bulkInsert("Actions", actions);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Action", null, {});
  },
};
