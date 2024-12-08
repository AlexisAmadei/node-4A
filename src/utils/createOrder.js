const md5 = require("md5");
const { createOrder, createOrderItems } = require("../db/orderModel");

async function createNewOrder(movieId, clientMail) {
    try {
        const productData = {
            id: movieId,
            price: 10,
        };
        const orderId = md5(clientMail).slice(1, 4);
        const total = productData.price;

        const status = "pending";

        const orderResult = await createOrder(orderId, clientMail, total, status);
        console.log("Résultat création commande :", orderResult);

        await createOrderItems(orderId, movieId, 1, total);

        console.log("Commande et article créés avec succès.");
        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        throw error;
    }
}

module.exports = { createNewOrder };