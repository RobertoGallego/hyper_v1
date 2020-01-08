// const { ApolloServer, PubSub } = require('apollo-server');
const { ApolloServer, PubSub } = require('apollo-server-express');

const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const express = require('express');

const pubsub = new PubSub();

const port = process.env.port || 5000;
const path = "/graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

const app = express();

// Specify port and path for GraphQL endpoint
// const port = process.env.GRAPHQL_LISTEN_PORT || 5000;
// const path = "/graphql";
const connection = mongoose
  .connect(MONGODB, { useNewUrlParser: true });
  // .then(() => {
  //   console.log('MongoDB Connected');
  //   return server.listen({ port});
  // })
  // .then((res) => {
  //   console.log(`Server running at ${res.url}`);
  // })
  // .catch(err => {
  //   console.error(err)
  // })

  connection
  .then(db => db)
  .catch(err => {
      console.log(err);
  });


server.applyMiddleware({ app, path: '/', cors: true, onHealthCheck: () => new Promise((resolve, reject) => {
  if (mongoose.connection.readyState > 0) {
      resolve();
  } else {
      reject();
  }
}),
});

app.listen({ port, path }, () => {
  console.log(`🚀  Server listening on port http://localhost:${port}${path}`);
  // console.log(`🚀  Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});