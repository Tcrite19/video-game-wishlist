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

axios.get(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}`)
.then(response => {
    // console.log('API RESPONSE ---------------\n', response.data.results.length);
    // // console.log('Api Status ----------------\n', response.data);
    // console.log('Names --------------\n', response.data.name);
    

    const videoGameArr = [];
    console.log(response.data.results[1]);

    for (let i = 0; i < response.data.results.length; i++) {
        let vg = response.data.results[i];
         try {
            // console.log('working');
            const videoGameObj = {
                 name: vg.name,
                 released: vg.released,
                 image: vg.background_image,
                 id: vg.id,
                 rating: vg.rating,
                 description: vg.description
              }
            // console.log(videoGameObj);
            videoGameArr.push(videoGameObj);
            // if(videoGameArr.length === 20) {
            //     res.render('games/index', { videoGameArr: videoGameArr });
            // }
        } 
        catch (error) {
            console.log('----error----\n');
            // res.send('error fetching cart');
        }
    }
    // .catch(error => console.log('ERROR ----\n', error));

})

const server = app.listen(PORT, () => {
    console.log('🏎️ You are listening on PORT', PORT);
})