const knex = require("knex")(require("./knexfile")["development"]);
const md5 =  require('md5');

/**
 * Create admin login
 * @param {string} adminEmail
 * @param {string} pwd
 * @returns {Promise}
 */
async function createAdminLog(adminEmail, pwd) {
    return await knex("admins").insert({
        name: "admin",
        email: adminEmail,
        password: md5(pwd),
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}

createAdminLog("admin@admin.fr", "admin");