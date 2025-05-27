import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import mysql from 'mysql2/promise';

dotenv.config()

// MySQL hosted on Aiven 
// https://console.aiven.io/account/a537b0678a1c/project/shub/services/mysql-2aec9ce7/overview

const config = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	ssl: { ca: readFileSync(process.env.DB_CA_PATH) },
}

export default mysql.createPool(config)
