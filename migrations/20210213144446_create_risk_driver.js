
exports.up = function(knex) {
    return knex.schema.createTable('risk_drivers', function (table) {
        table.increments();
        table.string('category');
        table.string('sub_category');
        table.string('definition');
        table.string('type_of_event');
        table.timestamps();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('risk_drivers');
};
