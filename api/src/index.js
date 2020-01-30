const { ApolloServer, PubSub } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB, keys } = require('./config.js');
import express from 'express';
const pubsub = new PubSub();
const port = process.env.port || 5000;
const path = '/graphql';
import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import uuid from 'uuid/v4';
import User from './models/Users';
const cookieSession = require('cookie-session');

const facebookOptions = {
    clientID: '473679669966044',
    clientSecret: '964e9a615d3c4b01212054e4a4666871',
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: ['id', 'email', 'first_name', 'last_name'],
};

const facebookCallback = (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}).then((currentUser) => {
        console.log(profile.id);
        if(currentUser) {
            console.log('user is:'+ currentUser);
            done(null, currentUser);
            console.log("ok");
        } else {
            new User({
                id: uuid(),
                facebookId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails && profile.emails[0] && profile.emails[0].value,
            }).save().then((newUser) => {
                console.log('new user created' + newUser);
                done(null, newUser);
            });
        }
    });
  };

passport.use(new FacebookStrategy(
  facebookOptions,
  facebookCallback,
));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        req, 
        pubsub,
    }),
    playground: {
        settings: {
          'request.credentials': 'same-origin',
        },
    }
});

const app = express();

app.use(cookieSession({
    maxAge: 24 * 60 * 60,
    keys: [keys] 
}));
  
app.use(passport.initialize());
app.use(passport.session());
  
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: 'http://localhost:5000/profile',
  failureRedirect: 'http://localhost:3000/login',
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