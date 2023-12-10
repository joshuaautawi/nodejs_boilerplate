require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: "127.0.0.1",
  port: 5432,
});

module.exports = client;
