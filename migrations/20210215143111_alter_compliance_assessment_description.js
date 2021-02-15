
exports.up = function(knex) {
    return knex.schema.alterTable('compliance_assessments', function(table) {
        table.text('treatment_description').alter()
    })
};

exports.down = function(knex) {
  
};
