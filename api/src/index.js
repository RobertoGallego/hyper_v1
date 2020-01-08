const { ApolloServer, PubSub } = require('apollo-server');
// const { ApolloServer, PubSub } = require('apollo-server-express');

const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const express = require('express');

const pubsub = new PubSub();

const port = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

// const app = express();

// Specify port and path for GraphQL endpoint
// const port = process.env.GRAPHQL_LISTEN_PORT || 5000;
// const path = "/graphql";

// server.applyMiddleware({ app });

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port});
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })
