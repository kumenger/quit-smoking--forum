const { json } = require('body-parser');
const passport =require('passport')


module.exports=app=>{
    app.get('/auth/facebook', passport.authenticate('facebook'));
   
    app.get(
      'http://localhost:3000/',
      passport.authenticate('facebook'),
      (req, res) => {
        console.log(`logged in, , ${req.user}`);
        res.redirect('/sign');
      }
    );
   
    app.get('/api/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });
   
    app.get('/api/current_user', (req, res) => {
    res.send(req.user)
    });





}