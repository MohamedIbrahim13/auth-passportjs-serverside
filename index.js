const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup=require('./config/passport-setup');
const mongoose = require('mongoose');
const passport=require('passport');
const cookieSession=require('cookie-session');

mongoose.connect('mongodb+srv://test:test@authgoogle-r9me7.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true});
mongoose.Promise=global.Promise;
const app = express();

// set view engine
app.set('view engine', 'ejs');
app.use(cookieSession({maxAge: 24 * 60 * 60 * 1000,keys:['passportjsisawesome']}))

app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home',{user:req.user});
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});