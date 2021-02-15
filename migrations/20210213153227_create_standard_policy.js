
exports.up = function(knex) {
    return knex.schema.createTable('standard_policy', function (table) {
        table.increments();
        table.integer('standard_id');
        table.integer('policy_id');
        table.timestamps();
        
        table.foreign('standard_id').references('id').inTable('standards');
        table.foreign('policy_id').references('id').inTable('policies_and_procedures');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('standard_policy');
};
