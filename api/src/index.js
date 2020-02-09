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
import User from './models/User';
const cookieSession = require('cookie-session');
// const checkAuth = require('./util/check-auth');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./config');
var FortyTwoStrategy = require('passport-42').Strategy;

const facebookOptions = {
    clientID: '473679669966044',
    clientSecret: '964e9a615d3c4b01212054e4a4666871',
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: ['id', 'email', 'first_name', 'last_name']
};


passport.use(new FortyTwoStrategy({
    clientID: '7b5a7e3f754d9689bda9bd0b926f6ad06f2c9d8d6c8c8735fe35d738d9dc86c7',
    clientSecret: '407c1461fd0207d8848f12274b0e6b77e11d1bfd255a88ef35f8b2931dc90eb2',
    callbackURL: 'http://localhost:5000/auth/42/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ fortytwoId: profile.id }).then(currentUser => {
        // console.log(profile);
        // console.log(profile.name.givenName);
        // console.log(profile.name.familyName);
        // console.log("email 1" + profile.emails);
        // console.log("email 2" + profile.emails[0]);
        // console.log("email 3" + profile.emails[0].value);
        if (currentUser) {
            done(null, currentUser);
        } else {
            var newUser = new User({
                id: uuid(),
                fortytwoId: profile.id,
                username: profile.username,
                prenom: profile.name.givenName,
                nom: profile.name.familyName,
                createdAt: new Date().toISOString(),
                email:
                    profile.emails &&
                    profile.emails[0] &&
                    profile.emails[0].value
            })
                .save()
                .then(newUser => {
                    done(null, newUser);
                });
        }
    });
}));

const facebookCallback = (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookId: profile.id }).then(currentUser => {
        // console.log(profile.id);
        // console.log(User);

        // console.log(currentUser);
        if (currentUser) {
            // console.log("ok");
            // console.log(currentUser);
            done(null, currentUser);
            // console.log('ok');
        } else {
            // console.log('new user');
            var newUser = new User({
                id: uuid(),
                facebookId: profile.id,
                username: profile.name.givenName,
                prenom: profile.name.givenName,
                nom: profile.name.familyName,
                createdAt: new Date().toISOString(),
                email:
                    profile.emails &&
                    profile.emails[0] &&
                    profile.emails[0].value
            })
                .save()
                .then(newUser => {
                    done(null, newUser);
                });
        }
    });
};
passport.use(new FacebookStrategy(facebookOptions, facebookCallback));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        req,
        pubsub
    }),
    playground: {
        settings: {
            'request.credentials': 'same-origin'
        }
    }
});
const app = express();
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60,
        keys: [keys]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/42',
  passport.authenticate('42'));

app.get('/auth/42/callback',
  passport.authenticate('42', { failureRedirect: 'http://localhost:3000/login' }),
    // Successful authentication, redirect home.
    // return res.redirect('http://localhost:3000/');
    function(req, res) {
        var token = jwt.sign(
            {
                id: req.user.id,
                email: req.user.email,
                username: req.user.username
            },
            SECRET_KEY,
            { expiresIn: '3h' }
        );
        try {
            // var decoded = jwt.verify(token, SECRET_KEY);
            // console.log(decoded);
            res.cookie('auth', token);
            return res.redirect('http://localhost:3000/SocialAuthRedirect');
            // return decoded;
        } catch (e) {
            console.log(err);
        }
        // console.log(token);
        // successRedirect: 'http://localhost:3000/';
    });

app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);
app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: 'http://localhost:3000/login'
    }),
    function(req, res) {
        var token = jwt.sign(
            {
                id: req.user.id,
                email: req.user.email,
                username: req.user.username
            },
            SECRET_KEY,
            { expiresIn: '3h' }
        );
        try {
            // var decoded = jwt.verify(token, SECRET_KEY);
            // console.log(decoded);
            res.cookie('auth', token);
            return res.redirect('http://localhost:3000/SocialAuthRedirect');
            // return decoded;
        } catch (e) {
            console.log(err);
        }
        // console.log(token);
        // successRedirect: 'http://localhost:3000/';
    });

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