
exports.up = function(knex) {
    return knex.schema.createTable('policies_and_procedures', function (table) {
        table.increments();
        table.string('theme');
        table.string('category');
        table.integer('PMM_Ref_#');
        table.string('title');
        table.integer('version');
        table.date('date_approved');
        table.integer('review_interval');
        table.date('specified_review_date');
        table.date('last_reviewed');
        table.date('last_modified');
        table.date('next_review');
        table.timestamps();
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('policies_and_procedures');
};
