"use strict";

const actions = [
  {
    name: "Reset teams' password",
    description:
      "Reset all group members' password. This should be the group leader's action.",
  },
  {
    name: "Record Timestamp",
    description: "Record the timestamp when starting/ending shift/break.",
  },
  {
    name: "Setting available working time",
    description:
      "Setting up the available working time frame for every weekday/weekend.",
  },
  {
    name: "Request day off",
    description: "Request day off or vacation for the future.",
  },
  {
    name: "Adjusting timestamp",
    description:
      "Adjusting the timestamp for the finished shift. This should be the group leader's action.",
  },
  {
    name: "Making Schedule",
    description:
      "Creating, modifying, publishing, or deleting the incoming sheduled. This should be the group leader's action.",
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
