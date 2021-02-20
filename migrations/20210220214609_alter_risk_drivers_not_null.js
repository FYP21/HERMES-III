
exports.up = function(knex) {
    return knex.schema.alterTable('risk_drivers', function (table) {
        table.string('category').notNullable().alter();
        table.string('sub_category').notNullable().alter();
        table.string('definition').notNullable().alter();
    })
};

exports.down = function(knex) {
  
};
