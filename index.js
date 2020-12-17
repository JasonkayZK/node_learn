const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const Redis = require('ioredis')
const client = new Redis({
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    password: "admin",
    family: 4, // 4 (IPv4) or 6 (IPv6)
    db: 0,
})

const EXPIRE_SECOND = 5
const LIMIT_RATE = 20
const BLOCK_SECOND = 86400
const BLOCK_SUFFIX = '-blocked'

client.on('connect', () => {
    console.log('Redis connected!');
});

app.post('/', (req, res) => {
    res.send('Post has rate limit!')
})

app.get('/', async (req, res) => {
    // Check rate limit
    if (!await checkPermission(req.ip)) {
        res.status(429).send('Too many requests - try again later')
        return
    }

    // allow access to resources
    res.send("Accessed precious resources!")
})

async function checkPermission(ip) {
    // Step 1: Check ip is in block-list
    if (await isBlocked(ip)) {
        return false
    }

    // Step 2: Check rate limit
    if (await isOverLimit(ip)) {
        try {
            await doBlock(ip);
        } catch (err) {
            console.error("execute isOverLimit err:", err)
        }
        return false
    }

    return true
}

async function isOverLimit(ip) {
    let res
    try {
        res = await client.incr(ip)
    } catch (err) {
        console.error('isOverLimit: could not increment key')
        throw err
    }

    console.log(`${ip} has value: ${res}`)

    if (res > LIMIT_RATE) {
        return true
    }
    client.expire(ip, EXPIRE_SECOND)
}

async function isBlocked(ip) {
    return (await client.get(ip + BLOCK_SUFFIX)) > 0;
}

async function doBlock(ip) {
    let res;
    try {
        res = await client.set(ip + BLOCK_SUFFIX, 1, 'ex', BLOCK_SECOND)
    } catch (err) {
        console.error('doBlock: could not set key')
        throw err
    }

    console.log(`${ip} has bend blocked: ${res}`)
}

// Test
(async () => {
    let testIP = '127.0.1.1'
    let testIP2 = '127.0.1.2'
    await doBlock(testIP)
    console.log(await isBlocked(testIP))
    console.log(await isBlocked(testIP2))
})()

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
