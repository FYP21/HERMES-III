
exports.up = function(knex) {
    return knex.schema.alterTable('policies', function (table) {
        table.dropColumn('last_modified');
      });
};

exports.down = function(knex) {
  
};
