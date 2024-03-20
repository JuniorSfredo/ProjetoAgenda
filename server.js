require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto');
    })
    .catch(err => console.log(err));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const route = require('./routes.js');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { checkCsrfError, csrfMiddleware, meuMiddleware } = require('./src/middlewares/middleware');

app.use(helmet());
app.use(express.urlencoded( {extended: true} ));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({ 
    secret: 'sghuas78edw8wdjho90.89we89jidw',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: null,
        httpOnly: true,
    },
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING})
})

app.use(helmet());
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(csrf());

// Middlewares:
app.use(meuMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(route);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Servidor executando porta 3000');
    });
})
