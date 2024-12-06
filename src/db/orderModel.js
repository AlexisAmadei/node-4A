const knex = require('knex')(require('../../knexfile')['development']);

async function getAllOrders() {
    return knex('orders').select('*');
}

module.exports = {
    getAllOrders
};