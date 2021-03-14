
exports.up = function(knex) {
    return knex.schema.alterTable('reviews', function (table) {
        table.dropUnique('policy_id', 'reviews_policy_id_unique');
      });
};

exports.down = function(knex) {
  
};
