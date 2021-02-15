
exports.up = function(knex) {
    return knex.schema.alterTable('risk_drivers', function(table) {
        table.text('definition').alter();
        table.text('type_of_event').alter();
    })
};

exports.down = function(knex) {
  
};
