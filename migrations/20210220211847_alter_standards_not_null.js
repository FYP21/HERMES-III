
exports.up = function(knex) {
    return knex.schema.alterTable('standards', function (table) {
        table.string('standard').notNullable().alter();
    })
};

exports.down = function(knex) {
  
};
