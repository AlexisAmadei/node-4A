const knex = require('knex')(require('../../knexfile')['development']);
const md5 = require('md5');

async function createUser(name, email, password) {
    const hashedPwd = md5(password);
    return knex('users').insert({ name, email, hashedPwd });
}

module.exports = {
    createUser
};