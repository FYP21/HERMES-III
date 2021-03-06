
exports.up = function(knex) {
    return knex.schema.alterTable('standard_assessment_frameworks', function (table) {
        table.renameColumn('assesment_framework_id', 'assessment_framework_id');
    })
};

exports.down = function(knex) {
  
};
