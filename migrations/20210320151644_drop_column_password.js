
exports.up = function(knex) {
    return knex.schema.alterTable('users', function (table) {
        table.dropColumn('password');
    });
};

exports.down = function(knex) {
  
};
