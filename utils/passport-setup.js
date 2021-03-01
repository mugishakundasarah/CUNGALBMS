const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const User = require("../models/user.model")

passport.serializeUser((user, done) => {
    done(null, user.id)
})


passport.deserializeUser((id, done) => {
    user.findById(id).then((user) => {
        console.log(user);
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        //options for the google strategies 
        callbackURL: "/profile/",
        clientID : "82286225565-o66fegolc8hplofkuh42dgdtc2nft9am.apps.googleusercontent.com",
        clientSecret:"ht46ShTOn2uYfLNgIiKUofuM",
    }, async(accessToken, refreshToken, profile, done) => {
        console.log('passport callback function fired');
        
        //check if user already exists in db 
        const duplicate = await User.findOne({googleId: profile.id})

        if(duplicate){
            console.log("user is: ", duplicate);
            done(null, duplicate)
        }
        
        else{
            new User({
                userName: profile.displayName,
                googleId: profile.id 
            }).save().then((newUser)=>{
                console.log("new user created" + newUser);
                done(null, newUser)
            })
        }
    })
)


