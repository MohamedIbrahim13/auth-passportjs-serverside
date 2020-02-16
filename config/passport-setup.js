const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const User=require('../models/user-model');


passport.serializeUser((user,done)=>{
    done(null,user.id)
});
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
});


passport.use(new GoogleStrategy({
    callbackURL:'/auth/google/redirect',
    clientID:'704247695053-datqb08nr91qmvv95fu5v13r4cn905uc.apps.googleusercontent.com',
    clientSecret:'N7XA3CsVO40AxPPa0HeHPDLq'
},(accesToken,refreshToken,profile,done)=>{
    // console.log('Callback Function Fired');
    // console.log(profile);
    User.findOne({googleID:profile.id}).then((curr)=>{
        if(curr){
            console.log(`${curr} does exist`);
            done(null,curr);
        }else{
            // console.log(profile);
            new User({
                username:profile.displayName,
                googleID:profile.id,
                thumbnail:profile._json.picture
            }).save().then((newUser)=>{
                console.log(`${newUser} has been created`);
                done(null,newUser);
            })
        }
    })
    
}));