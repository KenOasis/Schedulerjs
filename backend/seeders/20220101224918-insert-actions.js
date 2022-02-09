"use strict";

const actions = [
  {
    key: "M0",
    name: "General management functionality",
    description:
      "General management functionality which all management role should have and do not need to be assigned to",
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
