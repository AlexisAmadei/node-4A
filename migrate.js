const knex = require('knex')(require('./knexfile')['development']);

async function createTable() {
    try {
        const adminsExist = await knex.schema.hasTable('admins');
        const usersExist = await knex.schema.hasTable('users');
        const ordersExist = await knex.schema.hasTable('orders');
        const orderItemsExist = await knex.schema.hasTable('order_items');
        const authExist = await knex.schema.hasTable('auth');

        console.log('# Creating tables...');

        if (!usersExist) {
            await knex.schema.createTable('users', (table) => {
                table.increments('id').primary();
                table.string('name').notNullable();
                table.string('email').notNullable().unique();
                table.string('password').notNullable();
                table.string('address').nullable();
                table.timestamp('createdAt').defaultTo(knex.fn.now());
                table.timestamp('updatedAt').defaultTo(knex.fn.now());
            });
            console.log('# users table created');
        }

        if (!adminsExist) {
            await knex.schema.createTable('admins', (table) => {
                table.increments('id').primary();
                table.string('name');
                table.string('email');
                table.string('password');
                table.datetime('createdAt');
                table.datetime('updatedAt');
            });
            console.log('# Admins table created');
        }

        if (!ordersExist) {
            await knex.schema.createTable('orders', (table) => {
                table.string('id').primary();
                table.string('clientMail').references('email').inTable('users'); // Reference the email field
                table.decimal('total');
                table.string('status');
                table.datetime('orderDate');
                table.datetime('updatedAt');
            });
            console.log('# Orders table created');
        }

        if (!orderItemsExist) {
            await knex.schema.createTable('order_items', (table) => {
                table.string('orderId').references('id').inTable('orders');
                table.string('movieId').references('id').inTable('movie');
                table.integer('quantity');
                table.decimal('price');
            });
            console.log('# Order Items table created');
        }

        if (!authExist) {
            await knex.schema.createTable('auth', (table) => {
                table.increments('id').primary();
                table.string('email').notNullable();
                table.timestamp('createdAt').defaultTo(knex.fn.now());
            });
            console.log('# Auth table created');
        }
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

createTable().then(() => {
    console.log('Tables created successfully');
    process.exit(0);
}).catch((err) => {
    console.error('Error creating tables:', err);
    process.exit(1);
});
