
exports.up = function(knex) {
    return knex.schema.alterTable('compliance_assessments', function (table) {
        table.dropColumn('risk_driver_id');
    })
};

exports.down = function(knex) {
  
};
