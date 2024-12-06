const { addItemToCart, emptyCart, getCart, removeItemFromCart } = require('../global/userCart.js');
const { chatbot_cart } = require("../training/cart");
const prompt = require("prompt-sync")({ sigint: true });

async function askCart() {
    const input = prompt("Que souhaitez-vous faire avec votre panier ? ".blue);
    const predicted_response = chatbot_cart.classify(input);

    if (predicted_response[0]) {
        switch (predicted_response[0]) {
            case "add":
                // Ajout d'un article au panier
                const itemToAdd = prompt("Quel article voulez-vous ajouter au panier ? ".green);
                addItemToCart(itemToAdd);
                console.log("Article ajouté au panier avec succès.");
                break;

            case "empty":
                // Vider le panier
                emptyCart();
                console.log("Le panier a été vidé.");
                break;

            case "get":
                // Afficher le contenu du panier
                const cartContents = getCart();
                console.log("Voici les articles dans votre panier : ");
                console.log(cartContents);
                break;

            case "remove":
                // Retirer un article du panier
                const itemToRemove = prompt("Quel article voulez-vous retirer du panier ? ".red);
                removeItemFromCart(itemToRemove);
                console.log("Article retiré du panier.");
                break;

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