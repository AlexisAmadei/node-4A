const prompt = require('prompt-sync')({ sigint: true });
const colors = require('colors');
const { emptyCart, getCart } = require('../global/userCart');

/**
 * Displays the cart and handles the checkout process.
 * @param {Array} cart - The user's cart containing movie items.
 */
async function askCheckout() {
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
        console.log("\n✅ Paiement confirmé. Merci pour votre achat !".green.bold);
        emptyCart();
        console.log("Votre panier a été vidé.\n".yellow);
    } else {
        console.log("\n🛑 Paiement annulé. Vous pouvez revenir plus tard.".red);
    }
}

module.exports = { askCheckout };
