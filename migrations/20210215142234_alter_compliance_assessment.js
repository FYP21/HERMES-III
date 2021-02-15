
exports.up = function(knex) {
    return knex.schema.alterTable('compliance_assessments', function(table) {
        table.integer('standard_id').alter().notNullable();
    })
};

exports.down = function(knex) {
  
};
