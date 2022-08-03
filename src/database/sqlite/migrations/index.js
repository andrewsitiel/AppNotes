const databaseConnect = require('../../sqlite/index');
const createTableUsers = require('./create_table_users');

async function migrationsRun() {
  const schemas = [createTableUsers].join('');

  await databaseConnect()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error));
};

module.exports = migrationsRun;
