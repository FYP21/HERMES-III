
exports.up = function(knex) {
    return knex.schema.alterTable('standard_policies', function (table) {
        table.renameColumn('policies_and_procedure_id', 'policy_id');
    })
};

exports.down = function(knex) {
  
};
