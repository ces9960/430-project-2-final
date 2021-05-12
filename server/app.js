const express = require('express');
const app = express();
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const redis = require('redis');

const port = process.env.port || process.env.NODE_PORT || 3001;
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/Project2Final'

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTypology: true,
    useCreateIndex: true
}

mongoose.connect(dbURL,mongooseOptions,(err) => {
    if(err){
        console.log('Could not connect to database');
        throw err;
    }
});

let redisURL = {
    hostname:'redis-19847.c246.us-east-1-4.ec2.cloud.redislabs.com',
    port:'19847'
};

let redisPASS = 'prvq65Bhz5UYiN9K6UHBkUdUpofig0kg';

if(process.env.REDISCLOUD_URL){
    redisURL = url.parse(process.env.REDISCLOUD_URL);
    [, redisPASS] = redisURL.auth.split(':');
}

const redisClient = redis.createClient({
    host: redisURL.hostname,
    port: redisURL.port,
    password: redisPASS
});

const router = require('./router.js');
app.disable('x-powered-by');
app.use(compression());
app.user(bodyParser.urlencoded({
    extended:true
}));
app.use(session({
    key: 'sessionid',
    store: new RedisStore({
        client: redisClient
    }),
    secret: '量子チキンスープグラスビッグチュングス',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly:true
    }
}));
app.use(cookieParser());

router(app);

app.listen(port,(err) => {
    if(err) {
        throw(err);
    }
    console.log(`Listening on port ${port}`);
});