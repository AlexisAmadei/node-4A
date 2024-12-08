const colors = require("colors");

let userCart = {
    items: [],
};

function addItemToCart(movieId, movieName) {
    const alreadyInCart = userCart.items.some(item => item.movieId === movieId);

    if (alreadyInCart) {
        console.log(`❗ ${movieName} est déjà dans votre panier.`.yellow);
    } else {
        userCart.items.push({ movieId, movieName });
        console.log(`✅ ${movieName} a été ajouté à votre panier.`.green);
    }
}

function removeItemFromCart(movieId) {
    const initialLength = userCart.items.length;
    userCart.items = userCart.items.filter(item => item.movieId !== movieId);

    if (userCart.items.length === initialLength) {
        console.log("❌ Aucun film trouvé avec cet ID dans le panier.".red);
    } else {
        console.log(`🗑️ Film avec ID ${movieId} supprimé du panier.`.green);
    }
}

function getCart() {
    return userCart.items;
}

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


function emptyCart() {
    userCart.items = [];
    console.log("🛒 Votre panier est maintenant vide.".blue);
}

module.exports = { addItemToCart, removeItemFromCart, getCart, emptyCart, displayCart };