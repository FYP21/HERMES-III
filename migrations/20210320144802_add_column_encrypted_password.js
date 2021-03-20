
exports.up = function(knex) {
    return knex.schema.alterTable('users', function (table) {
        table.string('encrypted_password');
    });
};

exports.down = function(knex) {
  
};
