const knexconfigs = require("../../../knexfile");
const knex = require("knex");

const knexConnection = knex(knexconfigs.development);

module.exports = knexConnection;