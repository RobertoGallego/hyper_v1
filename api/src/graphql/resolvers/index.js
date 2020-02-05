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
        currentUser: (parent, args, context) => context.getUser(),
        ...moviesResolvers.Query,
        ...commentsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...resetResolvers.Mutation,
        logout: (parent, args, context) => context.logout(),
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
};
