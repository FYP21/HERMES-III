
exports.up = function(knex) {
    return knex.schema.dropTable('risk_treatments');
};

exports.down = function(knex) {
};
