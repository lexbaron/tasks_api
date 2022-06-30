const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require( 'dotenv' );

dotenv.config({ path: './config.env' });

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DATABASE } = process.env;

const database = new Sequelize({
    dialect: "postgres",
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DATABASE,
    logging: false,
});

module.exports = { database, DataTypes };