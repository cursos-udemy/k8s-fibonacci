const config = require('./config');
const redis = require('redis');

console.log('Docker Fobonacci Worker');

const redisClient = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    // Si alguna vez pierde conexion, reintentar cada 1 seg
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fibonacci(index) {
    if (index < 2) return 1
    return fibonacci(index - 1) + fibonacci(index - 2);
}

sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fibonacci(parseInt(message)));
});

sub.subscribe('insert')