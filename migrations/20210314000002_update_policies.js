
exports.up = function(knex) {
    return knex.schema.alterTable('policies', function (table) {
        table.dropColumn('date_approved');
        table.dropColumn('review_interval');
        table.dropColumn('specified_review_date');
        table.dropColumn('next_review');
      });
};

exports.down = function(knex) {
    return knex.schema.alterTable('policies', function (table) {
        table.addColumn('date_approved');
        table.addColumn('review_interval');
        table.addColumn('specified_review_date');
        table.addColumn('next_review');
      });
};
