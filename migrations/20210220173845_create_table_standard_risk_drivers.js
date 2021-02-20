
exports.up = function(knex) {
    return knex.schema.renameTable('standard_risk_driver', 'standard_risk_drivers');
};

exports.down = function(knex) {
  
};
