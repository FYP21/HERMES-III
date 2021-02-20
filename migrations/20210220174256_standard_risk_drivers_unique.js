
exports.up = function(knex) {
    return knex.schema.alterTable('standard_risk_drivers', function (table) {
        table.unique(['standard_id', 'risk_driver_id']);
    })
};

exports.down = function(knex) {
  
};
