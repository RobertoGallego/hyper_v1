const { ApolloServer, PubSub } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');
import express from 'express';
const pubsub = new PubSub();
const port = process.env.port || 5000;
const path = '/graphql';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

const app = express();

const connection = mongoose.connect(MONGODB, { useNewUrlParser: true });
connection
    .then(db => {
        db;
        console.log('MongoDB Connected');
    })
    .catch(err => {
        console.log(err);
    });

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

// app.post('/confirmation', userController.confirmationPost);
// app.post('/resend', userController.resendTokenPost);

app.listen({ port, path }, () => {
    console.log(`Server listening on port http://localhost:${port}${path}`);
    // console.log(`🚀  Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});
