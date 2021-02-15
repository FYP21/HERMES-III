
exports.up = function(knex) {
    return knex.schema.alterTable('standard_policies', function (table) {
        table.renameColumn('policy_id', 'policies_and_procedure_id')
    })
};

exports.down = function(knex) {
  
};
