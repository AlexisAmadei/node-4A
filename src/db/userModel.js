const knex = require('knex')(require('../../knexfile')['development']);

async function findUserByEmail(email) {
    return knex('users').where({ email }).first();
}

async function createUser(name, email, password, address) {
    if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
    }
    const newUser = {
        name,
        email,
        password: password,
        address: address,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    return knex('users').insert(newUser);
}

async function findUserById(userId) {
    return knex('users').where({ id: userId }).first();
}

async function updateUser(userId, updates) {
    updates.updatedAt = new Date();
    return knex('users').where({ id: userId }).update(updates);
}

async function deleteUser(userId) {
    return knex('users').where({ id: userId }).delete();
}

module.exports = {
    createUser,
    findUserById,
    findUserByEmail,
    updateUser,
    deleteUser
};