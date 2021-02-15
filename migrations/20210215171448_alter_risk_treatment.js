
exports.up = function(knex) {
    return knex.schema.alterTable('risk_treatments', function (table) {
        table.text('description').alter()
    })
};

exports.down = function(knex) {
  
};
