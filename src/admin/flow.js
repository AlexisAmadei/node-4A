async function askAdminLogs() {
    console.log("Chatbot : Bienvenue ! Veuillez vous connecter avec vos identifiants admin.");
    let credentials = prompt("Entrez votre email et mot de passe (séparés par un espace) : ");
    let [email, password] = credentials.split(' ');

    if (!email || !password) {
        console.log("Chatbot : Veuillez fournir à la fois un email et un mot de passe.");
        return askLogin();
    }

    try {
        let success = await userLogin(email, password);
        if (success) {
            console.log("Chatbot : Connexion réussie !");
            return email;
        } else {
            console.log("Chatbot : Email ou mot de passe incorrect. Réessayez s'il vous plaît.");
            return askLogin();
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
    }
}

async function adminFlow() {
    console.log("Admin flow".green.bold);
}

module.exports = { adminFlow };