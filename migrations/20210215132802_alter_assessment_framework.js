
exports.up = function(knex) {
    return knex.schema.alterTable('assessment_frameworks', function(table) {
        table.text('sub_category').alter();
        table.text('description').alter();
    })
};

exports.down = function(knex) {
  
};
