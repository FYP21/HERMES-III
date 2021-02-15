
exports.up = function(knex) {
  return knex.schema.createTable('assessment_frameworks', function (table) {
    table.increments();
    table.string('category');
    table.string('sub_category');
    table.text('description');
    table.timestamps();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('assessment_frameworks');
};
