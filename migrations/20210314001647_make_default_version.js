
exports.up = function(knex) {
    return knex.schema.alterTable('policies', function (table) {
        table.integer('version').defaultTo(1).alter();
    })
};

exports.down = function(knex) {
  
};
