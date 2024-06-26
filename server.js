require('dotenv').config();
const express = require('express');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/passport-config');
const isLoggedIn = require('./middleware/isLoggedIn');
const SECRET_SESSION = process.env.SECRET_SESSION;
const RAWG_API_KEY = process.env.RAWG_API_KEY;
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

// initial passport
app.use(passport.initialize());
app.use(passport.session());

// middleware for tracking users and alerts
app.use((req, res, next) => {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next(); // going to said route
});

// app.get('*', (req, res) => {
//     res.render('404', {});
// })

app.get('/', (req, res) => {
    res.render('home', {});
});

app.get('/Games', (req, res) => {
    axios.get(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}`)
.then(response => {
    // console.log('API RESPONSE ---------------\n', response.data.results.length);
    // // console.log('Api Status ----------------\n', response.data);
    // console.log('Names --------------\n', response.data.name);
    

    const videoGameArr = [];
    console.log(response.data.results[1].name);

    for (let i = 0; i < response.data.results.length; i++) {
        let vg = response.data.results[i];
         try {
            console.log('working');
            const videoGameObj = {
                 name: vg.name,
                 released: vg.released,
                 image: vg.background_image,
                 id: vg.id,
                 rating: vg.rating
              }
            console.log(videoGameObj);
            videoGameArr.push(videoGameObj);
            if(videoGameArr.length === 20) {
                res.render('games/index', { videoGameArr: videoGameArr });
            }
        } 
        catch (error) {
            console.log('----error----\n');
            // res.send('error fetching cart');
        }
    }
    // .catch(error => console.log('ERROR ----\n', error));

})
});


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
