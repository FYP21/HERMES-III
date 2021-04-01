
exports.up = function(knex) {
    return knex.schema.alterTable('standards', function (table) {
        table.text('standard').notNullable().alter();
        table.string('sub_domain').notNullable().alter();
        table.string('domain').notNullable().alter();
    });
};

exports.down = function(knex) {
  
};
