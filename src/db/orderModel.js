const knex = require('knex')(require('../../knexfile')['development']);

async function createOrder(id, clientMail, total, status) {
    return await knex('orders').insert({
        id,
        clientMail,
        total,
        status,
        orderDate: new Date(),
        updatedAt: new Date(),
    });
}

async function createOrderItems(orderId, movieId, quantity, price) {
    return await knex('order_items').insert({
        orderId,
        movieId,
        quantity,
        price,
    })
}

async function getOrderbyId(orderId) {
    try {
        const orderItems = await knex('order_items')
            .where({ orderId })
            .select('orderId', 'movieId', 'quantity', 'price');

        return orderItems;
    } catch (error) {
        console.error(`Erreur lors de la récupération des items pour orderId ${orderId}:`, error);
        throw error;
    }
}

async function getAllOrders() {
    return knex('orders').select('*');
}

module.exports = {
    getAllOrders,
    createOrder,
    createOrderItems,
    getOrderbyId,
};
