
exports.up = function(knex) {
    return knex.schema.alterTable('improvement_frameworks', function(table) {
        table.text('description').alter();
        table.text('example').alter();
    })
};

exports.down = function(knex) {
  
};
