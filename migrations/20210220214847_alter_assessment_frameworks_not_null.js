
exports.up = function(knex) {
    return knex.schema.alterTable('assessment_frameworks', function (table) {
        table.string('category').notNullable().alter();
        table.string('sub_category').notNullable().alter();
    })
};

exports.down = function(knex) {
  
};
