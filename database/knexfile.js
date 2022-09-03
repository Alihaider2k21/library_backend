// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "library_database",
      user: "postgres",
      password: "postgres",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
