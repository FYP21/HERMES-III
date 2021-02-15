
exports.up = function(knex) {
    return knex.schema.alterTable('policies_and_procedures', function(table) {
        table.text('title').alter();
        table.renameColumn('PMM_Ref_#', 'PMM_Ref');
    })
};

exports.down = function(knex) {
  
};
