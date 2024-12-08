const { delAuthEntry } = require("../db/authModel");

async function logout() {
    console.log("Deconnexion en cours...".blue);
    const res = await delAuthEntry("");
    if (res) {
        setTimeout(() => {
            console.log("Déconnexion réussie.".green);
        }, 2000);
        return true;
    } else {
        console.log("Une erreur s'est produite lors de la déconnexion.".red);
        return false;
    }
}

module.exports = { logout };