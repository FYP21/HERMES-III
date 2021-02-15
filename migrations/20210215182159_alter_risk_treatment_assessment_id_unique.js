
exports.up = function(knex) {
    return knex.schema.alterTable('risk_treatments', function (table) {
        table.integer('assessment_id').alter().unique()
    })
};

exports.down = function(knex) {
  
};
