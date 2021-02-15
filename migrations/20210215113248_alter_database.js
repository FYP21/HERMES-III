
exports.up = function(knex) {
  return knex.schema.alterTable('standards', function(table) {
      table.text('standard').alter();
  })
};

exports.down = function(knex) {
};
