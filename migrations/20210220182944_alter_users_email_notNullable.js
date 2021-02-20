
exports.up = function(knex) {
    return knex.schema.alterTable('users', function (table) {
        table.string('email').notNullable().alter();
    })
};

exports.down = function(knex) {
  
};
