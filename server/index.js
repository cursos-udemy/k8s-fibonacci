const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const redis = require('redis');
const config = require('./config');

//express setup
const app = express();
app.use(cors())
app.use(bodyParser.json());

//postgres client setup
const pgClient = new Pool({
    host: config.postgres.host,
    port: config.postgres.port,
    database: config.postgres.database,
    user: config.postgres.user,
    password: config.postgres.password
});

pgClient.on('connect', () => {
    pgClient
        .query('CREATE TABLE IF NOT EXISTS numbers (number INT)')
        .catch((err) => console.log(err));
});

//redis client setup
const redisClient = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

//express routes handlers
app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.get('/values/all', async (req, res) => {
    console.log('request: /values/all')
    const values = await pgClient.query('SELECT * FROM numbers');
    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    console.log('request: /values/current')
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
});

app.post('/values', async (req, res) => {
    console.log('request: /values')
    const index = req.body.index;
    if (parseInt(index) > 40) {
        return res.status(422).send('index too high');
    }
    redisClient.hset('values', index, 'Nothing yet');
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO numbers(number) VALUES ($1)', [index]);
    res.json({ working: true });
});

app.listen(5000, (err) => {
    console.log('App Express Listening on port 5000')
})