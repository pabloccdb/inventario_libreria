const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');


const {database}=require('./keys');

//initializations
require('./lib/passport');
const app = express();

//Settings
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret:'Libreria',
    resave: false,
    saveUninitialized:false,
    store:new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session()); 

//Global Variables
app.use((req, res, next) => { 
    app.locals.success=req.flash('success');
    app.locals.message=req.flash('message');
    app.locals.user=req.user;
    next();
});

//Routes
app.use(require('./routes/index'));
app.use('/libros', require('./routes/libros'));
app.use(require('./routes/authentication'));

// static Files PUBLIC
app.use(express.static(__dirname + '/public'));

//Server is listen
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

