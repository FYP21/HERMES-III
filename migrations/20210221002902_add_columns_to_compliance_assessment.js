
exports.up = function(knex) {
    return knex.schema.alterTable('compliance_assessments', function (table) {
        table.string('treatment_option');
        table.string('treatment_description');
        table.string('residual_risk_rating');
    });
};

exports.down = function(knex) {
  
};
