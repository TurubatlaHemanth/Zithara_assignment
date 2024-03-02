const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL configuration
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'admin',
  port: 5432, // default PostgreSQL port
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to fetch 50 records from the PostgreSQL table
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM customers2');
    const records = result.rows;
    client.release();
    console.log(records);
    res.json(records);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
