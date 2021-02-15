
exports.up = function(knex) {
    return knex.schema.createTable('improvement_frameworks', function (table) {
        table.increments();
        table.string('theme');
        table.string('category');
        table.string('description');
        table.string('example');
        table.timestamps();
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('improvement_frameworks');
};
