
exports.up = function(knex) {
    return knex.schema.alterTable('policies_and_procedures', function(table) {
        table.renameColumn('PMM_Ref', 'pmm_ref');
    })
};

exports.down = function(knex) {
  
};
