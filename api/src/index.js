const { ApolloServer, PubSub } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB, keys } = require('./config.js');
import express from 'express';
const pubsub = new PubSub();
const port = process.env.port || 5000;
const pathGQL = '/graphql';
import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import uuid from 'uuid/v4';
import User from './models/User';
const cookieSession = require('cookie-session');
// const checkAuth = require('./util/check-auth');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./config');
var FortyTwoStrategy = require('passport-42').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
const torrentStream = require('torrent-stream');
const path = require('path');
const fs = require('fs');
const pump = require('pump');
const ffmpeg = require('fluent-ffmpeg');
var cors = require('cors')

const facebookOptions = {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_KEY,
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: ['id', 'email', 'first_name', 'last_name']
};

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_KEY,
    callbackURL: 'http://localhost:5000/auth/google/callback',
    profileFields: ['id', 'email', 'first_name', 'last_name']
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id }).then(currentUser => {
            if (currentUser) {
                console.log("ok");
                done(null, currentUser);
            }
            else {
                var newUser = new User({
                    id: uuid(),
                    googleId: profile.id,
                    fortytwoId: "",
                    facebookId: "",
                    username: profile.displayName,
                    prenom: profile.name.givenName,
                    nom: profile.name.familyName,
                    email: 'not specified',
                    createdAt: new Date().toISOString(),
                    image: "/static/media/profilePic1.62db51f5.png"
                })
                    .save()
                    .then(newUser => {
                        done(null, newUser);
                    });
            }
        });
    }
));

passport.use(new FortyTwoStrategy({
    clientID: process.env.FORTYTWO_ID,
    clientSecret: process.env.FORTYTWO_KEY,
    callbackURL: 'http://localhost:5000/auth/42/callback'
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ fortytwoId: profile.id }).then(currentUser => {
            if (currentUser) {
                done(null, currentUser);
            } else {
                var newUser = new User({
                    id: uuid(),
                    fortytwoId: profile.id,
                    googleId: "",
                    facebookId: "",
                    username: profile.username,
                    prenom: profile.name.givenName,
                    nom: profile.name.familyName,
                    createdAt: new Date().toISOString(),
                    image: "/static/media/profilePic1.62db51f5.png",
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
                fortytwoId: "",
                googleId: "",
                email:
                    profile.emails &&
                    profile.emails[0] &&
                    profile.emails[0].value,
                username: profile.name.givenName,
                prenom: profile.name.givenName,
                nom: profile.name.familyName,
                password: "null",
                createdAt: new Date().toISOString(),
                image: "/static/media/profilePic1.62db51f5.png"
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

//*******STREAM ROUTE********//
app.use(cors())
app.get('/downloadMovie/:movieID/:torrentHash', function (req, res) {
    console.log("hash " + req.params.torrentHash);
    console.log("link " + req.params.movieID);
    const movieID = req.params.movieID;
    const torrentHash = req.params.torrentHash;
    if (!movieID || !torrentHash)
        res.send({ status: "Error!!", message: "movieID or Hash doesn't exist..." })
    const magnetLink = `magnet:?xt=urn:btih:${torrentHash}`;

    const convert = function (file, thread) {
        console.log("convert");
        if (!thread)
            thread = 8
        console.log('Start converting file...')
        return new ffmpeg(file.createReadStream())
            .videoCodec('libvpx')
            .audioCodec('libvorbis')
            .format('webm')
            .audioBitrate(128)
            .videoBitrate(1024)
            .outputOptions([
                '-threads ' + thread,
                '-deadline realtime',
                '-error-resilient 1'
            ])
            .on('end', function () {
                console.log('File is now webm !')
            })
            .on('error', function (err) {
            })
    }
    
    let downloadingStreams = {}
    const streaming = (filename, magnetLink) => {
        // CALCULS
        //   let range = req.headers.range
        //   if (!range)
        //     return res.sendStatus(416)

        console.log('File doesn\'t exist ! Start downloading...')
        // INIT DOWNLOAD
        
        let engine = torrentStream(magnetLink)
        engine.on('ready', function () {
            console.log('Download ended!')
            // GET THE FILE
            engine.files = engine.files.sort(function (a, b) {
                return b.length - a.length
            }).slice(0, 1)
            let file = engine.files[0]
            let ext = path.extname(file.name)
            console.log('File found! (' + file.name + ')')
            downloadingStreams[filename] = file
            // HEADER
            //sendHeaders(req, res, file.length, (ext !== '.webm' && ext !== '.mp4') ? 'webm' : ext.substr(1))
            // CONVERT
            let needConvert = (ext !== '.webm' && ext !== '.mp4')
            let videoStream = needConvert ? convert(file) : file.createReadStream({
                start: 0,
            })
            ext = needConvert ? '.webm' : ext
            // MULTIPLE STREAMS
            let filePath = path.join(__dirname, '/../../ui/public/Downloads/' + filename + ext)
            let fileStream = fs.createWriteStream(filePath)
            // let responseStream = new stream.Writable()
            let responseClosed = false
            // res.on('close', function () {
            //   console.log('Response closed!')
            //   responseClosed = true
            // })
            let onFileClose = function (err) {
                console.log('File closed!')
                if (err)
                    console.error(err)
            }
            // fileStream.on('close', onFileClose).on('error', onFileClose).on('finish', () => {
            //   console.log('File is now on disk!')
            //   onFileWrited(filename + ext)
            // })
            videoStream.on('end', () => {
                console.log('Video stream has reached is end')
            })
            // responseStream._write = (chunk, encoding, done) => {
            //   let checker = setInterval(() => {
            //     if (responseClosed)
            //       cb()
            //   }, 50)
            //   let cb = () => {
            //     clearInterval(checker)
            //     done()
            //   }
            // }
            //   if (responseClosed)
            //     return cb()
            //   res.write(chunk, encoding, cb)
            // }
            // responseStream.on('end', () => {
            //   console.log('Response stream has reached is end')
            //   res.end()
            // })
            if (needConvert) {
                console.log('Pumping to res and file...')
                pump(videoStream, fileStream)
                //   pump(convert(file, 2), responseStream)
            } else {
                console.log('Piping to res and file...')
                videoStream.pipe(fileStream)
                //   videoStream.pipe(responseStream)
            }
        })
    }
    streaming(movieID, magnetLink);

});
// app.get('/playMovie/:movieID', function (req, res) {
//     const movieID = req.params.movieID;
//     const path = __dirname + `/../../ui/public/Downloads/${movieID}.mp4`
//     console.log(path)
//     const stat = fs.statSync(path)
//     const fileSize = stat.size
//     const range = req.headers.range
//     console.log("test + JSON.stringify(range)")
//     if (range) {
//         const parts = range.replace(/bytes=/, "").split("-")
//         const start = parseInt(parts[0], 10)
//         const end = parts[1]
//             ? parseInt(parts[1], 10)
//             : fileSize - 1
//         const chunksize = (end - start) + 1
//         const file = fs.createReadStream(path, { start, end })
//         const head = {
//             'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//             'Accept-Ranges': 'bytes',
//             'Content-Length': chunksize,
//             'Content-Type': 'video/mp4',
//         }
//         res.writeHead(206, head);
//         file.pipe(res);
//     } else {
//         const head = {
//             'Content-Length': fileSize,
//             'Content-Type': 'video/mp4',
//         }
//         res.writeHead(200, head)
//         fs.createReadStream(path).pipe(res)
//     }
// });
//*******STREAM ROUTE********//


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
    function (req, res) {
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
            res.cookie('auth', token);
            return res.redirect('http://localhost:3000/SocialAuthRedirect');
        } catch (e) {
            console.log(err);
        }
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
    function (req, res) {
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



app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    function (req, res) {
        var token = jwt.sign(
            {
                id: req.user.id,
                email: '',
                username: req.user.username
            },
            SECRET_KEY,
            { expiresIn: '3h' }
        );
        try {
            res.cookie('auth', token);
            return res.redirect('http://localhost:3000/SocialAuthRedirect');
        } catch (e) {
            console.log(err);
        }
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
app.listen({ port, pathGQL }, () => {
    console.log(`Server listening on port http://localhost:${port}${pathGQL}`);
});