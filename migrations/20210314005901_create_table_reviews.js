
exports.up = function(knex) {
    return knex.schema.createTable('reviews', function (table) {
        table.increments();
        table.integer('policy_id').notNullable().unique();
        table.date('date_approved');
        table.integer('review_interval').notNullable();
        table.date('specified_review_date').notNullable();
        table.date('next_review');
        table.string('status');
        table.timestamps();
        table.foreign('policy_id').references('id').inTable('policies');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('reviews');
};
