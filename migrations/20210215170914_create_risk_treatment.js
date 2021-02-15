
exports.up = function(knex) {
    return knex.schema.createTable('risk_treatments', function (table) {
        table.increments();
        table.integer('assessment_id');
        table.string('option');
        table.string('description');
        table.string('residule_risk_rating');
        table.timestamps();

        table.foreign('assessment_id').references('id').inTable('compliance_assessments');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('risk_treatments');

};
