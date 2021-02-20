
exports.up = function(knex) {
    return knex.schema.alterTable('users', function (table) {
        table.string('email').unique().alter();
    })
};

exports.down = function(knex) {
  
};
