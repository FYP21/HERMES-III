
exports.up = function(knex) {
    return knex.schema.alterTable('users', function (table) {
        table.string('password');
    });
};

exports.down = function(knex) {
  
};
