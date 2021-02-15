
exports.up = function(knex) {
    return knex.schema.createTable('standard_risk_driver', function (table) {
        table.increments();
        table.integer('standard_id');
        table.integer('risk_driver_id');
        table.timestamps();
        
        table.foreign('standard_id').references('id').inTable('standards');
        table.foreign('risk_driver_id').references('id').inTable('risk_drivers');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('standard_risk_driver');
};
