
exports.up = function(knex) {
    return knex.schema.renameTable('standard_policy', 'standard_policies')
};

exports.down = function(knex) {
    return knex.schema.renameTable('standard_policies', 'standard_policy')
};
