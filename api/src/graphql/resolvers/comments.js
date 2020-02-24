const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const Comment = require('../../models/Comments');

module.exports = {
    Query: {
        async getComments(_, {movieId}) {
            try {
                const comments = await Comment.find({movieId}).sort({ createdAt: -1 });
                if (comments)
                     return comments;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async addComment(_, { movieId, body }, context) {
            const { id, username } = checkAuth(context);
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                });
            }
            
            const newComment = new Comment({
                userId: id,
                body,
                username,
                createdAt: new Date().toISOString(),
                movieId
            });

            const comment = await newComment.save();

            context.pubsub.publish('NEW_COMMENT', {
                newComment: comment
            });

            return comment;
        }
    }
};
