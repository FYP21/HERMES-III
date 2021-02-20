
exports.up = function(knex) {
    return knex.schema.createTable('standard_improvement_frameworks', function (table) {
        table.increments();
        table.integer('standard_id').notNullable();
        table.integer('improvement_framework_id').notNullable();
        table.unique(['standard_id', 'improvement_framework_id']);
        table.timestamps();
        
        table.foreign('standard_id').references('id').inTable('standards');
        table.foreign('improvement_framework_id').references('id').inTable('improvement_frameworks');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('standard_improvement_frameworks');
};
