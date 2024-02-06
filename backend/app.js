import express from 'express';
const app = express();

import session from 'cookie-session';
import passport from 'passport';
import { TwitterApi } from "twitter-api-v2";

//cors
import cors from 'cors';
const corsOptions = {
    origin : 'http://localhost:3000',
    methods : ['GET','POST','UPDATE','DELETE','PATCH'],
    credentials : true
    // allowedHeaders : ['Content-Type','auth-token','Code','Credentials','credentials']
};
app.use(cors(corsOptions));

app.use(session({
    name: 'session',
    keys:["lama"],
    maxAge: 10*60*1000
  }))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,cb){
    cb(null,user);
  })
  passport.deserializeUser(function(user,cb){
    cb(null,user);
  })





app.use(express.json());

import Auth from './Views/auth.js';


app.use('/auth',Auth);

const client = new TwitterApi({
    appKey: 'tTjVW7x05kPOm20yaJzU1jc21',
    appSecret: 'jmpUSUzTqkrV8aXtrnCQtSzTQ5QM6LL1LakcnKXtePe43Fvx7x',
    accessToken: '1753773316400123904-1P02kHj0KkmgtaUt08P91xEgGvDTEw',
    accessSecret: 'wYXotCNYm8KlJdaQWyDEbFImYkr02BwpbwKjvrYmtHH1m',
    bearerToken:'AAAAAAAAAAAAAAAAAAAAAH%2FesAEAAAAARnEaj2G0TMa0tEARhFArlReFp1o%3DtQOV55RvyKQAWMrGyIat6WSMJTEyRAStuurEF9y81EgIylVkCt',
  });


  const rwClient = client.readWrite;
  
  // Handle POST request for text tweets
  app.post('/post/tweet', async (req, res) => {
    try {
      await rwClient.v2.tweet(req.body.tweet);
      res.status(200).json({ success: true, message: 'Text tweet posted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error posting text tweet' });
    }
  });


// Endpoint to handle the redirect from Instagram


const server = app.listen(8000, (req,res,err) => {
    if(err){
        console.log(`Error while starting the server : ${err}`);
    }
    else {
        console.log("Server started on the port : 8000");
    }
});
