const knex = require('knex')(require('../../knexfile')['development']);

/**
 * Creates an order in the database.
 * @param {string} orderId - The order ID.
 * @param {string} clientMail - The client's email.
 * @param {number} total - The total cost of the order.
 * @param {string} status - The status of the order.
 * @returns {Promise} - The result of the insertion query.
 */
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

/**
 * Creates order items in the database.
 * @param {string} orderId - The order ID.
 * @param {string} movieId - The movie ID.
 * @param {number} quantity - The quantity of the movie.
 * @param {number} price - The price of the movie.
 * @returns {Promise} - The result of the insertion query.
 */
async function createOrderItems(orderId, movieId, quantity, price) {
    return await knex('order_items').insert({
        orderId,
        movieId,
        quantity,
        price,
    })
}

/**
 * Retrieves the order items for a given order ID.
 * @param {string} orderId - The order ID.
 * @returns {Promise} - The order items.
 */
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

/**
 * Retrieves all orders from the database.
 * @returns {Promise} - All orders.
 */
async function getAllOrders() {
    return knex('orders').select('*');
}

/**
 * Deletes an order from the database by ID.
 * @param {string} orderId - The order ID.
 * @returns {Promise} - The result of the deletion query.
 */
async function deleteOrder(orderId) {
    return await knex('orders')
        .where({ id: orderId })
        .del();
}

async function updateOrderStatus(orderId, status) {
    return await knex('orders')
        .where({ id: orderId })
        .update({ status });
}

module.exports = {
    getAllOrders,
    createOrder,
    createOrderItems,
    getOrderbyId,
    deleteOrder,
    updateOrderStatus,
};
