require('dotenv').config();
const express = require('express');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/passport-config');
const isLoggedIn = require('./middleware/isLoggedIn');
const SECRET_SESSION = process.env.SECRET_SESSION;
const PORT = process.env.PORT || 3000;
const axios = require('axios');
// import model
const { User } = require('./models');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

const RAWG_API_KEY = process.env.RAWG_API_KEY;

// initial passport
app.use(passport.initialize());
app.use(passport.session());

// middleware for tracking users and alerts
app.use((req, res, next) => {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next(); // going to said route
});

app.get('/', (req, res) => {
    res.render('home', {});
});


axios.get(`https://api.rawg.io/api/platforms?key=${RAWG_API_KEY}`)
.then(response => {
    console.log('API RESPONSE ---------------\n', response.data.results.length);
    console.log('Api Status ----------------\n', response.data.status);
    console.log('Names --------------\n', response.data.name);

    const videoGameObj = {
        name: response.data.name
    }
})
.catch(error => console.log('ERROR ----\n', error));


// import auth routes
app.use('/auth', require('./controllers/auth'));

// --- AUTHENTICATED ROUTE: go to user profile page --- 
app.get('/profile', isLoggedIn, (req, res) => {
    const { name, email, phone } = req.user;
    res.render('profile', { name, email, phone });
});




const server = app.listen(PORT, () => {
    console.log('🏎️ You are listening on PORT', PORT);
});

module.exports = server;