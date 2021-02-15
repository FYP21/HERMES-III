
exports.up = function(knex) {
    return knex.schema.renameTable('standard_policies', 'standardPolicies')

};

exports.down = function(knex) {
  
};
