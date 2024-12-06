const knex = require('knex')(require('../../knexfile')['development']);
const { createOrder } = require("../db/orderModel");

