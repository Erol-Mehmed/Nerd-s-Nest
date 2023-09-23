exports.up = async function (db) {
  await db.query(`
    CREATE DATABASE nerds_nest
  `);

  await db.query(`
    USE nerds_nest
  `);
};
