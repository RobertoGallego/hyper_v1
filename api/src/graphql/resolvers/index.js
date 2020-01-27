const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const moviesResolvers = require('./movies');
const commentsResolvers = require('./comments');

module.exports = {
    Post: {
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query,
        ...usersResolvers.Query,
        ...moviesResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
};
