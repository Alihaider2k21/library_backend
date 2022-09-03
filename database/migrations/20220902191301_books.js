/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("books", function (table) {
    table.increments("id");
    table.string("bookName", 255).notNullable();
    table.string("author", 255).notNullable();
    table.integer("borrowedBy").unsigned();
    // table.integer('borrowedBy_id').references('id').on('student').OnDelete('CASCADE');
    table.foreign("borrowedBy").references("id").inTable("student").onDelete('CASCADE');
    table.date("dateOfBorrow", 255).notNullable();
    table.date("dateOfReturn", 255).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("books");
};
