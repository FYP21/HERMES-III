
exports.up = function(knex) {
    return knex.schema.alterTable('compliance_assessments', function (table) {
        table.integer('standard_id').notNullable().alter();
      });
};

exports.down = function(knex) {
  
};
