const knex = require('knex')(require('../../knexfile')['development']);
const md5 = require('md5');

async function findAdminByEmail(email) {
    return knex('admins').where({ email }).first();
}

async function adminLogin(email, password) {
    const admin = await findAdminByEmail(email);
    if (!admin) {
        return 'notFound';
    }
    const hashedPassword = md5(password);
    if (admin.password === hashedPassword) {
        return email;
    } else {
        return 'incorrectPwd';
    }
}

async function createAdmin(name, email, password) {
    const hashedPassword = md5(password);
    return knex('admins').insert({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
    });
}

module.exports = {
    createAdmin,
    adminLogin,
    findAdminByEmail
};