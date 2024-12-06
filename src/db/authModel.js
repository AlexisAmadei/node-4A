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

module.exports = { createAuthEntry };
