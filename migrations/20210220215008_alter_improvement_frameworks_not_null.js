
exports.up = function(knex) {
    return knex.schema.alterTable('improvement_frameworks', function (table) {
        table.string('category').notNullable().alter();
        table.string('theme').notNullable().alter();
    })
};

exports.down = function(knex) {
  
};
