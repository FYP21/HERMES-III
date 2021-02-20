
exports.up = function(knex) {
    return knex.schema.alterTable('users', function (table) {
        table.string('name').notNullable().alter();
        table.string('email').notNullable().alter();
        table.string('password').notNullable().alter();
        table.string('role').notNullable().alter();
      });
};

exports.down = function(knex) {
  
};
