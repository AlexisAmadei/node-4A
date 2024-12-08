const prompt = require('prompt-sync')({ sigint: true });
const colors = require('colors');
const { emptyCart, getCart } = require('../global/userCart');
const { createOrder, updateOrderStatus } = require('../db/orderModel');
const { createNewOrder } = require('../utils/createOrder');

async function askCreditCard() {
    console.log('🔒 Veuillez entrer les informations de votre carte de crédit :'.green);
    const creditCard = prompt('Numéro de carte : '.blue);
    if (creditCard === 'skip')
        return { creditCard: 'skip', cvv: 'skip', expiryDate: 'skip', cardHolder: 'skip' };
    const cvv = prompt('Code CVV : '.blue);
    const expiryDate = prompt('Date d\'expiration (MM/YY) : '.blue);
    const cardHolder = prompt('Nom du titulaire de la carte : '.blue);
    console.log('🔒 Vérification des informations de la carte de crédit...'.green);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('🔒 Informations de carte de crédit vérifiées.'.green);
    return { creditCard, cvv, expiryDate, cardHolder };
}

/**
 * Displays the cart and handles the checkout process.
 * @param {Array} cart - The user's cart containing movie items.
 */
async function askCheckout(clientMail) {
    console.log("\n🛒 Processus de paiement en cours...\n".yellow.bold);
    const cart = getCart();
    if (cart.length === 0) {
        console.log("Votre panier est vide. Ajoutez des articles avant de passer à la caisse.".red);
        return;
    }
    console.log("Voici les articles dans votre panier :\n".green.bold);
    let totalCost = 0;
    cart.forEach((item, index) => {
        console.log(
            `${(index + 1).toString().cyan}. 🎥 ${item.movieName.green} (ID: ${item.movieId.toString().blue}) - Prix: ${item.price.toFixed(2)} €`
        );
        totalCost += item.price;
    });
    console.log(`\n💰 Montant total : ${totalCost.toFixed(2)} €\n`.yellow.bold);
    const confirmation = prompt("Confirmez-vous votre achat ? (oui/non) : ".blue).toLowerCase();

    if (confirmation === 'oui') {
        const orderId = await createNewOrder(cart, clientMail);
        if (orderId) {
            const { creditCard, cvv, expiryDate, cardHolder } = await askCreditCard();
            console.log('🔒 Paiement en cours...'.green);
            console.log('🔒 Paiement effectué avec succès.'.green);

            // Empty the cart after successful payment
            emptyCart();
            console.log('🎉 Merci pour votre achat !'.green);

            // Update order status to 'paid'
            await updateOrderStatus(orderId, 'paid');
        }
    } else {
        console.log('🚫 Paiement annulé.'.red);
    }
}

module.exports = { askCheckout };
