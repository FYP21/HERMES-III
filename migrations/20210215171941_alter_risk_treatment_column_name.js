
exports.up = function(knex) {
    return knex.schema.alterTable('risk_treatments', function (table) {
        table.renameColumn('residule_risk_rating', 'residual_risk_rating')
    })
};

exports.down = function(knex) {
  
};
