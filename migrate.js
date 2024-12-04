const knex = require('knex')(require('./knexfile')['development']);

async function createTable() {
    try {
        // const authExist = await knex.schema.hasTable('auth');
        const adminsExist = await knex.schema.hasTable('admins');
        const clientsExist = await knex.schema.hasTable('clients');
        const movieExist = await knex.schema.hasTable('movies');
        const ordersExist = await knex.schema.hasTable('orders');
        const orderItemsExist = await knex.schema.hasTable('order_items');
        const inventoryExist = await knex.schema.hasTable('inventory');
        const chatHistoryExist = await knex.schema.hasTable('chat_history');

        console.log('# Creating tables...');
        if (!clientsExist) {
            await knex.schema.createTable('clients', (table) => {
                table.string('id').primary();
                table.string('name');
                table.string('email');
                table.string('password');
                table.string('address');
                table.string('phone');
                table.datetime('createdAt');
                table.datetime('updatedAt');
            });
            console.log('# Clients table created');
        }

        if (!adminsExist) {
            await knex.schema.createTable('admins', (table) => {
                table.string('id').primary();
                table.string('username');
                table.string('password');
                table.string('role');
                table.datetime('createdAt');
                table.datetime('updatedAt');
            });
            console.log('# Admins table created');
        }

        if (!ordersExist) {
            await knex.schema.createTable('orders', (table) => {
                table.string('id').primary();
                table.string('clientId').references('id').inTable('clients');
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

        if (!inventoryExist) {
            await knex.schema.createTable('inventory', (table) => {
                table.string('id').primary();
                table.string('movieId').references('id').inTable('movie');
                table.integer('stockAdded');
                table.integer('stockRemoved');
                table.datetime('date');
                table.string('adminId').references('id').inTable('admins');
            });
            console.log('# Inventory table created');
        }

        if (!chatHistoryExist) {
            await knex.schema.createTable('chat_history', (table) => {
                table.string('id').primary();
                table.string('clientId').references('id').inTable('clients');
                table.json('messages');
                table.datetime('createdAt');
            });
        }

        if (!movieExist) {
            await knex.schema.createTable('movie', (table) => {
                table.string('id').primary();
                table.string('title');
                table.string('description');
                table.specificType('genre', 'text[]');
                table.datetime('releaseDate');
                table.decimal('price');
                table.integer('stock');
                table.datetime('createdAt');
                table.datetime('updatedAt');
            });
        }

    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

createTable();
process.exit();