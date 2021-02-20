
exports.up = function(knex) {
    return knex.schema.createTable('standard_assessment_frameworks', function (table) {
        table.increments();
        table.integer('standard_id').notNullable();
        table.integer('assesment_framework_id').notNullable();
        table.unique(['standard_id', 'assesment_framework_id']);
        table.timestamps();
        
        table.foreign('standard_id').references('id').inTable('standards');
        table.foreign('assesment_framework_id').references('id').inTable('assessment_frameworks');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('standard_assessment_frameworks');
};
