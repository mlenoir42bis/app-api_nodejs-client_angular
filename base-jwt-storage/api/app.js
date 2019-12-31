const path = require('path');
const express = require('express');
require('./src/database');
const cookieParser = require('cookie-parser');
const app = express();

exports.app = app;

app.use(cookieParser());

const errorHandler = require('errorhandler');

require('./src/config/jwt.config');

const router = require('./src/routes');

const cors = require('cors');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Max-Age', '1000');
    res.setHeader('Referrer-Policy', 'no-referrer');
    next();
});

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

if (process.env.NODE_ENV === "dev") {
    app.use(errorHandler());
}

app.use((err, req, res, next) => {
    const env = process.env.NODE_ENV;
    const code = err.code || 500;
    if (env === "prod") {
        res.status(code).send({
            error: err.message,
            success: false
        });
    }
});

app.listen(3004);
