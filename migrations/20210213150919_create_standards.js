
exports.up = function(knex) {
    return knex.schema.createTable('standards', function (table) {
        table.increments();
        table.string('core');
        table.string('cs');
        table.string('domain');
        table.string('sub_domain');
        table.string('standard');
        table.timestamps();
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('standards');
};
