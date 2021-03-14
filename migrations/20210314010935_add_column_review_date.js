
exports.up = function(knex) {
    return knex.schema.alterTable('reviews', function (table) {
        table.date('reviewed_date');
    });
};

exports.down = function(knex) {
  
};
