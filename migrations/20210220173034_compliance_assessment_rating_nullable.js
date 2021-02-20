
exports.up = function(knex) {
    return knex.schema.alterTable('compliance_assessments', function (table) {
        table.string('policy').notNullable().alter();
        table.string('procedures').notNullable().alter();
        table.string('data').notNullable().alter();
      });
};

exports.down = function(knex) {
  
};
