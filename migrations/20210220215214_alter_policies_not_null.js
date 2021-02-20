
exports.up = function(knex) {
    return knex.schema.alterTable('policies', function (table) {
        table.string('category').notNullable().alter();
        table.string('theme').notNullable().alter();
        table.string('title').notNullable().alter();
        table.string('title').unique().alter();
    })
};

exports.down = function(knex) {
  
};
