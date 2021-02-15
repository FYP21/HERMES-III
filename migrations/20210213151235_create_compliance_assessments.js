
exports.up = function(knex) {
    return knex.schema.createTable('compliance_assessments', function (table) {
        table.increments();
        table.integer('standard_id');
        table.string('policy');
        table.string('procedures');
        table.string('data');
        table.string('risk_rating');
        table.integer('risk_driver_id');
        table.string('treatment_option');
        table.string('treatment_description');
        table.string('residual_risk_rating');
        table.timestamps();

        table.foreign('standard_id').references('id').inTable('standards');
        table.foreign('risk_driver_id').references('id').inTable('risk_drivers');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('compliance_assessments');
};
