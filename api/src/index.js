const { ApolloServer, PubSub } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');
import express from 'express';
const pubsub = new PubSub();
const port = process.env.port || 5000;
const path = '/graphql';

import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import session from 'express-session';
import uuid from 'uuid/v4';
const SESSION_SECRECT = 'bad secret';
import User from './models/Users';
// import User from './graphql/resolvers/index';


const facebookOptions = {
    clientID: '473679669966044',
    clientSecret: '964e9a615d3c4b01212054e4a4666871',
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: ['id', 'email', 'first_name', 'last_name'],
};

const facebookCallback = (accessToken, refreshToken, profile, done) => {
    const users = User.getUsers();
    console.log(users);
    const matchingUser = users.find(user => user.facebookId === profile.id);
    console.log(profile.id);
    // console.log(user.facebookId);

    if (matchingUser) {
        done(null, matchingUser);
        console.log("ok");
        return;
    }
    console.log("ok1");
    const newUser = {
      id: uuid(),
      facebookId: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails && profile.emails[0] && profile.emails[0].value,
    };
    users.push(newUser);
    done(null, newUser);
  };

passport.use(new FacebookStrategy(
  facebookOptions,
  facebookCallback,
));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser((id, done) => {
const users = User.getUsers();
const matchingUser = users.find(user => user.id === id);
done(null, matchingUser);
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        req, 
        pubsub,
        getUser: () => req.user,
        logout: () => req.logout(),
    }),
    playground: {
        settings: {
          'request.credentials': 'same-origin',
        },
    }
});

const app = express();

app.use(session({
    genid: (req) => uuid(),
    secret: SESSION_SECRECT,
    resave: false,
    saveUninitialized: false,
  }));
  
app.use(passport.initialize());
app.use(passport.session());
  
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: 'http://localhost:5000/graphql/hola',
  failureRedirect: 'http://localhost:5000/graphql/chao',
}));

const connection = mongoose.connect(MONGODB, { useNewUrlParser: true });
connection
    .then(db => {
        db;
        console.log('MongoDB Connected');
    })
    .catch(err => {
        console.log(err);
    });

mongoose.set('useFindAndModify', false);

server.applyMiddleware({
    app,
    path: '/',
    cors: true,
    onHealthCheck: () =>
        new Promise((resolve, reject) => {
            if (mongoose.connection.readyState > 0) {
                resolve();
            } else {
                reject();
            }
        })
});

app.listen({ port, path }, () => {
    console.log(`Server listening on port http://localhost:${port}${path}`);
});