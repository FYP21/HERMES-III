
exports.up = function(knex) {
    return knex.schema.renameTable('policies_and_procedures', 'policies')
};

exports.down = function(knex) {
    return knex.schema.renameTable('policies', 'policies_and_procedures')
};
