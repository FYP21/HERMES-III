
exports.up = function(knex) {
  return knex.schema.alterTable('compliance_assessments', function(table) {
    table.dropColumn('treatment_option');
    table.dropColumn('treatment_description');
    table.dropColumn('residual_risk_rating');
  })
};

exports.down = function(knex) {
  
};
