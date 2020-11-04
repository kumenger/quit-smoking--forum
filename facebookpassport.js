const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const Fbuser=require('./models/facebookusers')
const keys=require('./config/key')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Fbuser.findById(id).then(user => done(null, user));
});
passport.use(
    new FacebookStrategy(
      {
        clientID: keys.clientID,
        clientSecret: keys.clientSecret,
        callbackURL: 'http://localhost:3000',
        profileFields: [
            "emails",
            "id",
            "displayName",
            "name",
            "picture.type(small)",
          ],
          proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
          process.nextTick(()=>{
            Fbuser.findOne({ id: profile.id }).then(user => {
                if (user) {
                   done(null, user);
                } else {
               
                     new Fbuser({
                        id: profile.id,
                        name: profile.displayName,
                        pic: profile.photos[0].value,
                        email: profile.emails[0].value,
                       
                      })
                    .save()
                    .then(user => done(null, user));
                }
              });
          })
     
      }
    )
  );
