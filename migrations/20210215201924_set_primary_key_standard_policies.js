
exports.up = function(knex) {
    return knex.schema.alterTable('standard_policies', function (table) {
        table.unique(['standard_id', 'policy_id']);
    })
};

exports.down = function(knex) {
  
};
