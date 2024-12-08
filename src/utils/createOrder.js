const md5 = require("md5");
const { createOrder, createOrderItems } = require("../db/orderModel");

async function createNewOrder(cart, clientMail) {
    const orderId = md5(clientMail + new Date().toISOString());
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    await createOrder(orderId, clientMail, total, "pending");
    await Promise.all(cart.map(item => createOrderItems(orderId, item.movieId, 1, item.price)));
    return orderId;
}

module.exports = { createNewOrder };