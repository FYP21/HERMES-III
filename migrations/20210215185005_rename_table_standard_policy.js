
exports.up = function(knex) {
    return knex.schema.renameTable('standardPolicies', 'standard_policy')
};

exports.down = function(knex) {
  
};
