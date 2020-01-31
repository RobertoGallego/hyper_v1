const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const moviesResolvers = require('./movies');
const commentsResolvers = require('./comments');
const resetResolvers = require('./email'); 

module.exports = {
    Post: {
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query,
        ...usersResolvers.Query,
        ...resetResolvers.Query,
        ...moviesResolvers.Query,
        ...commentsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...resetResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
};
