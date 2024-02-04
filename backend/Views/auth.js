import express from 'express';
import passport from 'passport';

import FacebookStrategy from 'passport-facebook';
import InstagramStrategy from 'passport-instagram';
import { authLogin } from '../Controllers/authController.js';
import GitHubStrategy from 'passport-github2';
import TwitterStrategy from 'passport-twitter';
import request from 'request-promise';
import GoogleStrategy from 'passport-google-oauth20';

const authRouter = express.Router();
const CLIENT = "http://localhost:3000/Mains"
const CLIENT2 = "http://localhost:3000/"
const CLIENT3 = "http://localhost:3000/Mains2"

//facebook oauth
passport.use(new FacebookStrategy({
      clientID: '24726497613662656',
      clientSecret : 'df1024c5118bae88145d59032bec4bb6',
      callbackURL: 'http://localhost:8000/auth/facebook/callback'
      },(accessToken,refreshToken,profile,cb)=>{
        // localStorage.setItem('userName',profile.displayName)
          console.log("accessToken",accessToken)
          console.log("refreshToken",refreshToken)
          console.log("profile",profile)
          return cb(null,profile);
      }))

authRouter.get('/facebook',passport.authenticate('facebook',
              {authType: 'reauthenticate',scope:['public_profile','email']}));

authRouter.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: CLIENT, failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/');
  })
authRouter.get('/facebook/getInfo', authLogin)
authRouter.get('/facebook/logout',(req,res)=>{
    console.log("bfksfb");
    // console.log(req)
    req.logout();
    req.session = null;
    res.redirect(CLIENT2)
})

// instagram oauth
// Instagram OAuth
passport.use(new InstagramStrategy({
    clientID: '24726497613662656',
    clientSecret: 'df1024c5118bae88145d59032bec4bb6',
    callbackURL: 'http://localhost:8000/auth/instagram/callback'
}, (accessToken, refreshToken, profile, cb) => {
    console.log("Instagram Authentication");
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    console.log("profile", profile);
    return cb(null, profile);
}));

authRouter.get('/instagram', passport.authenticate('instagram', { scope: ['basic'] }));

authRouter.get('/instagram/callback', passport.authenticate('instagram', { successRedirect: CLIENT, failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    });

authRouter.get('/instagram/getInfo', authLogin);
authRouter.get('/instagram/logout', (req, res) => {
    console.log("Instagram Logout");
    req.logout();
    req.session = null;
    res.redirect(CLIENT2);
});

// // GitHub OAuth
// passport.use(new GitHubStrategy({
//     clientID: '24726497613662656',
//     clientSecret: 'df1024c5118bae88145d59032bec4bb6',
//     callbackURL: 'http://localhost:8000/auth/github/callback'
// }, (accessToken, refreshToken, profile, cb) => {
//     console.log("GitHub Authentication");
//     console.log("accessToken", accessToken);
//     console.log("refreshToken", refreshToken);
//     console.log("profile", profile);
//     return cb(null, profile);
// }));

// authRouter.get('/github', passport.authenticate('github'));

// authRouter.get('/github/callback', passport.authenticate('github', { successRedirect: CLIENT, failureRedirect: '/login' }),
//     function (req, res) {
//         res.redirect('/');
//     });

// authRouter.get('/github/getInfo', authLogin);
// authRouter.get('/github/logout', (req, res) => {
//     console.log("GitHub Logout");
//     req.logout();
//     req.session = null;
//     res.redirect(CLIENT2);
// });

//Twitter OAuth
passport.use(new TwitterStrategy({
    consumerKey: 'tTjVW7x05kPOm20yaJzU1jc21',
    consumerSecret: 'jmpUSUzTqkrV8aXtrnCQtSzTQ5QM6LL1LakcnKXtePe43Fvx7x',
    callbackURL: 'http://localhost:8000/auth/twitter/callback'
}, (token, tokenSecret, profile, cb) => {
    console.log("Twitter Authentication");
    console.log("token", token);
    console.log("tokenSecret", tokenSecret);
    console.log("profile", profile);
    return cb(null, profile);
}));

authRouter.get('/twitter', passport.authenticate('twitter'));
authRouter.get('/twitter/callback', passport.authenticate('twitter', { successRedirect: CLIENT3, failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    });

authRouter.get('/twitter/getInfo', authLogin);
authRouter.get('/twitter/logout', (req, res) => {
    console.log("Twitter Logout");
    req.logout();
    req.session = null;
    res.redirect(CLIENT2);
});


authRouter.post('/instagram', async (req, res) => {
    try {
        // data from frontend
        let code = IGQWRNSXFzVHlVU3pkSGlRd0hIaWVPX2RCQWdoblFPZAXJDTmhBS3M5MHY2c3BjdjBCcEdwS1ZAWTDdxWFp6VWhMQVAwZAlhOZAXJvT0FrYnJfbkdpc2taOFllTERGb21DYm04cUJzQ3ZAVdE9YTFFvdzhTb1ppNFc0NHMZD;
        let redirectUri = req.body.redirectUri;

        let accessToken = "IGQWRNSXFzVHlVU3pkSGlRd0hIaWVPX2RCQWdoblFPZAXJDTmhBS3M5MHY2c3BjdjBCcEdwS1ZAWTDdxWFp6VWhMQVAwZAlhOZAXJvT0FrYnJfbkdpc2taOFllTERGb21DYm04cUJzQ3ZAVdE9YTFFvdzhTb1ppNFc0NHMZD";
        //code = code.slice(0,-2);
        // try {
        //     // send form-based request to Instagram API
        //     let result = await request.post({
        //         url: 'https://api.instagram.com/oauth/access_token',
        //         form: {
        //             client_id: '748058700261161',
        //             client_secret: 'f2e7f527b8f4a97e96d81992d5f66850',
        //             grant_type: 'authorization_code',
        //             redirect_uri: redirectUri,
        //             code: modifiedCode
        //         }
        //     });

        //     // Got access token. Parse string response to JSON
        //     accessToken = JSON.parse(result).access_token;
        // } catch (e) {
        //     console.log("Error=====", e);
        //     return res.status(500).json({ error: 'Internal Server Error' });
        // }

        // You can send the accessToken or perform additional actions here
        res.json({ accessToken: accessToken });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


passport.use(new GoogleStrategy.Strategy({
    clientID: '332484236452-sc3k2rbg2shbscdknojfn9jsfj32ngdf.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/auth/google/callback'
    
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accessToken",accessToken)
      console.log("refreshToken",refreshToken)
      console.log("profile",profile)
      return done(null,profile);
    }));
authRouter.get('/google',passport.authenticate('google',
              {authType: 'reauthenticate',scope: ['profile', 'email']}));

authRouter.get('/google/callback', passport.authenticate('google', { successRedirect: CLIENT, failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/');
  })
authRouter.get('/google/getInfo', authLogin)
authRouter.get('/google/logout',(req,res)=>{
    console.log("bfksfb");
    // console.log(req)
    req.logout();
    req.session = null;
    res.redirect(CLIENT2)
})


export default authRouter;
