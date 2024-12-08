const colors = require("colors");

let userCart = {
    items: [],
};

/**
 * Adds a movie item to the user's cart.
 * @param {number} movieId - The ID of the movie to add to the cart.
 * @param {string} movieName - The name of the movie to add to the cart.
 * @returns {void}
*/
function addItemToCart(movieId, movieName, price) {
    const alreadyInCart = userCart.items.some(item => item.movieId === movieId);

    if (alreadyInCart) {
        console.log(`❗ ${movieName} est déjà dans votre panier.`.yellow);
    } else {
        userCart.items.push({ movieId, movieName, price: 9.99 });
        console.log(`✅ ${movieName} a été ajouté à votre panier.`.green);
    }
}

/**
 * Removes a movie item from the user's cart.
 * @param {number} movieId - The ID of the movie to remove from the cart.
 * @returns {void}
*/
function removeItemFromCart(movieId) {
    const initialLength = userCart.items.length;
    userCart.items = userCart.items.filter(item => item.movieId !== movieId);

    if (userCart.items.length === initialLength) {
        console.log("❌ Aucun film trouvé avec cet ID dans le panier.".red);
    } else {
        console.log(`🗑️ Film avec ID ${movieId} supprimé du panier.`.green);
    }
}

/**
 * Returns the user's cart items.
 * @returns {Array} The user's cart items.
*/
function getCart() {
    return userCart.items;
}

/**
 * Displays the user's cart items.
 * @returns {void}
 * */
function displayCart() {
    const cart = getCart();
    console.log("\n🛒 Voici les articles dans votre panier :\n".yellow.bold);

    if (cart.length === 0) {
        console.log("Votre panier est vide.".red);
    } else {
        cart.forEach((item, index) => {
            console.log(
                `${(index + 1).toString().cyan}. 🎥 ${item.movieName.green} (ID: ${item.movieId.toString().blue})`
            );
        });
    }
    console.log("\n");
}

/**
 * Empties the user's cart.
 * @returns {void}
 */
function emptyCart() {
    userCart.items = [];
    console.log("🛒 Votre panier est maintenant vide.".blue);
}

module.exports = { addItemToCart, removeItemFromCart, getCart, emptyCart, displayCart };