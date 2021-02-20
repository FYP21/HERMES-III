
exports.up = function(knex) {
    return knex.schema.alterTable('risk_treatments', function (table) {
        table.integer('assessment_id').notNullable().alter();
        table.string('option').notNullable().alter();
      });
};

exports.down = function(knex) {
  
};
