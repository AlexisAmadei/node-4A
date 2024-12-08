const { addItemToCart, emptyCart, getCart, removeItemFromCart, displayCart } = require('../global/userCart.js');
const { chatbot_cart } = require("../training/cart");
const prompt = require("prompt-sync")({ sigint: true });

async function askCart() {

    displayCart();
    const input = prompt("Que souhaitez-vous faire avec votre panier ? ".blue);
    const predicted_response = chatbot_cart.classify(input);
    if (predicted_response[0]) {
        switch (predicted_response[0]) {
            case "add":
                return 'add';

            case "empty":
                emptyCart();
                return 'empty';

            case "get":
                displayCart();
                return 'display';

            case "remove":
                const itemToRemove = prompt("Quel article voulez-vous retirer du panier ? ".red);
                removeItemFromCart(itemToRemove);
                return 'removeItem';

            case "checkout":
                return 'checkout';
            default:
                console.log("Désolé, je n'ai pas compris votre demande. Veuillez réessayer.".red);
                break;
        }
    } else {
        console.log("Désolé, je n'ai pas compris votre demande. Veuillez réessayer.".red);
        await askCart();
    }
}

module.exports = { askCart };