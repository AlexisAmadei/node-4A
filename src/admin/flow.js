const { chatbot_admin } = require('../training/admin');
const prompt = require('prompt-sync')({ sigint: true });
const colors = require('colors');
const { adminLogin } = require('../db/adminModel');
const { getAllUsers, deleteUser } = require('../db/userModel');

async function askAdminLogs() {
    console.log("Chatbot : Bienvenue ! Veuillez vous connecter avec vos identifiants admin.".green);
    let credentials = prompt("Entrez votre email et mot de passe (séparés par un espace) : ");
    let [email, password] = credentials.split(' ');

    if (!email || !password) {
        console.log("Chatbot : Veuillez fournir à la fois un email et un mot de passe.".red);
        return askAdminLogs();
    }

    try {
        let loginTry = await adminLogin(email, password); // Assuming userLogin validates admin credentials
        if (loginTry === email) {
            console.log("Chatbot : Connexion réussie !".green);
            return email;
        } else if (loginTry === 'incorrectPwd') {
            console.log("Chatbot : Email ou mot de passe incorrect. Réessayez s'il vous plaît.".red);
            return askAdminLogs();
        } else if (loginTry === 'notFound') {
            console.log("Chatbot : Email non trouvé. Veuillez vous inscrire.".red);
            return askAdminLogs();
        } else {
            console.log("Chatbot : Une erreur s'est produite. Veuillez réessayer.".red);
            return askAdminLogs();
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.red);
    }
}

async function adminFlow() {
    let adminEmail = await askAdminLogs();
    if (!adminEmail) {
        return;
    }
    console.log(`Chatbot : Bienvenue, ${adminEmail} !`.cyan);

    let continueAdmin = true;

    while (continueAdmin) {
        console.log("\nChatbot : Que souhaitez-vous faire ?".cyan);
        console.log("1. Consulter les utilisateurs");
        console.log("2. Consulter les commandes");
        console.log("3. Supprimer un utilisateur");
        console.log("4. Supprimer une commande");
        console.log("5. Interface utilisateur");
        console.log("6. Quitter\n");

        const input = prompt("Entrez votre commande : ".blue);
        const predicted_response = chatbot_admin.classify(input);

        if (!predicted_response.length) {
            console.log("Chatbot : Désolé, je n'ai pas compris votre demande. Veuillez réessayer.".red);
            continue;
        }

        if (predicted_response[0] === 'listUsers') {
            const users = await getAllUsers();
            console.log("\nListe des utilisateurs :");
            users.forEach(user => {
                console.log(`- ${user.name} (${user.email})`);
            });
            return;
        }
    }
}

module.exports = { adminFlow };
