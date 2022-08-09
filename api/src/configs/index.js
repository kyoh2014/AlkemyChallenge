require('dotenv').config();

const PORT = process.env.PORT || 3001;


const DB_PORT = process.env.DB_PORT || 3306;
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_USER = process.env.DB_USER || 'root';
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const AUTH_SECRET = process.env.AUTH_SECRET;
const AUTH_EXPIRES = process.env.AUTH_EXPIRES || "1d";
const AUTH_ROUNDS = process.env.AUTH_ROUNDS || 10;

const OPERATIONS_IN_RESUME = 10;


module.exports = {
    PORT,
    DB_PORT,
    DB_PASSWORD,
    DB_USER,
    DB_NAME,
    DB_HOST,
    AUTH_SECRET,
    AUTH_EXPIRES,
    AUTH_ROUNDS,
    OPERATIONS_IN_RESUME
}