const knex = require('knex')(require('../../knexfile')['development']);
const md5 = require('md5');

async function findUserByEmail(email) {
    return knex('users').where({ email }).first();
}

async function createUser(name, email, password, address) {
    return await knex('users').insert({
        name,
        email,
        password,
        address,
        createdAt: new Date(),
        updatedAt: new Date()
    });
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

async function userLogin(email, password) {
    const user = await findUserByEmail(email);
    if (!user) {
        return false; // User not found
    }
    const hashedPassword = md5(password);
    if (user.password !== hashedPassword) {
        return false;
    } else {
        await knex('auth').insert({
            email,
            createdAt: new Date()
        });
    }
    return { id: user.id, email: user.email };
}

async function getAllUsers() {
    return knex('users').select('*');
}

module.exports = {
    createUser,
    findUserById,
    findUserByEmail,
    updateUser,
    deleteUser,
    userLogin,
    getAllUsers
};