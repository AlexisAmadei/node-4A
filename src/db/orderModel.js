const knex = require('knex')(require('../../knexfile')['development']);

async function createOrder(orderId, clientMail, total, status) {
    return await knex('orders').insert({
        id: orderId,
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

async function deleteOrder(orderId) {
    return await knex('orders')
        .where({ id: orderId })
        .del();
}

module.exports = {
    getAllOrders,
    createOrder,
    createOrderItems,
    getOrderbyId,
    deleteOrder,
};
