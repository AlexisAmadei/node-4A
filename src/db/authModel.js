const knex = require('knex')(require('../../knexfile')['development']);

async function createAuthEntry(id, email) {
    const existingEntry = await knex('auth').where({ email }).first();
    if (existingEntry) {
        await knex('auth').where({ email }).del();
    }
    return await knex('auth').insert({
        email,
        createdAt: new Date()
    });
}

async function getAuthEntry() {
    return await knex('auth').first();
}

/**
 *  Deletes an entry from the auth table by email. Or the first entry if no email is provided.
 * @param {string} email
 * @returns {boolean} - True if the entry was deleted, false otherwise
 */
async function delAuthEntry(email) {
    if (!email || email === "") {
        const firstEntry = await getAuthEntry();
        if (!firstEntry) {
            return false;
        }
        email = firstEntry.email;
    }
    return await knex('auth').where({ email }).del();
}

module.exports = { createAuthEntry, delAuthEntry, getAuthEntry };
