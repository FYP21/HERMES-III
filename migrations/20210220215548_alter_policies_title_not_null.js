
exports.up = function(knex) {
    return knex.schema.alterTable('policies', function (table) {
        table.string('title').notNullable().alter();
    })
};

exports.down = function(knex) {
  
};
